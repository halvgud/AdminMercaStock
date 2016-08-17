exitoso = function(datos){
    API_TOKEN=datos['datos']['ClaveAPI'];
    var exitoso2 = function(){
        window.location.reload();
    };
    Funcion.peticionAjax({Url:LOCAL_PATH+"setSession.php",datos:datos,success:exitoso2,error:fallo});



};
fallo = function(datos){

};
$("#loginForm").submit(function(){
    var form = $("#loginForm").serializeArray();
    var datos = {};
    form.forEach(function(input) {
        datos[input.name] = input.value;
    });
    Funcion.peticionAjax({Url:API_SYS_PATH+'usuario/login',datos:datos,success:exitoso,error:fallo,mensajeDeEspera:"cargando..."});
    return false;
});