<?php

  $curl = curl_init("http://localhost:8080/CEAC/CEAC-Year-Two/2-DWE-S/007-Programaci%c3%b3n-de-servicios-web/002-Est%c3%a1ndares-y-arquitecturas-actuales.-Formatos-de-intercambio-de-datos/001-API/SoftwareA/api.php");
  curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);
  $respuesta = curl_exec($curl);
  curl_close($curl);
  echo $respuesta;
?>