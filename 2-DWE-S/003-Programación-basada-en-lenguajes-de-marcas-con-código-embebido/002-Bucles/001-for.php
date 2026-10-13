<?php
	// Un div por cada día del mes, del 1 al 31 (el CSS les da el aspecto de calendario)
	for($dia = 1;$dia <= 31;$dia++){
  	echo "<div class='dia'>".$dia."</div>";
  }
?>