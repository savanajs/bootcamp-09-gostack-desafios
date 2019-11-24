import express from 'express';

const server = express();

server.get("/", (req, res) => {
    res.send("Server is running!!!");
});

server.listen(3333);
