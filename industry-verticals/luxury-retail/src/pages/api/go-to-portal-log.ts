import type { NextApiRequest, NextApiResponse } from 'next';

const LOG_PREFIX = '[go-to-portal]';

/**
 * API route that logs go-to-portal client steps to the Node.js (server) output.
 * Called by the go-to-portal page so the terminal shows the full flow.
 */
export default function handler(
  req: NextApiRequest,
  res: NextApiResponse
): void {
  if (req.method !== 'POST') {
    res.status(405).end();
    return;
  }
  const message = typeof req.body?.message === 'string' ? req.body.message : '';
  if (message) {
    console.log(`${LOG_PREFIX} ${message}`);
  }
  res.status(204).end();
}
