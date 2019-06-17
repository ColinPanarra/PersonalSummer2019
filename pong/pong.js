//Colin Panarra pong game via https://thoughtbot.com/blog/pong-clone-in-javascript#getting-started
//I followed the link with a few minor edits to make it fit my prefernces

/*
SETT UP FILE AND ADD A CANVAS
*/
//calls everything 60 times per second
//set timeout allows it to stop calling after tabs are switched
var animate = window.requestAnimationFrame ||
              window.webkitRequestAnimationFrame ||
              window.mozRequestAnimationFrame ||
              function(callback){ window.setTimeout(callback, 1000/60) };


//sets up the canvas
var scoreboard = document.createElement('canvas');
scoreboard.width = 600;
scoreboard.height = 400;
var sContext = scoreboard.getContext('2d');

var canvas = document.createElement('canvas');
var width = 600;
var height = 400;
canvas.width = width;
canvas.height = height;
var context =canvas.getContext('2d');


//now that objects and prototypes are created we need to add the specific objects
let player = new Player();
let computer = new Computer();
let ball = new Ball(200,300);
let playerScore = 0;
let computerScore  =0;


function drawScore(){
  let text = " "
  sContext.font = "25px Arial";
  scoreText = "Player Score: " + playerScore + "                Computer Score: " + computerScore;
  sContext.clearRect(0,0,600,600);
  sContext.fillText(scoreText,50, 150);
}


//allows us to call the step function upon starting program
window.onload = function() {
   let theme = new sound("theme.mp3");
    document.body.appendChild(scoreboard);
    document.body.appendChild(canvas);

    animate(step);
    theme.play();
};


//updates our objects (paddles and ball)
//then it requests an animation frame to call step function again
var step = function(){
  update();
  render();
  animate(step);
};
//update functions
var update = function(){
  ball.update(player.paddle, computer.paddle);
  player.update();
  computer.update(ball);
  drawScore();

};
Computer.prototype.update = function(ball){
  var y_pos = ball.y-1;
  var diff = -((this.paddle.y + this.paddle.height /2) - y_pos);
  if(diff<0 && diff <-4){diff = -5;}
  else if(diff >0 && diff > 4){diff=5;}
  this.paddle.move(0,diff);
  if(this.paddle.y <0){
    this.paddle.y=0;
  }else if(this.paddle.y + this.paddle.height > 400){
    this.paddle.y = 400 - this.paddle.height;
  }
};
Player.prototype.update = function() {
  for(var key in keysDown){
    var value = Number(key);
    if(value == 38){//down
      this.paddle.move(0,-4);
    }
   else if(value == 40){//up
      this.paddle.move(0,4);
    }
    else{this.paddle.move(0,0);
    }
  }
};
Paddle.prototype.move = function(x,y){
  this.x += x;
  this.y +=y;
  this.x_speed =x;
  this.y_speed = y;
  if (this.y<0){
    this.y=0;
    this.y_speed=0;
  }
  else if(this.y + this.height > 400){
    this.y = 400-this.height;
    this.y_speed=0;
  }
}


Ball.prototype.update = function(paddle1,paddle2) {
  let bounce = new sound("bounce.mp3");
  let point = new sound("goal.mp3");
  this.x += this.x_speed;
  this.y += this.y_speed;
  var top_x = this.x - 5;
  var top_y = this.y - 5;
  var bottom_x = this.x + 5;
  var bottom_y = this.y + 5;

  if(this.y - 5 < 0){//hit top wall
      bounce.play();
      this.y = 5;
      this.y_speed = -this.y_speed;


  }
  else if(this.y+5 > 400){//bottom wall
    bounce.play();
    this.y= 395;
    this.y_speed = -this.y_speed;

  }

  if(this.x<0){
    point.play();
    this.x_speed =-3;
    this.y_speed = 0;
    this.x = 300;
    this.y = 200;
    computerScore++;
    scoreText = ("Player Score: " + playerScore + "                Computer Score: " + computerScore);


  }
  else if(this.x>600){
    point.play();
    this.x_speed =3;
    this.y_speed = 0;
    this.x = 300;
    this.y = 200;
    playerScore++;
      scoreText =("Player Score: " + playerScore + "                Computer Score: " + computerScore);

  }

if(top_x > 300) {
    if(top_x < (paddle2.x + paddle2.width) && bottom_x > paddle2.x && top_y < (paddle2.y + paddle2.height) && bottom_y > paddle2.y) {
      // hit the player's paddle
      this.x_speed = -3;
      this.y_speed += (paddle2.y_speed / 2);
      this.x += this.x_speed;
    }
  } else {
    if(top_x < (paddle1.x+ paddle1.width) && bottom_x > paddle1.x && top_y < (paddle1.y + paddle1.height) && bottom_y > paddle1.y) {
      // hit the computer's paddle
      this.x_speed = 3;
      this.y_speed += (paddle1.y_speed / 2);
      this.x += this.x_speed;
    }
  }
};




//gets our screen up and crakalakin'
var render = function() {


  sContext.fillRect(0,0,600,5);

  context.fillStyle = "#330033";
  context.fillRect(0,0,width,height);
  player.render();
  computer.render();
  ball.render();
};


/*
CREATING OUR OBJECTS
*/


function Paddle(x,y,width,height){
  this.x=x;
  this.y=y;
  this.width =width;
  this.height=height;
  this.x_speed = 0;
  this.y_speed = 0;
}
function Ball(x,y){
  this.x=x;
  this.y=y;
  this.x_speed = 3;
  this.y_speed = 0;
  this.radius  = 5;

}

Paddle.prototype.render = function() {
  context.fillStyle = "#f4d142";
  context.fillRect(this.x,this.y,this.width, this.height);
};

function Player() {
  this.paddle = new Paddle(50,50,10,50);
}
function Computer() {
  this.paddle = new Paddle(550,300,10,50);
}

Player.prototype.render = function(){
  this.paddle.render();
};
Computer.prototype.render = function(){
  this.paddle.render();
};

Ball.prototype.render = function() {
  context.beginPath();
  context.arc(this.x,this.y,this.radius,2*Math.PI, false);
  context.fillStyle="#66CD00";
  context.fill();
};

//controls

var keysDown = {};
window.addEventListener("keydown", function(event){
  keysDown[event.keyCode] = true;

});


window.addEventListener("keyup", function(event){
  delete keysDown[event.keyCode];

});

///adding sound!

//constructor
function sound(src){
  this.sound = document.createElement('audio');
  this.sound.src=src;
  this.sound.setAttribute("preload","auto");
  this.sound.setAttribute("controls", "none");
  this.sound.style.display = "none";
  document.body.appendChild(this.sound);
  this.play = function(){
    this.sound.play();
  }
  this.stop = function(){
    this.sound.pause();
  }
}
