///Declaring the properties in the game
let pong1;
let pong2;
let ball;
let myScore;
let myScore1;
let point1 = 0;
let point2 = 0;

//initalising the game
function startGame(){
    myGameArea.start();

    pong1 = new component(8, 60, "yellow", 20, 150);
    pong2 = new component(8, 60, "red", 670, 150);
    ball = new component(7, 7, "white", 350, 170);
    myScore = new component("16px", "consolas", "yellow", 200 , 25 ,"text");
    myScore1 = new component("16px", "consolas", "red", 410 , 25 ,"text");
}
//this defines the game area
let myGameArea = {
    canvas:document.createElement('canvas'),
    start:function(){
        this.canvas.width = 700;
        this.canvas.height = 390;
        this.context =this.canvas.getContext('2d');
        document.body.insertBefore(this.canvas , document.body.childNodes[0]);
        this.interval = setInterval(updateGameArea , 30);

        window.addEventListener('keydown', function(e) {
            myGameArea.keys = (myGameArea.keys || []);
            myGameArea.keys[e.keyCode] = true;
        })
        window.addEventListener('keyup', function(e) {
            myGameArea.keys = (myGameArea.keys || []);
            myGameArea.keys[e.keyCode] = false;
        })
},

////Clear function
clear: function() {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
},
stop: function() {
    clearInterval(this.interval);
}
}
//CONSTRUCTOR FUNCTION TO CREATE DIFFERENT OBJECTS//////

function component(width, height, color, x, y, type){
    this.type = type;
    this.width = width;
    this.height = height;
    this.x = x;
    this.y = y;
    this.speedX = 0;
    this.speedY = 0;

    this.update = function() {
        ctx = myGameArea.context;
        if(this.type == "text"){
            ctx.font = this.width + " " + this.height;
            ctx.fillStyle = color;
            ctx.fillText(this.text, this.x, this.y);
        } else {
            ctx.fillStyle = color;
            ctx.fillRect(this.x, this.y, this.width, this.height);
        }

    }
    this.newPos = function(){
        this.x += this.speedX;
        this.y += this.speedY;
    }
    this.crashWith = function(otherobj) {
        let myleft = this.x;
        let myright = this.x + (this.width);
        let mytop = this.y;
        let mybottom = this.y + (this.height);
        let otherleft = otherobj.x;
        let otherright = otherobj.x + (otherobj.width);
        let othertop = otherobj.y;
        let otherbottom = otherobj.y + (otherobj.height);
        let crash = true;

        if((mybottom < othertop) || (mytop > otherbottom) || (myright < otherleft) || (myleft > otherright)){
            crash = false;

        }
        return crash;
    }
}
function updateGameArea(){
    ////ball controlling///////////
if(pong1.y <= 0){
    pong1.y = 0;
}
if(pong1.y >= 340){
    pong1.y = 340;
}
if(pong2.y <= 0){
    pong2.y = 0;
}
if(pong2.y >= 340){
    pong2.y = 340;
}


///keyboard control///////////////
if(myGameArea.keys && myGameArea.keys[38]){
    console.log('arrow up');
    pong1.y -= 10;
    if(ball.crashWith(pong1)){
        ball.speedY = -4;
        ball.speedX = 14;
    }
}
if(myGameArea.keys && myGameArea.keys[40]){
    console.log('arrow down')
    pong1.y += 10;
    if(ball.crashWith(pong1)){
        ball.speedY = 4;
        ball.speedX = 14;
    }
}
if(myGameArea.keys && myGameArea.keys[37]){
    pong2.y -= 10;
    if(ball.crashWith(pong2)){
        ball.speedY = -4;
        ball.speedX = -8;
    }
}
if(myGameArea.keys && myGameArea.keys[39]){
    pong2.y += 10;
    if(ball.crashWith(pong2)){
        ball.speedY = 4;
        ball.speedX = -8;
    }
}
//Ball movements
ball.newPos();
if(ball.crashWith(pong1)) {
    ball.speedY = 0;
    ball.speedX = 13;
}
else if(ball.crashWith(pong2)) {
    ball.speedY = 0;
    ball.speedX = -8;
}
else {
ball.x += -4;
}
if(ball.y <= 0){
    ball.speedY = 4;
}
if(ball.y >= 390){
    ball.speedY = -4;
}
if(ball.x <= 2){
    ball.x = 690;
    point2 += 1;
}
if(ball.x >= 700){
    ball.x = 0;
    point1 += 1;
}

///Updating the game function////

myGameArea.clear();
pong1.update();
pong2.update();
ball.update();

myScore.text = "score:"+ point1;
myScore1.text = "score:"+point2;
myScore.update()
myScore1.update();
}
canvas.addEventListener('keyup', function(event){
    var code = event.keyCode;
    if(code === 13){
        pause();
    }
});