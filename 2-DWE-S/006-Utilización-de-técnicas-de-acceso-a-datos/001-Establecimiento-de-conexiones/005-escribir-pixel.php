<?php

$image = imagecreatefromjpeg("bob.jpeg");

// Color que queremos pintar
$r = 255;
$g = 0;
$b = 0;

// Crear el color
$color = imagecolorallocate($image, $r, $g, $b);

// Pintar el píxel (0, 0)
imagesetpixel($image, 0, 0, $color);

// Guardar la imagen modificada
imagejpeg($image, "resultado.jpeg");



echo "Píxel pintado";

?>