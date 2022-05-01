import { gameSocket } from "src/server";

const users: string[] = [];
let masterUser: string = "";

gameSocket.on("connection", (socket) => {
  users.push(socket.id);
  socket.join(socket.id);
  if (!masterUser) {
    masterUser = socket.id;
  }
  socket.emit("masterUserUpdated", masterUser);
  console.log("emit masterUserUpdated", masterUser);

  socket.on("disconnect", () => {
    users.splice(users.indexOf(socket.id), 1);
    if (socket.id === masterUser) {
      masterUser = users[0] || "";
      gameSocket.emit("masterUserUpdated", masterUser);
    }
  });

  socket.on("offer", (data) => {
    if (users.includes(data.userId)) {
      gameSocket
        .to(data.userId)
        .emit("offer", { userId: socket.id, offer: data.offer });
    }
  });

  socket.on("answer", (data) => {
    if (users.includes(data.userId)) {
      gameSocket.to(data.userId).emit("answer", data.answer);
    }
  });

  socket.on("candidate", (data) => {
    if (users.includes(data.userId)) {
      gameSocket.to(data.userId).emit("candidate", data.candidate);
    }
  });
});
