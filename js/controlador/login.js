exitoso = function(datos){
    API_TOKEN=datos['datos']['ClaveAPI'];
    exitoso2 = function(datos){
        window.location.reload();
    }
    peticionAjax(LOCAL_PATH+"setSession.php",datos,exitoso2,fallo);



};
fallo = function(datos){

};
$("#loginForm").submit(function(){
    var form = $("#loginForm").serializeArray();
    var datos = {};
    form.forEach(function(input) {
        datos[input.name] = input.value;
    });
    peticionAjax(API_SYS_PATH+'usuario/login',datos,exitoso,fallo,"cargando...");
    return false;
});