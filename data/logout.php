<?php
session_start();
session_destroy();
	$resArray = array();
	$resArray['success'] = 'Ha cerrado la sesion';
	echo json_encode($resArray);
?>
