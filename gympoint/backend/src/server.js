import 'dotenv/config';
import express from 'express';

import SessionController from './controllers/SessionController';

const server = express();

server.get("/", (req, res) => {
    res.send("Server is running!!!");
});

server.get("/session", SessionController.store);

server.listen(3333);
