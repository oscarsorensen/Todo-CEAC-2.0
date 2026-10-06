<?php
  $curl = curl_init("https://www.aemet.es/xml/municipios/localidad_46250.xml");
  curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);
  $respuesta = curl_exec($curl);
  echo $respuesta;
  file_put_contents("prediccion.xml", $respuesta);
?>