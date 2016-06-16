$(function() {
    cargarDropDownList(("#idSucursal"), 'idSucursal', 'nombre', API_SYS_PATH + 'sucursal/seleccionar', 12, false,'Seleccione una Sucursal');
});

$("#departamento").submit(function() {
    var form1 = $("#departamento").find("select,input").serializeArray();
    var datosTabla1 = {};
    datosTabla1['dt'] = 'true';
    form1.forEach(function(input) {
        datosTabla1[input.name] = input.value;
    });
    var datos = (datosTabla1);
    var columnas = [{
        data: "dep_idLocal"
    }, {
        data: "nombre"
    }, {
        data: "porcentaje"
    }];
    peticionAjaxDT('departamento/seleccionar', ('#resultadosSucursal'), datosTabla1, columnas, 'Buscando Departamentos');

    return false;
});
function borrar(){
    if($('#idSucursal').val()=='') {
        $('#resultadosSucursal').empty();
    }
}