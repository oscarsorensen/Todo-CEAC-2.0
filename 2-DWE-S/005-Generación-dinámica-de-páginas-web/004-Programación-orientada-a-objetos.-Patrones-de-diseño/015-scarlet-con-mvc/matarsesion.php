<?php
session_start();
require_once 'modelo.php';
require_once 'controlador.php';
$modelo = new OssoModelo(__DIR__.'/empresa.db');
$controlador = new OssoControlador($modelo);
$controlador->logout();
header('Location:index.php');
exit();
