exitoso = function(datos){
    window.location.reload();
};
fallo = function(datos){

};
$("#loginForm").submit(function(){
    var form = $("#loginForm").serializeArray();
    var datos = {};
    form.forEach(function(input) {
        datos[input.name] = input.value;
    });
    peticionAjax(API_SYS_PATH+'usuario/login',datos,exitoso,fallo);
    
    return false;
});