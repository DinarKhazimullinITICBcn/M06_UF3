<?php
   $db_host = "localhost";
   $db_nombre = "categories";
   $db_usuario = "root";
   $db_passwd = "";

   try {
        $conn = mysqli_connect($db_host, $db_usuario, $db_passwd, $db_nombre );

        $idCategorias = json_decode($_POST['categoria']);

        $return = array(); 

        foreach($idCategorias as $idCategoria) {
            $sql = "SELECT id, nom FROM subcategoria WHERE id_categoria = $idCategoria";
            $result = $conn->query($sql);

            while ($row = $result->fetch_assoc()) {
                $object = new stdClass();
                $object->nom = $row["nom"];
                $object->id = $row["id"];
                
                $return[] = $object;
            }
        }

        echo json_encode($return);
   } catch (Exception $e) {
        die("Conexión fallida: " . $conn->connect_error);
   }
?>
