//@flow
import express from 'express';
import next from 'next';
import { NODE_ENV, NEXT_PUBLIC_PORT } from '../constants';
import { parse } from 'url';

async function initServer(): Promise<void> {
  const port = parseInt(NEXT_PUBLIC_PORT, 10) || 3000;
  const dev = NODE_ENV !== 'production';
  const app = next({ dev });
  const handle = app.getRequestHandler();
  const server = express();

  await app.prepare();

  server.all('*', (req, res) => {
    const parsedUrl = parse(req.url, true);
    return handle(req, res, parsedUrl, req?.query);
  });

  server.listen(port, (err) => {
    if (err) throw err;
    console.log(`App running on http://localhost:${port}`);
  });
}

initServer();
