<?php

  // Inicializo la conexión
  $curl = curl_init(
    "http://localhost:8080/CEAC/CEAC-Year-Two/2-DWE-S/007-Programaci%c3%b3n-de-servicios-web/002-Est%c3%a1ndares-y-arquitecturas-actuales.-Formatos-de-intercambio-de-datos/001-API/SoftwareA/api2.php"
  );

  // Quiero que me devuelva la respuesta
  curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);

  // Envío la API Key /////////// IMPORTANTE
  curl_setopt($curl, CURLOPT_HTTPHEADER, [
    "X-API-Key: oscar_123456789_segura"
  ]);

  // Ejecuto la petición
  $respuesta = curl_exec($curl);

  // Cierro la conexión
  curl_close($curl);

  // Muestro la respuesta
  echo $respuesta;

?>