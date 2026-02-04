import { useEffect } from 'react';
import { CloudSDK } from '@sitecore-cloudsdk/core/browser';
import { identity } from '@sitecore-cloudsdk/events/browser';
import config from 'sitecore.config';

/** Hardcoded for demo: match TM.js identifyUser + additionalIdentityData (engage.identity) */
const IDENTITY_EMAIL = 'tohams@gmail.com';
const IDENTITY_PROVIDER = 'email';
const CHANNEL = 'WEB';
const CURRENCY = 'USD';
const LANGUAGE = 'EN';

declare global {
  interface Window {
    scCloudSDK?: {
      events?: { awaitInit?: () => Promise<void> };
      core?: { getBrowserId?: () => string };
    };
  }
}

/**
 * Runs identify only when the user arrives from preferences.html via the logo link
 * (URL has ?identify=1 or ?identity=1). Does what TM.js does when "Identify" +
 * "Additional Identity Data" are clicked — calls SDK identity() with the same
 * eventData shape. Then removes the query param so the URL is clean.
 */
export default function IdentifyFromQuery(): null {
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const params = new URLSearchParams(window.location.search);
    const shouldIdentify = params.get('identify') === '1' || params.get('identity') === '1';
    if (!shouldIdentify) return;

    const run = async (): Promise<void> => {
      const edge = config.api.edge;
      if (!edge?.clientContextId || !edge?.edgeUrl) {
        window.history.replaceState(null, '', '/');
        return;
      }

      try {
        if (!window.scCloudSDK?.core) {
          CloudSDK({
            sitecoreEdgeUrl: edge.edgeUrl,
            sitecoreEdgeContextId: edge.clientContextId,
            siteName: config.defaultSite || 'website',
            enableBrowserCookie: true,
            cookieDomain: window.location.hostname.replace(/^www\./, ''),
          })
            .addEvents()
            .initialize();
          const deadline = Date.now() + 8000;
          while (!window.scCloudSDK?.events?.awaitInit && Date.now() < deadline) {
            await new Promise((r) => setTimeout(r, 50));
          }
        }
        await window.scCloudSDK?.events?.awaitInit?.();

        const eventData = {
          channel: CHANNEL,
          currency: CURRENCY,
          language: LANGUAGE,
          page: window.location.pathname || '/',
          identifiers: [{ provider: IDENTITY_PROVIDER, id: IDENTITY_EMAIL }],
          email: IDENTITY_EMAIL,
          firstName: '',
          lastName: '',
        };
        await identity(eventData);
      } catch {
        // ignore
      }
      window.history.replaceState(null, '', '/');
    };
    run();
  }, []);

  return null;
}
