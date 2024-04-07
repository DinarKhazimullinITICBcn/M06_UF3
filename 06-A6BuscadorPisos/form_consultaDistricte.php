<?php
// Connexio a la base de dades
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "m6";

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
  die("Connexió fallida: " . $conn->connect_error);
}

// Consulta SQL
$sql = "SELECT id, name FROM districtes ORDER BY name ASC";
$result = $conn->query($sql);

// Creacio de l'array de resultats
$districtes = array();
while ($row = $result->fetch_assoc()) {
    $districtes[] = $row;
}

// Retorn dels resultats en format JSON
echo json_encode($districtes);

// Tancar la connexió
$conn->close();
?>
