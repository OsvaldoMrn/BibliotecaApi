document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.querySelector('#adminLoginForm form');
    const errorMessage = document.getElementById('errorMessage');  // Seleccionamos el div para mostrar errores

    loginForm.addEventListener('submit', handleAdminLogin);

    async function handleAdminLogin(event) {
        event.preventDefault();

        const username_administrador = document.querySelector('input[name="username_administrador"]').value.trim();
        const pass_administrador = document.querySelector('input[name="pass_administrador"]').value.trim();

        if (!username_administrador || !pass_administrador) {
            alert('Por favor completa todos los campos');
            return;
        }

        try {
            const response = await fetch('/loginAdmin', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username_administrador, pass_administrador }),
            });

            if (!response.ok) {
                throw new Error(`Error en la solicitud: ${response.status}`);
            }

            const data = await response.json();
            console.log('Respuesta del servidor:', data);

            if (data.success) {
                // Si el login es exitoso, redirigir al admin
                sessionStorage.setItem('adminId', data.admin.id_administrador);
                window.location.href = '/html/homeAdmin.html';
            } else {
                // Mostrar error de autenticación
                errorMessage.textContent = data.error;
                errorMessage.classList.remove('hidden');
            }
        } catch (error) {
            console.error('Error al hacer la solicitud:', error);
            alert('Error al intentar iniciar sesión: ' + error.message);
        }
    }
});
