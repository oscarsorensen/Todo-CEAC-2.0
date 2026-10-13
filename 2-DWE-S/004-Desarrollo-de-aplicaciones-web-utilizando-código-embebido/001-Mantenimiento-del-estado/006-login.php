<?php
	session_start();
	if(
    $_POST['usuario'] == "osso" 								// Si el usuario es osso
    && 
    $_POST['contrasena'] == "osso"							// Y la contraseña es osso
    ){
      $_SESSION['llave'] = "osso"; 						// En ese caso te doy la llave
      header("Location:007-escritorio.php"); 			// Vamos al escritorio
    }else{
    	header("Location:005-inicio de sesion.html");	// Volvemos al login
    }
?>