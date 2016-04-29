<?php
session_start();
session_destroy();
	$resArray['mensaje'] = 'Ha cerrado la sesion';
	return json_encode($resArray);
?>
