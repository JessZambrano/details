const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight; // Todo el alto de la ventana

// Variables para estrellas, luciérnagas y flores
let stars = [];
let fireflies = [];
let flowers = [];
const flowerColors = ["#FFEB3B", "#FFD700", "#FFEA00"]; // Colores de flores amarillas

// Ajustar el tamaño del canvas cuando se cambia el tamaño de la ventana
function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    generarEstrellas();
    generarLuciérnagas();
    generarFlores();
}

window.addEventListener('resize', resizeCanvas);
resizeCanvas(); // Inicializar canvas al cargar la página

// Generar estrellas
function generarEstrellas() {
    stars = [];
    for (let i = 0; i < 200; i++) {
        stars.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height * 0.6, // Estrellas en la parte superior
            radius: Math.random() * 2,
            opacity: Math.random() * 0.7
        });
    }
}

// Generar luciérnagas
function generarLuciérnagas() {
    fireflies = [];
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
}

// Dibujar estrellas
function dibujarEstrellas() {
    ctx.fillStyle = 'white';
    stars.forEach(star => {
        ctx.globalAlpha = star.opacity;
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
        ctx.fill();
    });
}

// Dibujar luciérnagas
function dibujarLuciérnagas() {
    fireflies.forEach(firefly => {
        ctx.globalAlpha = firefly.opacity;
        ctx.fillStyle = 'rgba(255, 255, 0, 0.8)';
        ctx.beginPath();
        ctx.arc(firefly.x, firefly.y, firefly.size, 0, Math.PI * 2);
        ctx.fill();

        // Movimiento de luciérnagas
        firefly.x += firefly.speedX;
        firefly.y += firefly.speedY;

        // Limitar los bordes
        if (firefly.x < 0 || firefly.x > canvas.width) firefly.speedX *= -1;
        if (firefly.y < 0 || firefly.y > canvas.height) firefly.speedY *= -1;

        // Variar el tamaño y la opacidad
        firefly.opacity += Math.random() * 0.1 - 0.05;
        firefly.opacity = Math.max(0.3, Math.min(1, firefly.opacity));
    });
}

// Crear flores en diferentes posiciones
function generarFlores() {
    flowers = [];
    const numeroDeFlores = Math.floor(canvas.width / 110); // Número de flores según el ancho del canvas
    const tamañoBaseFlor = Math.min(canvas.width / numeroDeFlores, 100); // Tamaño base de las flores
    for (let i = 0; i < numeroDeFlores; i++) {
        const x = i * (canvas.width / numeroDeFlores) + (canvas.width / numeroDeFlores) / 2; // Posición X
        const y = canvas.height - 80; // Posición Y de la flor
        const altoTallo = tamañoBaseFlor * 3.5; // Altura del tallo proporcional al tamaño de la flor
        flowers.push({ x, y, altoTallo, tamañoFlor: 0, alturaTallo: 0, maxAlturaTallo: altoTallo });
    }
}

// Dibujar una flor
function dibujarFlor(flor) {
    const { x, y, alturaTallo, maxAlturaTallo, tamañoFlor } = flor;

    // Dibujar el tallo
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(x, y - alturaTallo);
    ctx.strokeStyle = '#21b84f';//21b84f;27ae60
    ctx.lineWidth = 6;
    ctx.stroke();

    // Dibujar hojas
    if (alturaTallo > maxAlturaTallo / 2) {
        ctx.beginPath();
		ctx.ellipse(x - 30, y - (alturaTallo / 2), 30, 15, Math.PI / 4, 0, Math.PI * 2);
        ctx.fillStyle = '#21b84f'; //'#2ecc71';21b84f;2ecc5e
        ctx.fill();
        ctx.beginPath();
        ctx.ellipse(x + 30, y - (alturaTallo / 2), 30, 15, -Math.PI / 4, 0, Math.PI * 2);
        ctx.fillStyle = '#21b84f'; //'#2ecc71';21b84f;2ecc5e
        ctx.fill();
    }

    // Dibujar pétalos
    if (alturaTallo >= maxAlturaTallo) {
        const petaloColor = flowerColors[Math.floor(Math.random() * flowerColors.length)];
        for (let i = 0; i < 15; i++) {
            const angle = (Math.PI * 2 / 15) * i;
            const petaloX = x + Math.cos(angle) * tamañoFlor;
            const petaloY = y - maxAlturaTallo + Math.sin(angle) * tamañoFlor;
            ctx.beginPath();
			ctx.ellipse(petaloX, petaloY, 20, 20 / 2, angle, 0, Math.PI * 2);
            //ctx.arc(petaloX, petaloY, 20, 0, Math.PI * 2);
            ctx.fillStyle = petaloColor;
            ctx.fill();
        }

        // Dibujar el centro de la flor
        ctx.beginPath();
        ctx.arc(x, y - maxAlturaTallo, 10, 0, Math.PI * 2);
        ctx.fillStyle = "#e67e22";
        ctx.fill();
    }
}

// Animar las flores
function animarFlores() {
    flowers.forEach(flor => {
        if (flor.alturaTallo < flor.maxAlturaTallo) {
            flor.alturaTallo += 2; // Crecimiento del tallo
        } else if (flor.tamañoFlor < 30) {
            flor.tamañoFlor += 2; // Crecimiento de la flor
        }
        dibujarFlor(flor);
    });
}

// Animación principal
function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Dibujar estrellas y luciérnagas
    dibujarEstrellas();
    dibujarLuciérnagas();

    // Animar las flores
    animarFlores();

    requestAnimationFrame(animate);
}

// Iniciar la animación
animate();
