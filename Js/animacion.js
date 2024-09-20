const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

// Variables para estrellas, luciérnagas y flores
let stars = [];
let fireflies = [];
let flowers = [];
const flowerColors = ["#FFEB3B", "#FFD700", "#FFEA00"]; // Colores de flores amarillas

let alturaTallo = 0;
let maxAlturaTallo = 250;
let anguloHoja = 0;
let tamañoFlor = 0;

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
    for (let i = 0; i < 50; i++) {
        flowers.push({
            x: Math.random() * canvas.width,
            y: canvas.height - Math.random() * 100 - 20,
            size: Math.random() * 30 + 20,
            sway: Math.random() * 0.05 + 0.02,
            angle: Math.random() * Math.PI * 2
        });
    }
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

// Animar el crecimiento del tallo
    function dibujarTallo() {
        ctx.beginPath();
        ctx.moveTo(200, 400);
        ctx.lineTo(200, 400 - alturaTallo);
        ctx.strokeStyle = '#27ae60';
        ctx.lineWidth = 6;
        ctx.stroke();
    }
	
	// Dibujar hojas que se abren
    function dibujarHojas() {
        // Hoja izquierda
        ctx.beginPath();
        ctx.ellipse(170, 400 - (alturaTallo / 2), 30, 15, Math.PI / 4, 0, Math.PI * 2);
        ctx.fillStyle = '#2ecc71';
        ctx.fill();

        // Hoja derecha
        ctx.beginPath();
        ctx.ellipse(230, 400 - (alturaTallo / 2), 30, 15, -Math.PI / 4, 0, Math.PI * 2);
        ctx.fillStyle = '#2ecc71';
        ctx.fill();
    }
	
	// Dibujar flor
    function dibujarFlor() {
        const x = 200;
        const y = 400 - maxAlturaTallo;

        // Dibujar pétalos
        const petaloColor = "#f9d71c";
        for (let i = 0; i < 6; i++) {
            const angle = (Math.PI * 2 / 6) * i;
            const petaloX = x + Math.cos(angle) * tamañoFlor;
            const petaloY = y + Math.sin(angle) * tamañoFlor;
            ctx.beginPath();
            ctx.arc(petaloX, petaloY, 20, 0, Math.PI * 2);
            ctx.fillStyle = petaloColor;
            ctx.fill();
        }

        // Centro de la flor
        ctx.beginPath();
        ctx.arc(x, y, 15, 0, Math.PI * 2);
        ctx.fillStyle = "#e67e22";
        ctx.fill();
    }

    // Función principal que anima todo el florecimiento
    function animarFlorecimiento() {
        // Limpiar el lienzo
        //ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Crecer tallo
        if (alturaTallo < maxAlturaTallo) {
            alturaTallo += 5;
        }

        // Aumentar el tamaño de la flor
        if (alturaTallo >= maxAlturaTallo) {
            if (tamañoFlor < 30) {
                tamañoFlor += 2;
            }
        }

        // Dibujar el tallo
        dibujarTallo();

        // Dibujar las hojas cuando el tallo está a la mitad
        if (alturaTallo > maxAlturaTallo / 2) {
            dibujarHojas();
        }

        // Dibujar la flor cuando el tallo ha alcanzado su altura máxima
        if (alturaTallo >= maxAlturaTallo) {
            dibujarFlor();
        }

        // Seguir animando si no hemos alcanzado el tamaño máximo de la flor
        if (tamañoFlor < 30) {
            requestAnimationFrame(animarFlorecimiento);
        }
    }

    



// Animación principal
function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawStars();
    drawFireflies();
    // Iniciar la animación del florecimiento
    animarFlorecimiento();
	
    requestAnimationFrame(animate);
}

init();
animate();
