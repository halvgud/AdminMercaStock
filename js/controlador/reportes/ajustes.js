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
    var dateNow = new Date();
    var month = dateNow.getUTCMonth() + 1; //months from 1-12
    var day = dateNow.getUTCDate();
    var year = dateNow.getUTCFullYear();
    var newdate = year + "-" + month + "-" + day;
    var month2 = month==1?month:month-1;
    var day2 = month==1?1:day;
    var newdate2 = year + "-" + month2 + "-" +day2;
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
    fechaIni.val(newdate2);
    fechaFin.val(newdate);
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
        { data: "fecha" },
        {data : "nombre"},
        { data: "TotalEsperado"},
        { data: "TotalAcertado"},
        { data: "TotalFallado" },
        { data: "costo"},
        { data: "costo2"},
        { data: "bandera"},
        { data: "bandera2"},
        { data: 'detalle'}
    ];
    var success=function(){
        banderaGenerado=true;
    };
    Funcion.peticionAjaxDT({
        RestUrl: '/perdidas/reporte/cabecero',
        DT: ('#total'),
        datos:datosTabla1,
        arregloColumnas:columnas,
        loading:'Cargando lista de perdidas...',
        success:success,
        funcionDeColor:{PosicionColor:7,PosicionColor2:8},
        rowCallBack:function(row, data){
            $(row).find('td:eq(-1)').html("<button class='btn btn-info' disabled='disabled'>Detalle</button>");
        }
    });
    $('#total').show();
    return false;

});