
<?php

$API_KEY_CORRECTA = "oscar_123456789_segura";
header("Content-Type: application/json; charset=UTF-8");

$api_key = $_SERVER["HTTP_X_API_KEY"] ?? "";

if ($api_key !== $API_KEY_CORRECTA) {
    http_response_code(401);
    echo json_encode([
        "error" => true,
        "mensaje" => "API Key incorrecta o no proporcionada"
    ]);
    exit;
}

http_response_code(200);

echo json_encode([
    "nombre" => "Oscar",
    "apellidos" => "Sorensen",
    "email" => "info@oscar.com"
], JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE);

?>

