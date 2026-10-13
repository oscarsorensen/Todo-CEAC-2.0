<?php
	include "vista.php";
  include "modelo.php";
  include "controlador.php";
  
  $basededatos = new OssoModelo("clientes.db");
  $clientes = $basededatos->dameDatos("clientes");
  $json = coseJSON($clientes);
  $vista = new OssoVista($json);
  $vista->pintaTabla();

?>