<?php

include "OssoJSON.php";

$jocarsaJSON = new JocarsaJSON();


// ================================
// GUARDAR JSON
// ================================

$datos = [
    "nombre" => "Oscar",
    "apellidos" => "Sorensen",
    "profesion" => "Studente",
    "tecnologias" => [
        "PHP",
        "Python",
        "JavaScript",
        "SQL"
    ]
];

$ossoJSON->guardarJSON("datos.json", $datos);


// ================================
// CARGAR JSON
// ================================

$datosCargados = $OssoJSON->cargarJSON("datos.json");

print_r($datosCargados);

?>