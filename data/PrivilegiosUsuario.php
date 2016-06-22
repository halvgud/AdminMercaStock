<?php
class PrivilegiosUsuario
{
    private $roles;

    public function __construct() {

    }

    public static function traerPrivilegios(){

        $service_url = 'http://localhost/APIMercaStock/public/usuario/permisos/obtener/'.$_SESSION['idUsuario'];
        $curl = curl_init($service_url);
        $curl_post_data = array(
        );
        curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($curl,CURLOPT_HTTPHEADER,array('Authorization:'.$_SESSION['ClaveAPI']));
        curl_setopt($curl, CURLOPT_POST, true);
        curl_setopt($curl, CURLOPT_POSTFIELDS, json_encode($curl_post_data));
        $curl_response = curl_exec($curl);
        if ($curl_response === false) {
            $info = curl_getinfo($curl);
            curl_close($curl);
            die('error occured during curl exec. Additional info: ' . var_export($info));
        }
        curl_close($curl);
        $decoded = ($curl_response);
        if (isset($decoded->response->status) && $decoded->response->status == 'ERROR') {
            die('error occured: ' . $decoded->response->errormessage);
        }
        return $decoded;
    }

   public static function tienePrivilegio($obj1, $field) {
       $dummy='{
  "SUPER ADMIN": {
    "DUMMY": true,
    "GENERAL": true,
    "ALTA_USUARIO": true,
    "ALTA_SUCURSAL": true,
    "PERMISOS": true,
    "PARAMETROS": true,
    "GENERAR_INVENTARIO": true,
    "ESTADISTICAS_VENTA": true,
    "MOVIMIENTO_ARTICULOS": true,
    "EXISTENCIAS": true,
    "INVENTARIO_SUCURSAL_ARTICULOS": true,
    "CATEGORIA": true,
    "DEPARTAMENTO": true,
    "ARTICULO": true,
    "BITACORA": true,
    "LISTADO_FIJO": true,
    "LISTADO_EXCLUYENTE": true
  }
}';

       $obj = json_decode($dummy);
      // var_dump($obj);
       if(gettype($obj)=='object'){
            foreach($obj as $item) {
                    if(isset($item->$field)) {
                        return $item->$field;
                    }
            }
       }
        return false;
    }
}