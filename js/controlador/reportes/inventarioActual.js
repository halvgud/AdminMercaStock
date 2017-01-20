var banderaGenerado=false;

$(function() {
    $('#total').hide();
    $('#divDetalle').hide();
    Funcion.cargarDropDownList(("#idSucursal"),
        'idSucursal',
        'nombre',
        API_SYS_PATH + 'sucursal/seleccionar',
        true,
        false,
        'Buscando Sucursal...',
        'Seleccione una Sucursal');
});
$("#inventarioActual").submit(function(){
    var form1 = $("#inventarioActual").find("select,input").serializeArray();
    var datosTabla1 = {};
    form1.forEach(function(input) {
        datosTabla1[input.name] = input.value;
    });
    console.log(datosTabla1);
    var columnas =[
        { data: "fecha" },
        {data:"departamento"},
        { data: "nombre" },
        { data: "existenciareal" },
        { data: "existenciasistema" },
        { data: "cancelar" }
    ];

    Funcion.peticionAjaxDT({
        RestUrl: '/inventario/reporte/actual',
        DT: ('#resultados'),
        datos:datosTabla1,
        arregloColumnas:columnas,
        loading:null,
        rowCallBack:function(row, data){
            $(row).find('td:eq(-1)').html("<button class='btn btn-danger'>Cancelar</button>");
        }
    });
    $('#resultados').show();
    return false;

});