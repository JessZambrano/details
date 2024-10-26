// Validación del formulario de login
document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const errorMessage = document.getElementById('errorMessage');

    // Simulación de credenciales correctas
    const validUsername = "a";
    const validPassword = "a";

    if (username === validUsername && password === validPassword) {
        window.location.href = "dashboard.html"; // Redirigir a la página principal del sistema
    } else {
        errorMessage.textContent = "Usuario o contraseña incorrectos.";
        errorMessage.style.display = "block";
    }
});
