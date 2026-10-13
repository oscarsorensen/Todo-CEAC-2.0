<?php

include "OssoJSON.php";

$ossoJSON = new OssoJSON();


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

$datosCargados = $ossoJSON->cargarJSON("datos.json");

print_r($datosCargados);

?>