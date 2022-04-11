import io from "socket.io-client";

const gameSocket = io("http://localhost:4000/game", {
  reconnectionDelayMax: 10000,
  transports: ["websocket"],
});

export default gameSocket;
