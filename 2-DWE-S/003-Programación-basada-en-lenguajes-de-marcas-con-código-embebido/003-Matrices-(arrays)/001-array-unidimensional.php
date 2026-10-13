<?php
	$listadelacompra = ['manzanas','peras','platanos'];
  var_dump($listadelacompra);
  echo "<br>";
  // array_push añade un elemento al final del array
  array_push($listadelacompra,'naranjas');
  var_dump($listadelacompra);
  echo "<br>";
  // Los índices empiezan en 0, así que esto imprime 'manzanas'
  echo $listadelacompra[0];
?>