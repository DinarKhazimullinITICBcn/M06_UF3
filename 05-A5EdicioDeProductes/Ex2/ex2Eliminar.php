<?php
    $servername = "localhost";
    $username = "root";
    $password = "";
    $dbname = "05Productes";

    $conn = new mysqli($servername, $username, $password, $dbname);

    if ($conn->connect_error) {
        die("Connection failed: " . $conn->connect_error);
    }

    if(isset($_POST["id"]) && !empty($_POST["id"])){
        $id = $_POST["id"];
        $sql = "DELETE FROM productes WHERE id=$id";
    
        if ($conn->query($sql) === TRUE) {
            echo "Record deleted successfully";
        } else {
            echo "Error: " . $sql . "<br>" . $conn->error;
        }
    
        $conn->close();
    }    

    header('Location: ex2AddEdit.php');
?>
