<?php
  $fecha = date('YmdHis');
  $curl = curl_init("https://www.aemet.es/xml/municipios/localidad_46250.xml");
  curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);
  $respuesta = curl_exec($curl);
  echo $respuesta;
  if (!is_dir("predicciones")) mkdir("predicciones", 0777);
  file_put_contents("predicciones/prediccion".$fecha.".xml", $respuesta);
?>