// Validación del formulario de login
document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const password = document.getElementById('password').value;
    const errorMessage = document.getElementById('errorMessage');

    // Simulación de credenciales correctas
    const validPassword = "viernes";

    if (password === validPassword) {
        window.location.href = "detalle.html"; // Redirigir a la página principal del sistema
    } else {
        errorMessage.textContent = "Respuesta incorrecta ☹️";
        errorMessage.style.display = "block";
    }
});
