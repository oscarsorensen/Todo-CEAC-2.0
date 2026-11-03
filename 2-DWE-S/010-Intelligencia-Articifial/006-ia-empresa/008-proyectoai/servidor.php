<?php
header('Content-Type: application/json; charset=utf-8');

$db = new PDO("sqlite:ialocal.db");

$accion = $_GET['accion'] ?? 'chat';

// Lista de conversaciones para la barra lateral
if ($accion == 'listar') {
    echo json_encode(
        $db->query("SELECT id, titulo, fecha FROM conversaciones ORDER BY id DESC")
           ->fetchAll(PDO::FETCH_ASSOC)
    );
    exit;
}

// Mensajes de una conversación
if ($accion == 'mensajes') {
    $consulta = $db->prepare("
        SELECT mensaje, emisor, fecha
        FROM mensajes
        WHERE id_conversacion = ?
        ORDER BY rowid
    ");
    $consulta->execute([$_GET['id_conversacion'] ?? 0]);
    echo json_encode($consulta->fetchAll(PDO::FETCH_ASSOC));
    exit;
}

$mensaje = $_GET['mensaje'];
$id_conversacion = $_GET['id_conversacion'] ?? null;

// Conversación nueva: se crea con el primer mensaje como título
if (!$id_conversacion) {
    $db->prepare("
        INSERT INTO conversaciones (titulo,fecha,id_usuario)
        VALUES (?,?,?)
    ")->execute([mb_strimwidth($mensaje, 0, 40, '…'), date('U'), 1]);
    $id_conversacion = $db->lastInsertId();
}

// Guardar mensaje del usuario
$db->prepare("
    INSERT INTO mensajes
    (mensaje,emisor,fecha,id_conversacion)
    VALUES (?,?,?,?)
")->execute([$mensaje,'usuario',date('U'),$id_conversacion]);

// Recuperar los últimos 6 mensajes
// (5 anteriores + el mensaje actual)
$consulta = $db->prepare("
    SELECT mensaje, emisor
    FROM mensajes
    WHERE id_conversacion = ?
    ORDER BY rowid DESC
    LIMIT 6
");
$consulta->execute([$id_conversacion]);

$mensajes = array_reverse($consulta->fetchAll(PDO::FETCH_ASSOC));

// Prompt del sistema
$systemprompt = "
Responde a lo que se te va a preguntar, pero:
1.-No puedes hablar de política (IMPORTANTE).
Si alguien pregunta sobre política, declina responder.
2.-Resume.
";

// Construir contexto
$contexto = "";

foreach ($mensajes as $m) {
    $rol = $m['emisor'] == 'usuario' ? 'Usuario' : 'Asistente';
    $contexto .= $rol . ": " . $m['mensaje'] . "\n";
}

$contexto .= "Asistente: ";

// Enviar a Ollama
$datos = [
    "model" => "qwen2.5:3b-instruct",
    "system" => $systemprompt,
    "prompt" => $contexto,
    "stream" => false
];

$curl = curl_init("http://localhost:11434/api/generate");

curl_setopt($curl, CURLOPT_POSTFIELDS, json_encode($datos));
curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);
curl_setopt($curl, CURLOPT_HTTPHEADER, ['Content-Type: application/json']);

$respuesta = json_decode(curl_exec($curl), true);

// Si Ollama no devuelve respuesta, no se guarda nada como mensaje de la IA
if (!isset($respuesta["response"])) {
    http_response_code(502);
    echo json_encode([
        "id" => (int)$id_conversacion,
        "error" => $respuesta["error"] ?? "Sin respuesta de Ollama"
    ]);
    exit;
}

// Guardar respuesta
$db->prepare("
    INSERT INTO mensajes
    (mensaje,emisor,fecha,id_conversacion)
    VALUES (?,?,?,?)
")->execute([
    $respuesta["response"],
    'ia',
    date('U'),
    $id_conversacion
]);

echo json_encode([
    "id" => (int)$id_conversacion,
    "respuesta" => $respuesta["response"]
]);
