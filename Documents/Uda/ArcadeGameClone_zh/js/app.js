
var canvas = document.createElement('canvas');
var ctx = canvas.getContext('2d');

var TILE_WIDTH = 101,
    TILE_HEIGHT = 83;

// 这是我们的玩家要 躲避的敌人 
var Enemy = function(y, speed) {
    // 要应用到每个敌人的实例的变量写在这里
    // 我们已经提供了一个来帮助你实现更多

    // 敌人的图片或者雪碧图，用一个我们提供的工具函数来轻松的加载文件
    this.sprite = 'images/enemy-bug.png';
    this.x = -TILE_WIDTH;
    this.y = TILE_HEIGHT * y + 56;
    this.speed = speed;
};

// 此为游戏必须的函数，用来更新敌人的位置
// 参数: dt ，表示时间间隙
Enemy.prototype.update = function(dt) {
    // 你应该给每一次的移动都乘以 dt 参数，以此来保证游戏在所有的电脑上
    // 都是以同样的速度运行的
    this.x += this.speed * dt;
    this.render;
    if(this.x >= 606) this.x = -TILE_WIDTH;
};

// 此为游戏必须的函数，用来在屏幕上画出敌人，
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// 现在实现你自己的玩家类
// 这个类需要一个 update() 函数， render() 函数和一个 handleInput()函数
var Player = function() {
    this.sprite = 'images/char-cat-girl.png';
    this.x = 303;
    this.y = 388;
}

Player.prototype.update = function(key) {
    if(key == 'left' && this.x > 56){
        this.x -= TILE_WIDTH;
    } else if(key == 'right' && this.x < 400) {
        this.x += TILE_WIDTH;
    } else if(key == 'up' && this.y > 44) {
        this.y -= TILE_HEIGHT;
    } else if(key == 'down' && this.y < 350) {
        this.y += TILE_HEIGHT;
    } else if (isDead()) {
        reset();
    } else if (player.y == -27) {
        alert("Congratulations!")
        player.x = 303;
        player.y = 388;
    }
}



Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

Player.prototype.handleInput = function(key) {
    console.log(this.y);
    this.update(key);
}

// 现在实例化你的所有对象
// 把所有敌人的对象都放进一个叫 allEnemies 的数组里面

var allEnemies = [];

for (var i = 0; i < 6; i++) {
    var j = Math.floor(Math.random()*10) % 3;
    var s = Math.floor(Math.random()*200) + 100;
    allEnemies[i] = new Enemy(j, s);
}
// 把玩家对象放进一个叫 player 的变量里面

var player = new Player();

function isDead() {
    for(var i = 0; i < allEnemies.length; i++) {
        var isXOverlap = Math.abs(allEnemies[i].x - player.x) < 80;
        var isYOverlap = allEnemies[i].y == player.y;
        if (isXOverlap && isYOverlap) {
            return true;
        }
    }
    return false;
}

function reset() {
    // 空操作
    
    player.x = 303;
    player.y = 388;
}

// 这段代码监听游戏玩家的键盘点击事件并且代表将按键的关键数字送到 Play.handleInput()
// 方法里面。你不需要再更改这段代码了。
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
