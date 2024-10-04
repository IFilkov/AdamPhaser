var demo = {},
  centerX = 1500 / 2,
  centerY = 1000 / 2,
  adam,
  speed = 6;
demo.state0 = function () {};
demo.state0.prototype = {
  preload: function () {
    game.load.spritesheet(
      "adam",
      "assets/spritesheets/adamSheet2.png",
      240,
      370
    );
    game.load.image("tree", "assets/backgrounds/treeBG.png");
  },
  create: function () {
    game.physics.startSystem(Phaser.Physics.ARCADE);
    game.stage.backgroundColor = "#800080";
    addChangeStateEventListeners();
    game.world.setBounds(0, 0, 8813, 1000);
    game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
    var treeBG = game.add.sprite(0, 0, "tree");

    adam = game.add.sprite(centerX, centerY, "adam");
    enemy1 = game.add.sprite(240, 370, "adam");

    // Настроим масштаб спрайтов
    adam.scale.setTo(0.4, 0.4); // Масштаб героя
    enemy1.scale.setTo(0.8, 0.8); // Масштаб объекта enemy1, сделаем его меньше

    // Анимация для enemy1
    enemy1.animations.add("walk", [0, 1, 2, 3, 4]);

    // Твин с анимацией ходьбы
    var tween = game.add
      .tween(enemy1.anchor)
      .to({ x: 1 }, 1000, "Linear", true, 1000, false, true)
      // .to({ x: 700 }, 3000, "Linear", true, 0, -1, true);
      .loop(true);

    tween.onLoop.add(function () {
      enemy1.animations.play("walk", 14, true);
    }, this);

    adam.anchor.setTo(0.5, 0.5);
    game.physics.enable(adam);
    adam.body.collideWorldBounds = true;
    adam.animations.add("walk", [0, 1, 2, 3, 4]);
    adam.animations.add("punch", [5, 6, 7, 8, 9]);
    adam.animations.add("cruthc", [10]);

    game.camera.follow(adam);
    game.camera.deadzone = new Phaser.Rectangle(centerX - 300, 0, 600, 1000);

    // Флаг для отслеживания направления героя
    this.facingRight = true;
    // Сохраняем начальный масштаб
    this.initialScale = { x: 0.4, y: 0.4 };
  },
  update: function () {
    if (game.input.keyboard.isDown(Phaser.Keyboard.RIGHT)) {
      if (!this.facingRight) {
        // Если герой был повернут влево, изменяем только ось X, не трогая масштаб Y
        adam.scale.setTo(this.initialScale.x, this.initialScale.y);
        this.facingRight = true; // Обновляем флаг
      }
      adam.x += speed;
      adam.animations.play("walk", 14, true);
    } else if (game.input.keyboard.isDown(Phaser.Keyboard.LEFT)) {
      if (this.facingRight) {
        // Если герой был повернут вправо, отразим его только по оси X
        adam.scale.setTo(-this.initialScale.x, this.initialScale.y);
        this.facingRight = false; // Обновляем флаг
      }
      adam.x -= speed;
      adam.animations.play("walk", 14, true);
    } else if (game.input.keyboard.isDown(Phaser.Keyboard.UP)) {
      adam.y -= speed;
      adam.animations.play("walk", 14, true);
      if (adam.y < 395) {
        adam.y = 395;
      }
    } else if (game.input.keyboard.isDown(Phaser.Keyboard.DOWN)) {
      adam.y += speed;
      adam.animations.play("walk", 14, true);
    } else if (game.input.keyboard.isDown(Phaser.Keyboard.F)) {
      adam.animations.play("punch", 14, true);
    } else if (game.input.keyboard.isDown(Phaser.Keyboard.C)) {
      adam.animations.play("cruthc", 14, true);
    } else {
      adam.animations.stop("walk");
      adam.frame = 0;
    }
  },
};

function changeState(i, stateNum) {
  console.log("state" + stateNum);
  game.state.start("state" + stateNum);
}

function addKeyCallback(key, fn, args) {
  game.input.keyboard.addKey(key).onDown.add(fn, null, null, args);
}

function addChangeStateEventListeners() {
  addKeyCallback(Phaser.Keyboard.ZERO, changeState, 0);
  addKeyCallback(Phaser.Keyboard.ONE, changeState, 1);
  addKeyCallback(Phaser.Keyboard.TWO, changeState, 2);
  addKeyCallback(Phaser.Keyboard.THREE, changeState, 3);
  addKeyCallback(Phaser.Keyboard.FOUR, changeState, 4);
  addKeyCallback(Phaser.Keyboard.FIVE, changeState, 5);
  addKeyCallback(Phaser.Keyboard.SIX, changeState, 6);
  addKeyCallback(Phaser.Keyboard.SEVEN, changeState, 7);
  addKeyCallback(Phaser.Keyboard.EIGHT, changeState, 8);
  addKeyCallback(Phaser.Keyboard.NINE, changeState, 9);
}
