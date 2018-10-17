


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
    for(var i =balls.length - 1 ; i > 0; --i)
    {
        for(var j =0; j < balls.length;++j)
        {
            if(i ==j)
            continue;
            AABB(balls[i],balls[j])
        }
        
    }
    //AABB(balls[0],balls[1]);

}



// Create a Ball Gameobject

var Ball = function(x,y,radius)
{
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.xVel = 0;
    this.yVel = 0;
    this.mass = radius;
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






// Collision Detection check there nearly colliding
function AABB(object1,object2)
{
    if(object1.x + object1.radius + object2.radius > object2.x
    && object1.x < object2.x + object1.radius + object2.radius
    && object1.y + object1.radius + object2.radius > object2.y
    && object1.y < object2.y + object1.radius + object2.radius)
    {
        CheckCollision(object1,object2);
        return true;
    }
    return false;
}

// Collision detection
function CheckCollision(object1,object2)
{


    var distance = Math.sqrt(((object1.x - object2.x) * (object1.x - object2.x))
                            + ((object1.y - object2.y) * (object1.y - object2.y)) 
                            );

    // Check to see if the distance between the 2 objects is less than the radius of both
    if(distance < object1.radius + object2.radius)
    {
        FindCollisionPoints(object1,object2);
        console.log("The balls have collided");
        
    }
}

// This method will find out the position of the collision on the circles
function FindCollisionPoints(object1,object2)
{
    var collisionX = ((object1.x * object2.radius) + (object2.x + object1.radius)) / (object1.radius + object2.radius);

    var collisionY = ((object1.y * object2.radius) + (object2.y + object1.radius)) / (object1.radius + object2.radius);

    var newVelX1 = (object1.xVel * (object1.mass - object2.mass) + (2 * object2.mass * object2.xVel)) / (object1.mass + object2.mass);
    var newVelY1 = (object1.yVel * (object1.mass - object2.mass) + (2 * object2.mass * object2.yVel)) / (object1.mass + object2.mass);
    var newVelX2 = (object2.xVel * (object2.mass - object1.mass) + (2 * object1.mass * object1.xVel)) / (object1.mass + object2.mass);
    var newVelY2 = (object2.yVel * (object2.mass - object1.mass) + (2 * object1.mass * object1.yVel)) / (object1.mass + object2.mass);

    object1.xVel = newVelX1;
    object1.yVel = newVelY1;
    object2.xVel = newVelX2;
    object2.yVel = newVelY2;

    object1.x = object1.x + newVelX1;
    object1.y = object1.y + newVelY1;
    
    object2.x = object2.x + newVelX2;
    object2.y = object2.y + newVelY2;
    

}




Init(800,600);
// balls.push(new Ball(100,100,40));
// balls.push(new Ball(400,100,40));
// balls.push(new Ball(400,300,40));
// balls.push(new Ball(200,500,40));
// balls.push(new Ball(360,500,40));


for(var i =0; i < 200;i++)
{
    var x = Math.floor(Math.random() * 600) + 1;
    var y = Math.floor(Math.random() * 600) + 1;
    balls.push(new Ball(x,y,10));
    //balls.push(new Ball(Math.floor(Math.random() * 600) + 1 ,Math.random() * 600) + 1,20);
}
for(var i =0; i < balls.length;i++)
{
    balls[i].AddVelocityX((Math.random() * 3) + 1);
    balls[i].AddVelocityY(-(Math.random() * 3) + 1);

}
//balls[0].AddVelocityX(3);
setInterval(Gameloop,16);
