<?php

include "vista.php";
include "modelo.php";
include "controlador.php";

$clientes = OssoModelo::dameDatosEstatico(
    "clientes.db",
    "clientes"
);

$json = coseJSON($clientes);

$vista = new OssoVista($json);
$vista->pintaTabla();

?>