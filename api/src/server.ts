import express from "express";
import http from "http";
import socketIo from "socket.io";
import middlewares from "./middlewares";

const app = express();
const server = http.createServer(app);
const io = new socketIo.Server(server);

app.use(middlewares);

server.listen(process.env.PORT || 4000);

const gameSocket = io.of("/game");

export { gameSocket };
