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

    // Включаем физику для adam и enemy1
    game.physics.enable([adam, enemy1]);

    // Добавляем столкновение с границами мира
    adam.body.collideWorldBounds = true;
    enemy1.body.collideWorldBounds = true;

    // Настраиваем масштаб спрайтов
    adam.scale.setTo(0.4, 0.4); // Масштаб героя
    enemy1.scale.setTo(0.8, 0.8); // Масштаб объекта enemy1

    // Анимации для enemy1 и adam
    enemy1.animations.add("walk", [0, 1, 2, 3, 4]);
    adam.animations.add("walk", [0, 1, 2, 3, 4]);
    adam.animations.add("punch", [5, 6, 7, 8, 9]);
    adam.animations.add("cruthc", [10]);

    // Запускаем анимацию enemy1
    enemy1.animations.play("walk", 14, true);

    // Твин для движения enemy1
    this.tween = game.add
      .tween(enemy1)
      .to({ x: 700 }, 3000, "Linear", true, 0, -1, true);

    // Определим направление движения enemy1
    this.enemyFacingRight = true;

    // Разворот при смене направления
    this.tween.onLoop.add(function () {
      enemy1.scale.x *= -1;
    }, this);

    adam.anchor.setTo(0.5, 0.5);

    // Флаг для отслеживания направления героя
    this.facingRight = true;
    // Сохраняем начальный масштаб
    this.initialScale = { x: 0.4, y: 0.4 };

    // Флаг для коллизии
    this.inCollision = false;
  },
  update: function () {
    // Проверка на пересечение между adam и enemy1
    game.physics.arcade.overlap(adam, enemy1, this.handleCollision, null, this);

    // Управление движением adam
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
      console.log("punch");
    } else if (game.input.keyboard.isDown(Phaser.Keyboard.C)) {
      adam.animations.play("cruthc", 14, true);
    } else {
      adam.animations.stop("walk");
      adam.frame = 0;
    }

    // Если нет столкновения, enemy1 продолжает движение
    if (!this.inCollision) {
      enemy1.animations.play("walk", 14, true);
    }
  },
  handleCollision: function (adam, enemy1) {
    // Остановка движения enemy1
    this.tween.pause();
    enemy1.body.velocity.x = 0;

    // Флаг для отслеживания коллизии
    this.inCollision = true;

    // Разворот enemy1 лицом к adam
    if (adam.x > enemy1.x) {
      enemy1.scale.setTo(0.8, 0.8); // enemy1 смотрит вправо
    } else {
      enemy1.scale.setTo(-0.8, 0.8); // enemy1 смотрит влево
    }

    // Проверка на выход из коллизии
    this.checkCollisionExit(adam, enemy1);
  },
  checkCollisionExit: function (adam, enemy1) {
    // Если adam вышел из коллизии, продолжаем движение enemy1
    if (Math.abs(adam.x - enemy1.x) > 100) {
      this.inCollision = false;
      this.tween.resume(); // enemy1 продолжает движение
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
