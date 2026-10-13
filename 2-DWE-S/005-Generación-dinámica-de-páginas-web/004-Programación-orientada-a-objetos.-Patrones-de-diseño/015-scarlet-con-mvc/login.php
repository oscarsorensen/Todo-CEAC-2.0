<?php
session_start();
require_once 'modelo.php';
require_once 'controlador.php';
if ($_SERVER['REQUEST_METHOD'] !== 'POST') { header('Location:index.php'); exit(); }
$modelo = new OssoModelo(__DIR__.'/empresa.db');
$controlador = new OssoControlador($modelo);
if ($controlador->login($_POST['usuario'] ?? '', $_POST['contrasena'] ?? '')) header('Location:index.php');
else header('Location:index.php?error=1');
exit();
