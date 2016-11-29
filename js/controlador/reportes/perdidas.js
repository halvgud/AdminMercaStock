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
$(function(){
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
$("#inventario").submit(function(){
    if(banderaGenerado){
        $('#total').find('tbody').unbind('click');

        banderaGenerado=false;
    }

    var form1 = $("#inventario").find("select,input").serializeArray();
    var datosTabla1 = {};
    form1.forEach(function(input) {
        datosTabla1[input.name] = input.value;
    });
    console.log(datosTabla1);
    var columnas =[
        /*{ data: "Sucursal" },
        { data: "Fecha" },
        { data: "cantidadInventario" },
        { data: "cantidadTotal" },
        { data: "cantidadFaltante" },
        { data: "costo" },
        { data: "perdida"}*/

        { data: "idSucursal" },
        { data: "nombre" },
        { data: "fecha" },
        { data: "total" },
        { data: "totalAcertado" },
        { data: "totalFallado" },
        { data: "bandera"}
    ];
    var success=function(){
        banderaGenerado=true;
        //llamarclic();

    };

    Funcion.peticionAjaxDT({
        RestUrl: '/perdidas/reporte/cabecero',
        DT: ('#total'),
        datos:datosTabla1,
        arregloColumnas:columnas,
        loading:null,
        success:success,
        funcionDeColor:{Boton:true,PosicionColor:6,PosicionOrden:6}
});
    $('#total').show();
    return false;

});