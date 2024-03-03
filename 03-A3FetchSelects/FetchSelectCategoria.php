<?php
   $db_host = "localhost";
   $db_nombre = "categories";
   $db_usuario = "root";
   $db_passwd = "";

   try {
        $conn = mysqli_connect($db_host, $db_usuario, $db_passwd, $db_nombre );

        $sql = "SELECT id, nom FROM categoria";
        $result = $conn->query($sql);

        $return = array(); 

        while ($row = $result->fetch_assoc()) {
            $object = new stdClass();
            $object->nom = $row["nom"];
            $object->id = $row["id"];
            
            $return[] = $object;
        }

        echo json_encode($return);
   } catch (Exception $e) {
        die("Conexión fallida: " . $conn->connect_error);
   }
?>