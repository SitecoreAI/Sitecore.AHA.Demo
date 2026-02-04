import type { NextApiRequest, NextApiResponse } from 'next';

const API_VERSION = 'v1.2';
const X_CLIENT_SOFTWARE_ID = '@sitecore-cloudsdk/events 0.5.8';
const X_LIBRARY_VERSION = '0.5.8';

interface SendIdentityBody {
  browser_id: string;
  identifiers: Array<{ id: string; provider: string }>;
  channel: string;
  client_key: string;
  currency: string;
  language: string;
  page: string;
  pos: string;
  /** Top-level email so Guest Data / demobar shows identified visitor (matches SDK IdentityEventPayload) */
  email?: string;
  firstname?: string;
  lastname?: string;
  /** From client config when server env is not set */
  edge_url?: string;
  site_name?: string;
}

/**
 * Proxies IDENTITY event to Sitecore events API with correct payload
 * (client_key, pos, page) so identity is associated with the right client/site.
 * Server-side request avoids browser 401/CORS.
 */
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> {
  if (req.method !== 'POST') {
    res.status(405).end();
    return;
  }

  const body = req.body as SendIdentityBody | undefined;
  if (!body || typeof body !== 'object') {
    res.status(400).json({ error: 'Request body required' });
    return;
  }

  const {
    browser_id,
    identifiers,
    channel,
    client_key,
    currency,
    language,
    page,
    pos,
    email,
    firstname,
    lastname,
    edge_url: bodyEdgeUrl,
    site_name: bodySiteName,
  } = body;

  if (!client_key || !identifiers?.length) {
    res.status(400).json({ error: 'client_key and identifiers required' });
    return;
  }

  const browserIdTrimmed = typeof browser_id === 'string' ? browser_id.trim() : '';
  if (!browserIdTrimmed) {
    res.status(400).json({
      error: 'browser_id required',
      hint: 'Events API returns 404 "Invalid browser id/ref specified" when browser_id is missing. Ensure the Cloud SDK is initialized and a browser cookie exists before sending identity.',
    });
    return;
  }

  const edgeUrl =
    bodyEdgeUrl ||
    process.env.SITECORE_EDGE_URL ||
    process.env.NEXT_PUBLIC_SITECORE_EDGE_URL ||
    '';
  const siteName =
    bodySiteName ||
    process.env.NEXT_PUBLIC_DEFAULT_SITE_NAME ||
    'website';

  // sitecoreContextId = context/tenant ID (from client). client_key = API auth key (env override for payload/query).
  const sitecoreContextId = client_key;
  const apiClientKey =
    process.env.SITECORE_EDGE_CLIENT_KEY ||
    process.env.SITECORE_ENGAGE_CLIENT_KEY ||
    client_key;

  if (!edgeUrl) {
    console.error('[send-identity] edge_url not in body and SITECORE_EDGE_URL not set');
    res.status(500).json({
      error: 'Edge URL not configured',
      hint: 'Set SITECORE_EDGE_URL in .env.local or ensure client sends edge_url',
    });
    return;
  }

  const eventsUrl = `${edgeUrl}/v1/events/${API_VERSION}/events?sitecoreContextId=${sitecoreContextId}&siteId=${siteName}&client_key=${apiClientKey}`;
  const payload: Record<string, unknown> = {
    type: 'IDENTITY',
    identifiers,
    browser_id: browserIdTrimmed,
    channel: channel ?? 'WEB',
    client_key: apiClientKey,
    currency: currency ?? 'USD',
    language: language ?? 'EN',
    page: page ?? '/',
    pos: pos ?? 'StandardDemo',
  };
  if (email != null && typeof email === 'string' && email.trim()) payload.email = email.trim();
  if (firstname != null && typeof firstname === 'string' && firstname.trim()) payload.firstname = firstname.trim();
  if (lastname != null && typeof lastname === 'string' && lastname.trim()) payload.lastname = lastname.trim();

  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    'X-Client-Software-ID': X_CLIENT_SOFTWARE_ID,
    'X-Library-Version': X_LIBRARY_VERSION,
  };
  const token = process.env.SITECORE_EDGE_API_TOKEN;
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  try {
    const eventRes = await fetch(eventsUrl, {
      method: 'POST',
      headers,
      body: JSON.stringify(payload),
    });
    const data = await eventRes.json().catch(() => ({}));
    if (!eventRes.ok) {
      console.error('[send-identity] Events API error', eventRes.status, data);
    }
    res.status(eventRes.status).json(data);
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    console.error('[send-identity] fetch failed', err);
    res.status(502).json({
      error: 'Events API request failed',
      detail: message,
    });
  }
}
