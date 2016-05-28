<?php
if (session_status() == PHP_SESSION_NONE) {
    session_start();
}
$postrequest = json_decode(file_get_contents('php://input'));
$_SESSION['idUsuario']=$postrequest->datos->idUsuario;
$_SESSION['usuario']=$postrequest->datos->Usuario;
$_SESSION['idNivelAutorizacion']=$postrequest->datos->idNivelAutorizacion;
$_SESSION['ClaveAPI']=$postrequest->datos->ClaveAPI;
http_response_code(200);
echo json_encode($postrequest);