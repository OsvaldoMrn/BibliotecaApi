<?php
// Ejemplo de manejo en login.php
header("Content-Type: application/json");

$email = $_POST['email_usuario'] ?? null;
$password = $_POST['pass_usuario'] ?? null;
$userType = $_POST['userType'] ?? null;

if ($userType === 'user') {
    $query = "SELECT nombre_usuario FROM usuarios WHERE email_usuario = ? AND pass_usuario = ?";
} else {
    $query = "SELECT nombre_administrador FROM administradores WHERE username_administrador = ? AND password_administrador = ?";
}

$stmt = $conn->prepare($query);
$stmt->bind_param("ss", $email, $password);
$stmt->execute();
$result = $stmt->get_result();

if ($result->num_rows > 0) {
    $row = $result->fetch_assoc();
    $name = $userType === 'user' ? $row['nombre_usuario'] : $row['nombre_administrador'];
    echo json_encode(['status' => 'success', 'name' => $name]);
} else {
    echo json_encode(['status' => 'error', 'message' => 'Credenciales incorrectas']);
}
?>
