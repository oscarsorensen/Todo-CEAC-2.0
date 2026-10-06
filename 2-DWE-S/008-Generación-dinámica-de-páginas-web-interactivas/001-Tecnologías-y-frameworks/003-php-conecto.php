<?php

//databse can be found in josevicente github repo. I havnt downloaded it here.
$db = new PDO("sqlite:municipios.db");

$resultado = $db->query("SELECT * FROM diccionario26");

while ($fila = $resultado->fetch(PDO::FETCH_ASSOC)) {
    echo $fila["NOMBRE"] . "<br>";
}

?>