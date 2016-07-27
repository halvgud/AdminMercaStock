$(function() {
    Funcion.cargarDropDownList(("#idSucursal"),
        'idSucursal',
        'nombre',
        API_SYS_PATH + 'sucursal/seleccionar',
        12, false,'Seleccione una Sucursal');
});

$("#departamento").submit(function() {
    var form1 = $("#departamento").find("select,input").serializeArray();
    var datosTabla1 = {};
    datosTabla1['dt'] = 'true';
    form1.forEach(function(input) {
        datosTabla1[input.name] = input.value;
    });
    Funcion.peticionAjaxDT({
        RestUrl:'departamento/seleccionar',
        DT:('#resultadosSucursal'),
        datos:datosTabla1,
        arregloColumnas: [
            {data: "dep_idLocal"},
            {data: "nombre"},
            {data: "porcentaje"}
        ],
        loading:'Buscando Departamentos'});
    return false;
});
$('#idSucursal').on('change',function(){
    if($('#idSucursal').val()=='') {
        $('#resultadosSucursal').empty();
    }
});