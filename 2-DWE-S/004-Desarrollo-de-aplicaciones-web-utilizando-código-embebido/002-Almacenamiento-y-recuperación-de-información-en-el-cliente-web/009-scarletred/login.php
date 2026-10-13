<?php
	session_start();
	if(
    $_POST['usuario'] == "osso" 								// Si el usuario es osso
    && 
    $_POST['contrasena'] == "osso"							// Y la contraseña es osso
    ){
      $_SESSION['llave'] = "osso"; 						// En ese caso te doy la llave
      setcookie("llave", "osso");
      header("Location:index.php"); 			// Vamos al escritorio
    }else{
    	header("Location:ningunaparte.html");	// Volvemos al login
    }
?>