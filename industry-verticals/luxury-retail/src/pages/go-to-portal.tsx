import { useEffect } from 'react';
import { CloudSDK } from '@sitecore-cloudsdk/core/browser';
import { identity } from '@sitecore-cloudsdk/events/browser';
import config from 'sitecore.config';

const REDIRECT_URL = '/portal.html';
const IDENTITY_EMAIL = 'tohams@gmail.com';
const IDENTITY_PROVIDER = 'email';
const LOG_PREFIX = '[go-to-portal]';

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
      console.log(`${LOG_PREFIX} client: starting`);

      if (!config.api.edge?.clientContextId) {
        console.log(`${LOG_PREFIX} client: no clientContextId, redirecting to ${REDIRECT_URL}`);
        window.location.href = REDIRECT_URL;
        return;
      }

      try {
        console.log(`${LOG_PREFIX} client: initializing CloudSDK`);
        CloudSDK({
          sitecoreEdgeUrl: config.api.edge.edgeUrl,
          sitecoreEdgeContextId: config.api.edge.clientContextId,
          siteName: config.defaultSite || 'website',
          enableBrowserCookie: true,
          cookieDomain: window.location.hostname.replace(/^www\./, ''),
        })
          .addEvents()
          .initialize();

        console.log(
          `${LOG_PREFIX} client: sending identity (${IDENTITY_PROVIDER}: ${IDENTITY_EMAIL})`
        );
        await identity({
          identifiers: [{ provider: IDENTITY_PROVIDER, id: IDENTITY_EMAIL }],
          channel: 'WEB',
          currency: 'USD',
          page: '/',
          language: 'EN',
        });
        console.log(`${LOG_PREFIX} client: identity sent`);
      } catch (err) {
        console.warn(`${LOG_PREFIX} client: identity failed`, err);
      }

      console.log(`${LOG_PREFIX} client: redirecting to ${REDIRECT_URL}`);
      window.location.href = REDIRECT_URL;
    };
    run();
  }, []);

  return null;
}
