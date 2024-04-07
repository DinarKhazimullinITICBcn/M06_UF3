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

// Agafem el id de districte que hem pasat
$id_districte = $_POST['id_districte'];

// Consulta SQL
$sql = "SELECT id, name FROM barris WHERE id_districte = $id_districte ORDER BY name ASC";
$result = $conn->query($sql);

// Creacio de l'array de resultats
$barris = array();
while ($row = $result->fetch_assoc()) {
    $barris[] = $row;
}

// Retorn dels resultats en format JSON
echo json_encode($barris);

// Tancar la connexió
$conn->close();
?>
