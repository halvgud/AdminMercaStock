<?php
    if (session_status() == PHP_SESSION_NONE) {
        session_start();
    }
$postrequest = json_decode(file_get_contents('php://input'));
if(validarSession($postrequest)) {
    $_SESSION['idUsuario'] = $postrequest->datos->idUsuario;
    $_SESSION['usuario'] = $postrequest->datos->Usuario;
    $_SESSION['idNivelAutorizacion'] = $postrequest->datos->idNivelAutorizacion;
    $_SESSION['ClaveAPI'] = $postrequest->datos->ClaveAPI;
    http_response_code(200);
    echo json_encode($postrequest);
}else{
    http_response_code(401);
    $arreglo = array(
        'error'=>"Error de autenticacion"
    );
    echo json_encode($arreglo);
}
function validarSession($postrequest){
   // $service_url = 'http://mercastock.mercatto.mx/API/public/usuario/seleccionarApi';
    $service_url = 'http://localhost/apimercastock/public/usuario/seleccionarApi';
    $curl = curl_init($service_url);
    $clave= $postrequest->datos->ClaveAPI;
    $usuario = $postrequest->datos->Usuario;

    $curl_post_data = array(
        'ClaveAPI'=>$postrequest->datos->ClaveAPI,
        'Usuario'=>$usuario
    );
    $datos = array('datos'=>$curl_post_data);
    $data_string = json_encode($datos);
    curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($curl, CURLOPT_POST, true);
    curl_setopt($curl, CURLOPT_POSTFIELDS, $data_string);

    curl_setopt($curl, CURLOPT_HTTPHEADER, array(
        'Authorization:'.$clave,
            'Content-Type: application/json',
            'Content-Length: ' . strlen($data_string))
    );
    $curl_response = curl_exec($curl);
    $decoded = json_decode($curl_response);
    $httpcode = curl_getinfo($curl, CURLINFO_HTTP_CODE);
    curl_close($curl);
    if ($httpcode == '200') {
        return true;
    }
    return false;

}