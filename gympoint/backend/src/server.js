import 'dotenv/config';
import express from 'express';
import cors from 'cors';

import './database';
import routes from './routes';

const server = express();

server.use(
  cors({
    origin: process.env.NODE_ENV !== 'development' ? process.env.FRONT_URL : '',
  })
); // cors({origin: 'http://...'})

server.use(express.json());
server.use(routes);

server.listen(3333);
