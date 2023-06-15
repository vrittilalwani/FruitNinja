// Game States
var PLAY = 1;
var END = 0;
var gameState = PLAY;
var sword, swordImage, fruit, fruit1, fruit2, fruit3, fruit4;
var gameOver, go, bo, bomb;
var fruitGroup, enemyGroup, score;

/*function preload() {
  fruit1 = loadImage("sprites/apple.png");
  fruit2 = loadImage("sprites/banana.png");
  fruit3 = loadImage("sprites/pear.png");
  fruit4 = loadImage("sprites/orange.png");
  swordImage = loadImage("sprites/sword.png");
  go = loadImage("sprites/gameOver.png");
  bo = loadImage("sprites/bomb.png");
}
*/
function setup() {
  var canvas = createCanvas(600, 600);

  // Declare sword sprite
  sword = createSprite(40, 200, 20, 20);
  //sword.addImage(swordImage);
  sword.scale = 0.7;

  // Set collider for sword
  sword.setCollider("rectangle", 0, 0, 40, 80);
  sword.debug=true;

  // Score variables and Groups
  score = 0;
  fruitGroup = createGroup();
  enemyGroup = createGroup();

  textSize(20);
}

function draw() {
  background("lightblue");

  if (gameState === PLAY) {
    // Call fruits and Enemy function
    fruits();
    Enemy();

    // Move sword with mouse
    sword.x = mouseX;
    sword.y = mouseY;

    // Increase score if sword touching fruit
    if (fruitGroup.isTouching(sword)) {
      fruitGroup.destroyEach();
      score = score + 2;
    } else {
      // Go to end state if sword touching enemy
      if (enemyGroup.isTouching(sword)) {
        gameState = END;

        fruitGroup.destroyEach();
        enemyGroup.destroyEach();
        fruitGroup.setVelocityXEach(0);
        enemyGroup.setVelocityXEach(0);

        // Change the image of sword to gameover and reset its position
        //sword.addImage(go);
        sword.x = 200;
        sword.y = 200;
      }
    }
  }

  drawSprites();

  // Display score
  text("Score : " + score, 300, 30);
}

function Enemy() {
  if (frameCount % 200 === 0) {
    var monster = createSprite(400, 200, 20, 20);
    if (Math.round(random(1, 2)) == 1) {
      monster.x = 0;
      monster.velocityX = 9;
    } else {
      monster.x = 600;
      monster.velocityX = -9;
    }
    //monster.addImage(bo);
    monster.y = Math.round(random(100, 400));
    monster.setLifetime = 50;

    enemyGroup.add(monster);
  }
}

function fruits() {
  if (frameCount % 50 === 0) {
    var fruit = createSprite(200, 400, 40, 40);
    if (Math.round(random(1, 2)) == 1) {
      fruit.x = 0;
      fruit.velocityX = 9;
    } else {
      fruit.x = 600;
      fruit.velocityX = -9;
    }
    fruit.scale = 0.2;
    var r = Math.round(random(1, 4));
    /*switch (r) {
      case 1:
        fruit.addImage(fruit1);
        break;
      case 2:
        fruit.addImage(fruit2);
        break;
      case 3:
        fruit.addImage(fruit3);
        break;
      case 4:
        fruit.addImage(fruit4);
        break;
      default:
        break;
    }*/
    fruit.y = Math.round(random(50, 550));
    fruit.setLifetime = 100;

    fruitGroup.add(fruit);
  }
}
