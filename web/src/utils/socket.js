import io from "socket.io-client";

const gameSocket = io(`${process.env.SERVER_URL}/game`, {
  reconnectionDelayMax: 10000,
  transports: ["websocket"],
  autoConnect: false,
});

export default gameSocket;
