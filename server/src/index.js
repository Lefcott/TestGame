const express = require("express");
const app = express();
const server = require("http").Server(app);
const path = require("path");
const { JSDOM } = require("jsdom");

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
      dom.window.gameLoaded = () => {
        server.listen(8081, function () {
          console.log(`Listening on ${server.address().port}`);
        });
      };
    })
    .catch((error) => {
      console.log(error.message);
    });
}

setupAuthoritativePhaser();
