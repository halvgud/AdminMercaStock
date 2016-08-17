
$(function() {
    $('#total').hide();
    $('#divDetalle').hide();
    $('#min, #max').keyup( function() {
        dt.draw();
    } );
    Funcion.cargarDropDownList(("#idSucursal"),
        'idSucursal',
        'nombre',
        API_SYS_PATH + 'sucursal/seleccionar',
        true,
        false,
        'Buscando Sucursal...',
        'Seleccione una Sucursal');
    $.datetimepicker.setLocale('es');
    var dateNow = new Date();
    var month = dateNow.getUTCMonth() + 1; //months from 1-12
    var day = dateNow.getUTCDate();
    var year = dateNow.getUTCFullYear();

    var newdate = year + "-" + month + "-" + day;
    var fechaIni=$('#fechaInicio');
    var fechaFin=$('#fechaFin');
    fechaIni.datetimepicker({
        theme:'dark',
        format:'Y-m-d',
        useCurrent: false,

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
        useCurrent: false,
        onShow:function(  ){
            this.setOptions({
                minDate:fechaIni.val()?fechaIni.val():false
            })
        },
        timepicker:false
    });
    fechaIni.val(newdate);
    fechaFin.val(newdate);
});

$("#inventario").submit(function(){
    if(banderaGenerado){
        $('#tabla').find('tbody').unbind('click');

        banderaGenerado=false;
    }

    var form1 = $("#inventario").find("select,input").serializeArray();
    var datosTabla1 = {};
    form1.forEach(function(input) {
        datosTabla1[input.name] = input.value;
    });
    var columnas =[
        { data: "idSucursal" },
        { data: "nombre" },
        { data: "fecha" },
        { data: "total" },
        { data: "totalAcertado" },
        { data: "totalFallado" },
        { data: "costo"},
        { data: "bandera"}
    ];
    var arregloBoton={Boton:true,Posicion:7};
    Funcion.peticionAjaxDT({
        RestUrl:'inventario/reporte/cabecero',
        DT:('#tabla'),
        datos:datosTabla1,
        arregloColumnas:columnas,
        loading:null,
        success:function(){
            banderaGenerado=true;
            llamarclic();

        },
        ocultarBusqueda:undefined,
        funcionDeColor:arregloBoton});
    $('#total').show();
    return false;

});

function llamarclic() {
    var table = $('#tabla').DataTable();
    $("div.dt-buttons.btn-group").append("<button id='detalle' name='detalle' class='btn btn-success'>Obtener Detalles</button>");
    $('#tabla tbody').on('dblclick', 'tr', function(){
        if ($(this).hasClass('selected')) {
            $(this).removeClass('selected');
        }
        else {
            table.$('tr.selected').removeClass('selected');
            $(this).addClass('selected');
            dt=Funcion.peticionAjaxDT({
                RestUrl: 'inventario/reporte/detalle',
                DT: ('#tablaDetalle'),
                datos: {
                    idSucursal: $('#idSucursal').val(),
                    fecha: table.row('.selected').data().fecha
                },
                arregloColumnas: [
                    {data: "art_id"},
                    {data: "fechaSolicitud"},
                    {data: "clave"},
                    {data: "descripcion"},
                    {data: "existenciaSolicitud"},
                    {data: "existenciaEjecucion"},
                    {data: "existenciaRespuesta"},
                    {data: "diferencia"},
                    {data: "costo"},
                    {data: "bandera"},
                    {data: "edicion"}
                ],
                loading: null,
                funcionDeColor: {
                    Boton: false,
                    Posicion: 8
                },
                 columnDefs:[{
                 'targets':[0],
                 visible:false
                 }],
                rowCallBack: function (row, data) {
                    if (data.edicion === "edicion") {
                        $(row).find('td:eq(-1)').html("<button class='btn btn-info'>Agregar</button>");
                    } else {
                        $(row).find('td:eq(-1)').html("<b>" + data.edicion + "</b>");
                    }
                }
            });
            $('#divDetalle').show();
            return false;
        }
    });

    $('#detalle').click(function () {

    });
}

$('#tablaDetalle').find('tbody').on( 'click', 'button', function () {
    var datatable=$('#tablaDetalle').DataTable();
    var cell = datatable.cell($(this).closest('td'));
    var datosRenglon = datatable.row($(this).parents('tr')).data();
    Funcion.mostrarDialogoDeEspera('Guardando...');
    Funcion.peticionAjax({
        Url:API_SYS_PATH+'inventario/temporal/agregar',
        datos:{
                idSucursal:$('#idSucursal').val(),
                art_id:datosRenglon.art_id
            },
        success:function(resultado){
            cell.data("<p>AGREGADO</p>").draw(false);
            Funcion.notificacionSuccess("Guardado con éxito...");
        },
        mensajeDeEspera:'Guardando en lista temporal'
    });

    BootstrapDialog.closeAll();
    return false;
});

var banderaGenerado=false;
var dt;
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

$.fn.dataTable.ext.search.push(
    function( settings, data ) {

        var min = parseFloat( $('#min').val() );
        var max = parseFloat( $('#max').val() );
        var age = parseFloat( data[$('#idConcepto').val()] ) || 0; // use data for the age column
        //console.log(age + "--"+min+"--"+max);
        return !!(( isNaN(min) && isNaN(max) ) ||
        ( isNaN(min) && age <= max ) ||
        ( min <= age && isNaN(max) ) ||
        ( min <= age && age <= max ));

    }
);




