<?php
  $accion = $_GET['accion'] ?? '';
  $db = new PDO("sqlite:chat.db");

  switch($accion){
    case "get":
      $resultado = $db->query("SELECT * FROM mensajes");
      $mensajes = [];
      while ($fila = $resultado->fetch(PDO::FETCH_ASSOC)) {
          $mensajes[] = $fila;
      }
      echo json_encode($mensajes);
      break;
    case "post":
      break;
  }
?>