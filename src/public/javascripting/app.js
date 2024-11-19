function showLogin() {
    document.getElementById('loginForm').classList.remove('hidden');
    document.getElementById('registerForm').classList.add('hidden');
    document.getElementById('loginTab').classList.add('border-blue-500', 'text-blue-600');
    document.getElementById('registerTab').classList.remove('border-blue-500', 'text-blue-600');
}

function showRegister() {
    document.getElementById('registerForm').classList.remove('hidden');
    document.getElementById('loginForm').classList.add('hidden');
    document.getElementById('registerTab').classList.add('border-blue-500', 'text-blue-600');
    document.getElementById('loginTab').classList.remove('border-blue-500', 'text-blue-600');
}

showLogin();

document.addEventListener('DOMContentLoaded', () => {
    const registerForm = document.querySelector('#registerForm form');

    // Añadir el evento de registro
    registerForm.addEventListener('submit', handleRegister);
});

async function handleRegister(event) {
    event.preventDefault();

    // Capturar los valores de los campos
    const nombre_usuario = document.querySelector('input[name="nombre_usuario_signin"]').value.trim();
    const email_usuario = document.querySelector('input[name="email_usuario_signin"]').value.trim();
    const pass_usuario = document.querySelector('input[name="pass_usuario_signin"]').value.trim();

    if (!email_usuario || !pass_usuario || !nombre_usuario) {
        alert('Por favor, completa todos los campos.');
        return;
    }

    try {
        const response = await fetch('/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ nombre_usuario, email_usuario, pass_usuario }),
        });

        const data = await response.json();

        if (response.ok) {
            alert('Registro exitoso');
            window.location.href = '/login.html';
        } else {
            alert(data.error || 'Hubo un error en el registro');
        }
    } catch (error) {
        console.error('Error al hacer la solicitud:', error);
        alert('Hubo un problema al intentar registrarse');
    }
}

// Asocia el evento al formulario de registro
document.querySelector('#registerFormElement').addEventListener('submit', handleRegister);
