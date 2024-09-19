function dibujarRamo() {
    const canvas = document.getElementById("canvas");
    const ctx = canvas.getContext("2d");

    // Limpiar el lienzo antes de dibujar
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Función para dibujar un pétalo
    function dibujarPetalo(x, y, r, color) {
        ctx.beginPath();
        ctx.arc(x, y, r, 0, Math.PI * 2);
        ctx.fillStyle = color;
        ctx.fill();
    }

    // Dibujar flor
    function dibujarFlor(x, y) {
        const petaloColor = "#f9d71c";  // Amarillo
        const centroColor = "#e67e22";  // Naranja

        // Dibujar 5 pétalos
        for (let i = 0; i < 5; i++) {
            const angle = (Math.PI * 2 / 5) * i;
            const petaloX = x + Math.cos(angle) * 40;
            const petaloY = y + Math.sin(angle) * 40;
            dibujarPetalo(petaloX, petaloY, 20, petaloColor);
        }

        // Dibujar el centro de la flor
        dibujarPetalo(x, y, 15, centroColor);
    }

    // Dibujar tallo
    function dibujarTallo(x, y, length) {
        ctx.beginPath();
        ctx.moveTo(x, y);
        ctx.lineTo(x, y + length);
        ctx.strokeStyle = "#27ae60";
        ctx.lineWidth = 5;
        ctx.stroke();
    }

    // Dibujar hojas
    function dibujarHoja(x, y) {
        ctx.beginPath();
        ctx.ellipse(x, y, 20, 10, Math.PI / 4, 0, Math.PI * 2);
        ctx.fillStyle = "#2ecc71";
        ctx.fill();
    }

    // Dibujar ramo de 3 flores
    const floresX = [150, 200, 250];
    const floresY = [100, 120, 100];

    floresX.forEach((x, index) => {
        dibujarFlor(x, floresY[index]);
        dibujarTallo(x, floresY[index] + 40, 150);
        dibujarHoja(x - 30, floresY[index] + 100); // Hojas a los lados del tallo
        dibujarHoja(x + 30, floresY[index] + 120);
    });
}
