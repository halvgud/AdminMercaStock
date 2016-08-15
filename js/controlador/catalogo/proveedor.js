$(function() {
    Funcion.cargarDropDownList(("#idSucursal"),
        'idSucursal',
        'nombre',
        API_SYS_PATH + 'sucursal/seleccionar',
        12, false,'Seleccione una Sucursal');
});

$("#proveedor").submit(function() {
    var form1 = $("#proveedor").find("select,input").serializeArray();
    var datosTabla1 = {};
    datosTabla1['dt'] = 'true';
    form1.forEach(function(input) {
        datosTabla1[input.name] = input.value;
    });
    Funcion.peticionAjaxDT({
        RestUrl:'proveedor/seleccionar',
        DT:('#resultadosProveedor'),
        datos:datosTabla1,
        arregloColumnas: [
            {data: "pro_id"},
            {data: "nombre"},
            {data: "representante"},
            {data:"telefono"},
            {data: "rfc"}
        ],
        loading:'Buscando proveedores'});
    return false;
});
$('#idSucursal').on('change',function(){
    if($('#idSucursal').val()=='') {
        $('#resultadosProveedor').empty();
    }
});