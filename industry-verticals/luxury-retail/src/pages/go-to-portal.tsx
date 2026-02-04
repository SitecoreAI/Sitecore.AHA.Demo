import { useEffect } from 'react';
import { CloudSDK } from '@sitecore-cloudsdk/core/browser';
import { identity } from '@sitecore-cloudsdk/events/browser';
import config from 'sitecore.config';

const REDIRECT_URL = '/portal.html';
const IDENTITY_EMAIL = 'tohams@gmail.com';
const IDENTITY_PROVIDER = 'email';
const LOG_PREFIX = '[go-to-portal]';
/** Same keys TM.js uses so demobar / Guest Data sees identity (TM: identifyUser) */
const TM_STORAGE_KEY_PROVIDER = 'scDemoBar_identityProvider';
const TM_STORAGE_KEY_VALUE = 'scDemoBar_identityValue';
/** Guest ref cookie so Engage runtime / Guest Data tab can resolve identified visitor (matches SDK: sc_{contextId}_personalize) */
const GUEST_COOKIE_PREFIX = 'sc_';
const GUEST_COOKIE_SUFFIX = '_personalize';
const GUEST_COOKIE_MAX_AGE_DAYS = 730;

function setGuestRefCookie(ref: string, clientContextId: string): void {
  const name = GUEST_COOKIE_PREFIX + clientContextId + GUEST_COOKIE_SUFFIX;
  const maxAge = GUEST_COOKIE_MAX_AGE_DAYS * 24 * 60 * 60;
  const hostname = window.location.hostname.replace(/^www\./, '');
  const domainAttr =
    hostname && hostname !== 'localhost' && !/^\d+\.\d+\.\d+\.\d+$/.test(hostname)
      ? `; domain=.${hostname}`
      : '';
  document.cookie = `${encodeURIComponent(name)}=${encodeURIComponent(ref)}; path=/; max-age=${maxAge}; SameSite=Lax${domainAttr}`;
}

/** Log in browser and send to API so Node.js terminal shows it too */
function logClient(message: string): void {
  console.log(`${LOG_PREFIX} ${message}`);
  fetch('/api/go-to-portal-log', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ message }),
  }).catch(() => {});
}

/**
 * Page that sends an IDENTITY event (Identify) with hardcoded email,
 * then redirects to the Donor Portal (portal.html). Used when clicking "Go to Donor Portal"
 * from email.html to simulate the Create Events! Identify flow.
 */
export default function GoToPortal(): null {
  // Logs on server (Node.js terminal) when page is requested
  console.log(`${LOG_PREFIX} page requested`);

  useEffect(() => {
    const run = async (): Promise<void> => {
      logClient('client: starting');

      if (!config.api.edge?.clientContextId) {
        logClient(`client: no clientContextId, redirecting to ${REDIRECT_URL}`);
        window.location.href = REDIRECT_URL;
        return;
      }

      try {
        logClient('client: initializing CloudSDK');
        CloudSDK({
          sitecoreEdgeUrl: config.api.edge.edgeUrl,
          sitecoreEdgeContextId: config.api.edge.clientContextId,
          siteName: config.defaultSite || 'website',
          enableBrowserCookie: true,
          cookieDomain: window.location.hostname.replace(/^www\./, ''),
        })
          .addEvents()
          .initialize();

        // Same eventData shape as TM.js identifyUser + additionalIdentityData (channel, currency, pos, language, page, identifiers, email, firstName, lastName)
        const eventData = {
          channel: 'WEB',
          currency: 'USD',
          language: 'EN',
          page: window.location.pathname || '/',
          identifiers: [{ provider: IDENTITY_PROVIDER, id: IDENTITY_EMAIL }],
          email: IDENTITY_EMAIL,
          firstName: '',
          lastName: '',
        };
        logClient(`client: sending identity (${IDENTITY_PROVIDER}: ${IDENTITY_EMAIL})`);
        logClient(`client: JSON sent to events API: ${JSON.stringify(eventData, null, 2)}`);
        const response = await identity(eventData);
        logClient(`client: JSON received from events API: ${JSON.stringify(response, null, 2)}`);
        // Do what TM.js does locally: store provider/value so demobar sees the same identity state
        if (typeof window !== 'undefined' && window.localStorage) {
          window.localStorage.setItem(TM_STORAGE_KEY_PROVIDER, IDENTITY_PROVIDER);
          window.localStorage.setItem(TM_STORAGE_KEY_VALUE, IDENTITY_EMAIL);
        }
        // Set guest ref cookie so Engage runtime / Guest Data tab can resolve identified visitor
        const ref =
          response &&
          typeof response === 'object' &&
          typeof (response as { ref?: string }).ref === 'string'
            ? (response as { ref: string }).ref
            : '';
        if (ref && config.api.edge?.clientContextId) {
          setGuestRefCookie(ref, config.api.edge.clientContextId);
          logClient(`client: set guest ref cookie (ref=${ref})`);
        }
        logClient('client: identity sent');
      } catch (err) {
        console.warn(`${LOG_PREFIX} client: identity failed`, err);
        logClient(`client: identity failed ${err instanceof Error ? err.message : String(err)}`);
      }

      logClient(`client: redirecting to ${REDIRECT_URL}`);
      window.location.href = REDIRECT_URL;
    };
    run();
  }, []);

  return null;
}
