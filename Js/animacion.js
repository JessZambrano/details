const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

// Variables para estrellas, luciérnagas y flores
let stars = [];
let fireflies = [];
let flowers = [];
//const flowerColors = ["#FFEB3B", "#FFD700", "#FFEA00"]; // Colores de flores amarillas

// Ajustar tamaño del canvas al tamaño de la ventana
function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    init(); // Volver a inicializar los elementos cuando el tamaño cambie
}

window.addEventListener('resize', resizeCanvas);
resizeCanvas(); // Llamar inicialmente para configurar el tamaño del canvas

// Inicializar estrellas, luciérnagas y flores
function init() {
    stars = [];
    fireflies = [];
    flowers = [];

    // Crear estrellas
    for (let i = 0; i < 200; i++) {
        stars.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height * 0.6, // estrellas en la parte superior
            radius: Math.random() * 2,
            opacity: Math.random() * 0.7
        });
    }

    // Crear luciérnagas
    for (let i = 0; i < 30; i++) {
        fireflies.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            size: Math.random() * 5 + 3,
            opacity: Math.random(),
            speedX: Math.random() * 1.5 - 0.75,
            speedY: Math.random() * 1.5 - 0.75
        });
    }

    // Crear flores
    /*for (let i = 0; i < 50; i++) {
        flowers.push({
            x: Math.random() * canvas.width,
            y: canvas.height - Math.random() * 100 - 20,
            size: Math.random() * 30 + 20,
            sway: Math.random() * 0.05 + 0.02,
            angle: Math.random() * Math.PI * 2
        });
    }*/
}

// Dibujar estrellas
function drawStars() {
    ctx.fillStyle = 'white';
    stars.forEach(star => {
        ctx.globalAlpha = star.opacity;
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
        ctx.fill();
    });
}

// Dibujar luciérnagas
function drawFireflies() {
    fireflies.forEach(firefly => {
        ctx.globalAlpha = firefly.opacity;
        ctx.fillStyle = 'rgba(255, 255, 0, 0.8)';
        ctx.beginPath();
        ctx.arc(firefly.x, firefly.y, firefly.size, 0, Math.PI * 2);
        ctx.fill();

        firefly.x += firefly.speedX;
        firefly.y += firefly.speedY;

        if (firefly.x < 0 || firefly.x > canvas.width) firefly.speedX *= -1;
        if (firefly.y < 0 || firefly.y > canvas.height) firefly.speedY *= -1;

        // Variar el tamaño y la opacidad
        firefly.opacity += Math.random() * 0.1 - 0.05;
        firefly.opacity = Math.max(0.3, Math.min(1, firefly.opacity));
    });
}

// Dibujar flores
/*function drawFlowers() {
    flowers.forEach(flower => {
        ctx.save();
        ctx.translate(flower.x, flower.y);
        ctx.rotate(Math.sin(flower.angle) * flower.sway);
        ctx.fillStyle = flowerColors[Math.floor(Math.random() * flowerColors.length)];
        ctx.beginPath();
        ctx.arc(0, 0, flower.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();

        flower.angle += 0.01;
    });
}*/

// Animación principal
function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawStars();
    drawFireflies();
    //drawFlowers();
    requestAnimationFrame(animate);
}

init();
animate();
