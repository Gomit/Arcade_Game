// Draw the enemy and player objects on the screen
Object.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

//Reset player to beginning position
Object.prototype.reset = function() {
  player.x = 200;
  player.y = 400;
}

var STEP = 41.5; // Half of a cell for better playability
/*
    Enemy object
*/


// Enemies our player must avoid
var Enemy = function(x,y) {
    // Image sprite for enemies
    this.sprite = 'images/enemy-bug.png';

    //x and y coorinates for enamies
    this.x = x;
    this.y = y;
    this.speed = Math.floor((Math.random() * 200) + 100);

}

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    //if the enemy crosses off screen, reset its position. Otherwise, it keeps running.
    if(this.x <= 550){
        this.x += this.speed * dt;
    }else{
        this.x = -2;
    }
    //If the player comes within 30px of an enemy's x and y coordinates, reset the game
    if(player.x >= this.x - 20 && player.x <= this.x + 20){
        if(player.y >= this.y - 30 && player.y <= this.y + 30){
            this.reset();
        }
    }
}
/*
    Player Object
*/

// Player class and initial x and y coordinates
var Player = function(){
    this.sprite = 'images/char-boy.png';
    this.x = 200;
    this.y = 400;
}


//Update player position
Player.prototype.update = function(){
    //if left key is pressed and player is not on edge of map, pressed decrement x
    if(this.ctlKey === 'left' && this.x > 0){ 
        this.x -= STEP;
    //if right key is pressed and player is not on edge of map increment x 
    }else if(this.ctlKey === 'right' && this.x != 400){
        this.x += STEP;
    //if up key is pressed increment y 
    }else if(this.ctlKey === 'up'){
        this.y -= STEP;
    //if down key is pressed and player is not on edge of map decrement y 
    }else if (this.ctlKey === 'down' && this.y != 400){
        this.y += STEP;
    }
    this.ctlKey = null;
    
    //If on water, reset
    if(this.y < 25){
        this.reset();
    }
}



    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
//Input handler for player
Player.prototype.handleInput = function(e){
    this.ctlKey = e;    
}


// Instantiate enemies and player objects
var allEnemies = [];
(function setEnemies(){
    allEnemies.push(new Enemy(-2, 60));
    allEnemies.push(new Enemy(-2, 100));
    allEnemies.push(new Enemy(-2,150));
    allEnemies.push(new Enemy(-2,220));
}());

var player = new Player(); 


// listens for key presses and sends the keys to 
// Player.handleInput() method.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
