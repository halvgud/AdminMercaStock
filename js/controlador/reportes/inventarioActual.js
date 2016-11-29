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
$.datetimepicker.setLocale('es');
var fechaIni=$('#fechaInicio');
var fechaFin=$('#fechaFin');
fechaIni.datetimepicker({
    theme:'dark',
    format:'Y-m-d',
    onShow:function( ){
        this.setOptions({
            maxDate:fechaFin.val()?fechaFin.val():false
        })
    },
    timepicker:false
});
fechaFin.datetimepicker({
    theme:'dark',
    format:'Y-m-d ',
    onShow:function(  ){
        this.setOptions({
            minDate:fechaIni.val()?fechaIni.val():false
        })
    },
    timepicker:false
});
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
        { data: "estado" }
    ];
    var success=function(){

    };

    Funcion.peticionAjaxDT({
        RestUrl: '/inventario/reporte/actual',
        DT: ('#resultados'),
        datos:datosTabla1,
        arregloColumnas:columnas,
        loading:null,
        success:success
    });
    $('#resultados').show();
    return false;

});