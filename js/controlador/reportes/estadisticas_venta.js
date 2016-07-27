$(function() {
    Funcion.cargarDropDownList(("#idSucursal"),
        'idSucursal',
        'nombre',
        API_SYS_PATH + 'sucursal/seleccionar',
        true,
        true,
        'Buscando Sucursal...',
        'Seleccione una Sucursal');

    $('#total').hide();
    $('#divDetalle').hide();

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

$("#venta").submit(function(){
    var total = $('#total');
    if(banderaGenerado){
        total.find('tbody').unbind('click');

        banderaGenerado=false;
    }

    var form1 = $("#venta").find("select,input").serializeArray();
    var datosTabla1 = {};
    form1.forEach(function(input) {
        datosTabla1[input.name] = input.value;
    });

    Funcion.peticionAjaxDT({
        RestUrl:'detalles_venta/seleccionar',
        DT:('#total'),
        datos:datosTabla1,
        arregloColumnas:[
            { data : "mpa_id" },
            { data : "metodo" },
            { data : "Total" }],
        loading:null,
        success:function(){
            banderaGenerado=true;
            llamarclic()
        },
        ocultarBusqueda:false,
        funcionDeColor:{Boton:true}
    });
    total.show();
    return false;

});


function llamarclic() {
    var table = $('#total').DataTable();
    $("div.toolbar").html("<button id='detalle' name='detalle' class='btn btn-success'>Obtener Detalles</button>");
    console.log(table);
    $('#total tbody').on('click', 'tr', function(){
        console.log('contador');
        if ($(this).hasClass('selected')) {
            $(this).removeClass('selected');
            console.log('remove');
        }
        else {
            table.$('tr.selected').removeClass('selected');
            $(this).addClass('selected');
            console.log('add');
        }
    });
    /**
     * @param {{mpa_id:string}} data
     */
    $('#detalle').click(function () {
        var idMetodo=table.row('.selected').data().mpa_id;
        var datosTabla1 = {};

        datosTabla1['idSucursal']=$('#idSucursal').val();
        datosTabla1['fechaInicio']=$('#fechaInicio').val();
        datosTabla1['fechaFin']=$('#fechaFin').val();
        datosTabla1['idMetodo']=idMetodo;

        var columnas = [
            { data : "tic_id" },
            { data : "descripcion" },
            { data : "fecha" },
            { data : "total" }
        ];

        Funcion.peticionAjaxDT({
            RestUrl: 'detalles_venta/seleccionarDetalles',
            DT:('#tablaDetalle'),
            datos:datosTabla1,
            arregloColumnas:columnas,
            loading:null//,
            /**null**/
            });
        $('#divDetalle').show();
        return false;
    });
}
var banderaGenerado=false;

$('#idSucursal').on('change',function(){
    limpiarTablas()
});
$('#fechaInicio').on('change',function(){
    limpiarTablas()
});
$('#fechaFin').on('change',function(){
    limpiarTablas()
});

function limpiarTablas(){
    $('#total').hide();
    $('#divDetalle').hide();
    $('#detalle').hide();
}