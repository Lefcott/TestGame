import { gameSocket } from "src/server";
import joinGame from "./input/joinGame";

gameSocket.on("connection", (socket) => {
  console.log("new connection!");

  socket.on("joinGame", joinGame);
});
