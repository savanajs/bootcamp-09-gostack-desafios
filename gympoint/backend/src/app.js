import 'dotenv/config';
import express from 'express';
import cors from 'cors';

import './database';
import routes from './routes';

class App {
  constructor() {
    this.server = express();

    this.middlewares();
    this.routes();
    this.exceptionHandler();
  }

  middlewares() {
    this.server.use(
      cors({
        origin:
          process.env.NODE_ENV !== 'development' ? process.env.FRONT_URL : '*',
      })
    ); // cors({origin: 'http://...'})

    this.server.use(express.json());
    this.server.use('/public', express.static('public'));
  }

  routes() {
    this.server.use(routes);
  }

  exceptionHandler() {}
}

export default new App().server;
