<?php

  $image = imagecreatefromjpeg("bob.jpeg");
  $color = imagecolorat($image, 0, 0);
  imagedestroy($image);
  echo $color;

?>