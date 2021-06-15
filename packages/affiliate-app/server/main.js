//@flow
import express from 'express';
import next from 'next';
import { NODE_ENV, NEXT_PUBLIC_PORT } from '../constants';
import { parse } from 'url';

class Server {
  port: number;
  dev: boolean;
  handle: Function;
  app: Object;
  server: Object;

  constructor(): void {
    this.port = parseInt(NEXT_PUBLIC_PORT, 10) || 3000;
    this.dev = NODE_ENV !== 'production';
    this.app = next({ dev: this.dev });
    this.handle = this.app.getRequestHandler();
  }

  setUpRoutes(): void {
    this.server.all('*', (req, res) => {
      const parsedUrl = parse(req.url, true);
      return this.handle(req, res, parsedUrl, req?.query);
    });
  }

  async initCore(): Promise<any> {
    this.server = express();
    await this.app.prepare();
    this.setUpRoutes();

    this.server.listen(this.port, (err) => {
      if (err) throw err;
      console.log(`> Ready on http://localhost:${this.port}`);
    });
  }
}

function init(): void {
  const Core = new Server();
  Core.initCore();
}

init();
