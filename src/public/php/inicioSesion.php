<?php
// Conectar a la base de datos
$servername = "localhost";
$username = "root"; // Cambia a tu usuario de MySQL
$password = ""; // Cambia a tu contraseña de MySQL
$dbname = "biblioteca"; // Nombre de tu base de datos

// Crear la conexión
$conn = new mysqli($servername, $username, $password, $dbname);

// Verificar la conexión
if ($conn->connect_error) {
    die("Conexión fallida: " . $conn->connect_error);
}

// Obtener los datos enviados
$data = json_decode(file_get_contents("php://input"), true);

$email_usuario = $data['email_usuario'] ?? null;
$pass_usuario = $data['pass_usuario'] ?? null;
$usuario_admin = $data['user_administrador'] ?? null;
$pass_admin = $data['pass_administrador'] ?? null;
$userType = $data['userType'] ?? null;

// Verificar si es un usuario o un administrador
if ($userType === 'user') {
    // Verificar las credenciales del usuario
    if ($email_usuario && $pass_usuario) {
        $stmt = $conn->prepare("SELECT * FROM Usuario WHERE email_usuario = ? AND pass_usuario = ?");
        $stmt->bind_param('ss', $email_usuario, $pass_usuario); // Usamos 'ss' porque son dos cadenas de texto
        $stmt->execute();
        $result = $stmt->get_result();
        
        if ($result->num_rows > 0) {
            // Usuario encontrado, iniciar sesión
            echo json_encode(['success' => true]);
        } else {
            echo json_encode(['error' => 'Credenciales incorrectas']);
        }

        $stmt->close();
    }
} else if ($userType === 'admin') {
    // Verificar las credenciales del administrador
    if ($usuario_admin && $pass_admin) {
        $stmt = $conn->prepare("SELECT * FROM administrador WHERE usuario_admin = ? AND pass_admin = ?");
        $stmt->bind_param('ss', $usuario_admin, $pass_admin); // Usamos 'ss' porque son dos cadenas de texto
        $stmt->execute();
        $result = $stmt->get_result();
        
        if ($result->num_rows > 0) {
            // Administrador encontrado, iniciar sesión
            echo json_encode(['success' => true]);
        } else {
            echo json_encode(['error' => 'Credenciales incorrectas']);
        }

        $stmt->close();
    }
} else {
    echo json_encode(['error' => 'Tipo de usuario no válido']);
}
?>
