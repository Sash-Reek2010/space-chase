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
    setInterval(createAsteroid1, 1000);
}


gameLoop();
startSpawning();