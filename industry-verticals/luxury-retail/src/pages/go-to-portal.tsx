import { useEffect } from 'react';
import { CloudSDK } from '@sitecore-cloudsdk/core/browser';
import { identity } from '@sitecore-cloudsdk/events/browser';
import config from 'sitecore.config';

const REDIRECT_URL = '/';
const IDENTITY_EMAIL = 'tohams@gmail.com';
const IDENTITY_PROVIDER = 'email';

/**
 * Page that sends an IDENTITY event (Identify) with hardcoded email,
 * then redirects to the home page. Used when clicking "Go to Donor Portal"
 * from email.html to simulate the Create Events! Identify flow.
 */
export default function GoToPortal(): null {
  useEffect(() => {
    const run = async (): Promise<void> => {
      if (!config.api.edge?.clientContextId) {
        window.location.href = REDIRECT_URL;
        return;
      }
      try {
        CloudSDK({
          sitecoreEdgeUrl: config.api.edge.edgeUrl,
          sitecoreEdgeContextId: config.api.edge.clientContextId,
          siteName: config.defaultSite || 'website',
          enableBrowserCookie: true,
          cookieDomain: window.location.hostname.replace(/^www\./, ''),
        })
          .addEvents()
          .initialize();

        await identity({
          identifiers: [{ provider: IDENTITY_PROVIDER, id: IDENTITY_EMAIL }],
          channel: 'WEB',
          currency: 'USD',
          page: '/',
          language: 'EN',
        });
      } catch {
        // Still redirect if identity fails (e.g. dev or network)
      }
      window.location.href = REDIRECT_URL;
    };
    run();
  }, []);

  return null;
}
