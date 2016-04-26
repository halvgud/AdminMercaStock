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
    peticionAjax('http://localhost/ApiMercastock/public/usuario/login',datos,exitoso,fallo);
    
    return false;
});