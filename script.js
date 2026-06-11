const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

canvas.width = 400;
canvas.height = 600;

const player = {
    x: canvas.width / 2 - 20,
    y: canvas.height - 50,
    dx: 0,
    width: 36,
    height: 52,
};

const items = [];
let score = 0;
let maxScore = 0;
let gameOver = false;
let gameStarted = false;
let shield = false;
let double = false;
let magnet = false;
let clear = false;

function drawPlayer() {
    ctx.fillStyle = "#fff";
    ctx.fillRect(player.x + 8, player.y + 10, 20, 30);
    ctx.fillStyle = "#f4290f";
    ctx.beginPath();
    ctx.moveTo(player.x + 18, player.y);
    ctx.lineTo(player.x + 8, player.y + 10);
    ctx.lineTo(player.x + 28, player.y + 10);
    ctx.closePath();
    ctx.fill();
    ctx.fill();
    ctx.fillStyle = "#0ce349";
    ctx.beginPath();
    ctx.moveTo(player.x + 8, player.y + 30);
    ctx.lineTo(player.x, player.y +40);
    ctx.lineTo(player.x + 8, player.y + 40);
    ctx.closePath();
    ctx.fill();
    ctx.beginPath();
    ctx.moveTo(player.x + 28, player.y + 30);
    ctx.lineTo(player.x + 36, player.y + 40);
    ctx.lineTo(player.x + 28, player.y + 40);
    ctx.closePath();
    ctx.fill();
    ctx.fillStyle = "#ff6600"
    ctx.beginPath();
    ctx.moveTo(player.x + 12, player.y + 40);
    ctx.lineTo(player.x + 18, player.y + 52); // center
    ctx.lineTo(player.x + 24, player.y + 40);
    ctx.closePath();
    ctx.fill();
} 

function drawItems() {
    items.forEach((item, index) => {
        ctx.fillStyle = item.color;
        ctx.beginPath();
        ctx.arc(item.x, item.y, item.radius, 0, Math.PI * 2);
        ctx.fill();
    });
}

function drawScore() {
    ctx.fillStyle = "#fff"
    ctx.font = 'bold 20px Arial';
    ctx.fillText('Score: ' + score, 10, 30);
}

function updatePlayer() {
    player.x += player.dx;
    if (player.x < 0) player.x = 0;
    if (player.x + player.width > canvas.width) player.x = canvas.width - player.width;

}

function updateItems() {
    items.forEach((item, index) => {
        item.y += item.dy;
        if (
            item.x > player.x &&
            item.x < player.x + player.width &&
            item.y > player.y &&
            item.y < player.y + player.height 
        ) {

            if (item.type === "shield") {
                shield = true;
                items.splice(index, 1);
                return;
            }

            if (item.points < 0 && shield) {
                shield = false;
                items.splice(index, 1);
                return;
            }

            let points = item.points;

            if (double && points > 0) {
                points *= 2;
            }
            

            if (item.type === "bomb") {
                items.length = 0;
            }

            items.splice(index, 1);
            score += item.points;
            
            if (score > maxScore) {
                maxScore = score;
            }

            if (score < 0) {
                gameOver = true;
            }
        }
        if (item.y > canvas.height) {
            items.splice(index, 1);
        }
    });
}

function createAsteroid1() {
    items.push({
        x: Math.random() * (canvas.width - 20),
        y: -20,
        radius: 10,
        dy: 5,
        color: '#766e6d',
        points: -5

    })
}

function createAsteroid2() {
    items.push({
        x: Math.random() * (canvas.width - 20),
        y: -20,
        radius: 25,
        dy: 1,
        color: '#70717e',
        points: -5
    })
}

function createSpaceDebris() {
    items.push({
        x: Math.random() * (canvas.width - 20),
        y: -20,
        radius: 20,
        dy: 4,
        color: '#645d5d',
        points: -20
    })
}

function createSunFlare() {
    items.push({
        x: Math.random() * (canvas.width - 20),
        y: -20,
        radius: 150,
        dy: 0.5,
        color: '#ffb702',
        points: -2

    })
}

function createStardust() {
    items.push({
        x: Math.random() * (canvas.width - 20),
        y: -20,
        radius: 10,
        dy: 2,
        color: '#21f0d8',
        points: 3
    })
}

function createSpaceCrystals() {
    items.push({
        x: Math.random() * (canvas.width - 20),
        y: -20,
        radius: 15,
        dy: 4,
        color: '#fb05ff',
        points: 5
    })
}

function createSpaceGold() {
    items.push({
        x: Math.random() * (canvas.width - 20),
        y: -20,
        radius: 5,
        dy: 6,
        color: '#ffae00',
        points: 10
    })
}

function createComets() {
    items.push({
        x: Math.random() * (canvas.width - 20),
        y: -20,
        radius: 20,
        dy: 3,
        color: '#a6d0ff',
        points: 12
    })
}

function createShield() {
    items.push({
        x: Math.random() * (canvas.width - 20),
        y: -20,
        radius: 12, 
        dy: 3,
        color: '#ff0000',   
        type: 'shield'
    })
}

function createDouble() {
    items.push({
        x: Math.random() * (canvas.width - 20),
        y: -20,
        radius: 20, 
        dy: 3,
        color: '#000dff',   
        type: 'double'
    })
}

function createBomb() {
    items.push({
        x: Math.random() * (canvas.width - 20),
        y: -20,
        radius: 30, 
        dy: 3,
        color: '#00ff0d',   
        type: 'bomb'
    })
}

function gameLoop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    updatePlayer();
    updateItems();

    drawPlayer();
    drawItems();
    drawScore();

    requestAnimationFrame(gameLoop);

}

document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') player.dx = -5;
    if (e.key === 'ArrowRight') player.dx = 5;
});

document.addEventListener('keyup', () => {
    player.dx = 0;
});

function startSpawning() {
    setInterval(createAsteroid1, 3000);
    setInterval(createAsteroid2, 2500);
    setInterval(createComets, 5000);
    setInterval(createSpaceCrystals, 1500);
    setInterval(createSpaceDebris, 1500);
    setInterval(createSpaceGold, 2500);
    setInterval(createStardust, 1000);
    setInterval(createSunFlare, 20000);
    setInterval(createShield, 15000);
    setInterval(createDouble, 20000);
    setInterval(createBomb, 25000);
}


gameLoop();
startSpawning();