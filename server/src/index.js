const express = require("express");
const app = express();
const server = require("http").Server(app);
const path = require("path");
const { JSDOM } = require("jsdom");
const socketIo = require("socket.io");
const Datauri = require("datauri/parser");

console.clear();

const datauri = new Datauri();
const io = new socketIo.Server(server);

app.use(express.static(__dirname + "/public"));
app.get("/", function (req, res) {
  res.sendFile(__dirname + "/index.html");
});

function setupAuthoritativePhaser() {
  JSDOM.fromFile(path.join(__dirname, "authoritative_server/index.html"), {
    runScripts: "dangerously",
    resources: "usable",
    pretendToBeVisual: true,
  })
    .then((dom) => {
      dom.window.URL.createObjectURL = (blob) => {
        if (blob) {
          return datauri.format(
            blob.type,
            blob[Object.getOwnPropertySymbols(blob)[0]]._buffer
          ).content;
        }
      };
      dom.window.URL.revokeObjectURL = (objectURL) => {};
      dom.window.gameLoaded = () => {
        server.listen(8081, function () {
          console.log(`Listening on ${server.address().port}`);
        });
      };
      dom.window.io = io;
    })
    .catch((error) => {
      console.log(error.message);
    });
}

setupAuthoritativePhaser();
