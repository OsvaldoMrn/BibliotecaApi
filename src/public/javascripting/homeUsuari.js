// app.js

// Suponiendo que tienes una función para manejar el inicio de sesión
async function loginUser(event) {
    event.preventDefault(); // Evita el envío predeterminado del formulario
    
    const formData = new FormData(event.target);
    const response = await fetch('src/public/php/homeUsuario.php', {
        method: 'POST',
        body: formData,
    });

    const data = await response.json();
    
    if (data.status === 'success') {
        // Redirige a la página home con el nombre en la URL o sesión
        localStorage.setItem('userName', data.name); // Guarda el nombre en localStorage
        window.location.href = 'home.html';
    } else {
        alert('Credenciales incorrectas');
    }
}

// Muestra el nombre en home.html
document.addEventListener('DOMContentLoaded', () => {
    const userName = localStorage.getItem('userName'); // Obtiene el nombre de localStorage
    if (userName) {
        const welcomeMessage = document.getElementById('welcomeMessage');
        if (welcomeMessage) {
            welcomeMessage.textContent = `Bienvenido, ${userName}`;
        }
    }
});
