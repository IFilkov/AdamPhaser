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

    // Включаем физику для врага
    game.physics.enable(enemy1);
    enemy1.body.collideWorldBounds = true;

    // Настроим масштаб спрайтов
    adam.scale.setTo(0.4, 0.4); // Масштаб героя
    enemy1.scale.setTo(0.8, 0.8); // Масштаб объекта enemy1

    // Анимация для enemy1
    enemy1.animations.add("walk", [0, 1, 2, 3, 4]);

    // Создаем переменную для хранения предыдущей позиции enemy1
    enemy1.prevX = enemy1.x;

    // Твин с анимацией ходьбы
    var tween = game.add
      .tween(enemy1)
      .to({ x: 700 }, 3000, "Linear", true, 0, -1, true); // Враг движется туда и обратно

    tween.onUpdateCallback(function () {
      // Запускаем анимацию ходьбы
      enemy1.animations.play("walk", 14, true);

      // Определяем направление врага, сравнивая текущую и предыдущую позицию
      if (enemy1.x > enemy1.prevX) {
        // Если движется вправо
        enemy1.scale.setTo(0.8, 0.8); // Разворачиваем вправо
      } else if (enemy1.x < enemy1.prevX) {
        // Если движется влево
        enemy1.scale.setTo(-0.8, 0.8); // Разворачиваем влево
      }

      // Обновляем предыдущую позицию
      enemy1.prevX = enemy1.x;
    });

    adam.anchor.setTo(0.5, 0.5);
    game.physics.enable(adam);
    adam.body.collideWorldBounds = true;
    adam.animations.add("walk", [0, 1, 2, 3, 4]);
    adam.animations.add("punch", [5, 6, 7, 8, 9]);
    adam.animations.add("cruthc", [10]);

    game.camera.follow(adam);
    game.camera.deadzone = new Phaser.Rectangle(centerX - 300, 0, 600, 1000);

    this.facingRight = true;
    this.initialScale = { x: 0.4, y: 0.4 };
  },
  update: function () {
    if (game.input.keyboard.isDown(Phaser.Keyboard.RIGHT)) {
      if (!this.facingRight) {
        adam.scale.setTo(this.initialScale.x, this.initialScale.y);
        this.facingRight = true;
      }
      adam.x += speed;
      adam.animations.play("walk", 14, true);
    } else if (game.input.keyboard.isDown(Phaser.Keyboard.LEFT)) {
      if (this.facingRight) {
        adam.scale.setTo(-this.initialScale.x, this.initialScale.y);
        this.facingRight = false;
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
