


var canvas;
var ctx;
var balls =[];
// Set the init for the cavas
function Init(width,height)
{
    canvas = document.getElementById("game");
    ctx = canvas.getContext("2d");

    // Set the canvas width and height to the set parameters
    canvas.width = width;
    canvas.height = height;
    // Set the background colour of the canvas
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
}


// This is the main game loop for the game
function Gameloop()
{

    RenderScreen();
    AABB(balls[0],balls[1]);

}



// Create a Ball Gameobject

var Ball = function(x,y,radius)
{
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.xVel = 0;
    this.yVel = 0;
    this.AddVelocityX = function(xVel)
    {
        this.xVel += xVel;
    }
    this.AddVelocityY = function(yVel)
    {
        this.yVel += yVel;
    }
    this.Update = function()
    {
        this.x += this.xVel;
        this.y += this.yVel;
    }
}


function RenderScreen()
{
    ctx.clearRect(0,0,canvas.width,canvas.height);

    // go through all of the balls on the screen and render them
    for(var i = balls.length - 1; i >=0; --i)
    {
        ctx.beginPath();
        ctx.arc(balls[i].x,balls[i].y,balls[i].radius,0,2 * Math.PI);
        ctx.closePath();
        ctx.fill();
        //ctx.fillRect(balls[i].x,balls[i].y,balls[i].radius,balls[i].radius);
        balls[i].Update();
    }
}






// Collision Detection
function AABB(object1,object2)
{
    if(object1.x + object1.radius + object2.radius > object2.x
    && object1.x < object2.x + object1.radius + object2.radius
    && object1.y + object1.radius + object2.radius > object2.y
    && object1.y < object2.y + object1.radius + object2.radius)
    {
        alert("They are about to hit");
        return true;
    }
    return false;
}





Init(800,600);
balls.push(new Ball(100,100,10));
balls.push(new Ball(400,100,10));

balls[0].AddVelocityX(3);
setInterval(Gameloop,16);
