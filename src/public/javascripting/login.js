// Muestra el formulario de login por defecto
showLogin();

document.addEventListener('DOMContentLoaded', () => {
    // Asocia los eventos a los formularios una vez que el DOM se haya cargado
    const registerForm = document.querySelector('#registerForm form');
    const loginForm = document.querySelector('#loginForm form');

    // Añadir el evento de registro
    registerForm.addEventListener('submit', handleRegister);

    // Añadir el evento de login
    loginForm.addEventListener('submit', handleLogin);
});

// Función para mostrar el formulario de login
function showLogin() {
    document.getElementById('loginForm').classList.remove('hidden');
    document.getElementById('registerForm').classList.add('hidden');
    document.getElementById('loginTab').classList.add('border-blue-500', 'text-blue-600');
    document.getElementById('registerTab').classList.remove('border-blue-500', 'text-blue-600');
}

// Función para mostrar el formulario de registro
function showRegister() {
    document.getElementById('registerForm').classList.remove('hidden');
    document.getElementById('loginForm').classList.add('hidden');
    document.getElementById('registerTab').classList.add('border-blue-500', 'text-blue-600');
    document.getElementById('loginTab').classList.remove('border-blue-500', 'text-blue-600');
}

async function handleRegister(event) {
    event.preventDefault();

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
            window.location.href = 'html/index.html'; // Redirigir a otra página si es necesario
        } else {
            alert(data.error || 'Hubo un error en el registro');
        }
    } catch (error) {
        console.error('Error al hacer la solicitud:', error);
        alert('Hubo un problema al intentar registrarse');
    }
}

async function handleLogin(event) {
    event.preventDefault();

    // Obtener los valores del formulario
    const email_usuario = document.querySelector('input[name="email_usuario"]').value.trim();
    const pass_usuario = document.querySelector('input[name="pass_usuario"]').value.trim();

    if (!email_usuario || !pass_usuario) {
        alert('Por favor, completa todos los campos.');
        return;
    }

    try {
        const response = await fetch('/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email_usuario, pass_usuario }),
        });

        const data = await response.json();

        console.log('Respuesta del servidor:', data); 

        if (data.success) {
            sessionStorage.setItem('userId', data.user.id_usuario);  // Guardar el userId
            window.location.href = 'homeUsuario.html';  // Redirige al usuario
        } else {
            alert('Error de login: ' + data.error);
        }
    } catch (error) {
        console.error('Error al hacer la solicitud:', error);
        alert('Error al intentar iniciar sesión');
    }

}


