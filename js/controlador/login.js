exitoso = function(datos){
    API_TOKEN=datos['datos']['ClaveAPI'];
    var exitoso2 = function(){
        window.location.reload();
    };
    Funcion.peticionAjax(LOCAL_PATH+"setSession.php",datos,exitoso2,fallo);



};
fallo = function(datos){

};
$("#loginForm").submit(function(){
    var form = $("#loginForm").serializeArray();
    var datos = {};
    form.forEach(function(input) {
        datos[input.name] = input.value;
    });
    Funcion.peticionAjax(API_SYS_PATH+'usuario/login',datos,exitoso,fallo,"cargando...");
    return false;
});