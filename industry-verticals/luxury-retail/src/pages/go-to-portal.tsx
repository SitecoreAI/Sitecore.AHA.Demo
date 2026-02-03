import { useEffect } from 'react';
import { CloudSDK } from '@sitecore-cloudsdk/core/browser';
import { identity } from '@sitecore-cloudsdk/events/browser';
import config from 'sitecore.config';

const REDIRECT_URL = '/portal.html';
const IDENTITY_EMAIL = 'tohams@gmail.com';
const IDENTITY_PROVIDER = 'email';
const LOG_PREFIX = '[go-to-portal]';

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

        logClient(
          `client: sending identity (${IDENTITY_PROVIDER}: ${IDENTITY_EMAIL})`
        );
        await identity({
          identifiers: [{ provider: IDENTITY_PROVIDER, id: IDENTITY_EMAIL }],
          channel: 'WEB',
          currency: 'USD',
          page: '/',
          language: 'EN',
        });
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
