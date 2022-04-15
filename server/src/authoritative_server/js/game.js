const players = {};

const config = {
  type: Phaser.HEADLESS,
  parent: "phaser-example",
  width: 800,
  height: 600,
  autoFocus: false,
  physics: {
    default: "arcade",
    arcade: {
      debug: false,
      gravity: { y: 0 },
    },
  },
  scene: {
    preload: preload,
    create: create,
    update: update,
  },
};

function preload() {
  this.load.image("ship", "assets/spaceShips_001.png");
  this.load.image("star", "assets/star_gold.png");
}

function create() {
  const self = this;
  this.players = this.physics.add.group();

  io.on("connection", function (socket) {
    console.log("a user connected");

    players[socket.id] = {
      rotation: 0,
      x: Math.floor(Math.random() * 700) + 50,
      y: Math.floor(Math.random() * 500) + 50,
      playerId: socket.id,
      team: Math.floor(Math.random() * 2) == 0 ? "red" : "blue",
      input: {
        left: false,
        right: false,
        up: false,
      },
    };
    addPlayer(self, players[socket.id]);

    socket.emit("currentPlayers", players);

    socket.broadcast.emit("playerAdded", players[socket.id]);

    socket.emit("starLocation", { x: self.star.x, y: self.star.y });

    socket.emit("updateScore", self.scores);

    socket.on("disconnect", function () {
      console.log("user disconnected");

      removePlayer(self, socket.id);
      delete players[socket.id];
      io.emit("playerDisconnected", socket.id);
    });

    socket.on("playerInput", function (inputData) {
      handlePlayerInput(self, socket.id, inputData);
    });
  });

  this.scores = {
    blue: 0,
    red: 0,
  };
  this.star = this.physics.add.image(
    randomPosition(700),
    randomPosition(500),
    "star"
  );
  this.physics.add.collider(this.players);
  this.physics.add.overlap(this.players, this.star, function (star, player) {
    if (players[player.playerId].team === "red") {
      self.scores.red += 10;
    } else {
      self.scores.blue += 10;
    }
    self.star.setPosition(randomPosition(700), randomPosition(500));
    io.emit("updateScore", self.scores);
    io.emit("starLocation", { x: self.star.x, y: self.star.y });
  });
}

function update() {
  this.players.getChildren().forEach((player) => {
    const input = players[player.playerId].input;
    if (input.left) {
      player.setAngularVelocity(-300);
    } else if (input.right) {
      player.setAngularVelocity(300);
    } else {
      player.setAngularVelocity(0);
    }
    if (input.up) {
      this.physics.velocityFromRotation(
        player.rotation + 1.5,
        200,
        player.body.acceleration
      );
    } else {
      player.setAcceleration(0);
    }
    players[player.playerId].x = player.x;
    players[player.playerId].y = player.y;
    players[player.playerId].rotation = player.rotation;
  });

  this.physics.world.wrap(this.players, 5);

  io.emit("playerUpdates", players);
}

function handlePlayerInput(self, playerId, input) {
  self.players.getChildren().forEach((player) => {
    if (playerId === player.playerId) {
      players[player.playerId].input = input;
    }
  });
}

function addPlayer(self, playerInfo) {
  const player = self.physics.add.image(playerInfo.x, playerInfo.y, "ship");
  player.setOrigin(0.5, 0.5);
  player.setDisplaySize(53, 40);
  player.setDrag(100);
  player.setAngularDrag(100);
  player.setMaxVelocity(200);
  player.playerId = playerInfo.playerId;
  self.players.add(player);
}

function removePlayer(self, playerId) {
  self.players.getChildren().forEach((player) => {
    if (playerId === player.playerId) {
      player.destroy();
    }
  });
}

function randomPosition(max) {
  return Math.floor(Math.random() * max) + 50;
}

const game = new Phaser.Game(config);

window.gameLoaded();
