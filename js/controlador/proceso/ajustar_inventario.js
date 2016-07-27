$(function() {
    var idSucursalDropDownList=$('#idSucursal');
    var dateNow = new Date();
    var month = dateNow.getUTCMonth() + 1; //months from 1-12
    var day = dateNow.getUTCDate();
    var year = dateNow.getUTCFullYear();
    var newdate = year + "-" + month + "-" + day;
    var fechaIni=$('#fechaInicio');
    var fechaFin=$('#fechaFin');
    Funcion.cargarDropDownList(
        ("#idSucursal"), /*nombre de objeto Jquery*/
        'idSucursal',/*id de sql*/
        'nombre',/*campo de descripcion*/
        API_SYS_PATH + 'sucursal/seleccionar', /*rest url*/
        true,/*idGenerico*/
        false,/*opcion de "Cargar Todos"*/
        'cargando', /*Dialogo de espera al hacer cambio...*/
        'Seleccione una Sucursal'/*Opción default e inicial*/
    );
    idSucursalDropDownList.change(function() {
        $("#tabla").find("tbody").empty();
       /* var arregloConInputs={};
        arregloConInputs['idSucursal'] = idSucursalDropDownList.val();
        Funcion.peticionAjax(API_SYS_PATH + 'ajuste/inventario/seleccionar', arregloConInputs, exitoso, fallo);*/
    });
    $.datetimepicker.setLocale('es');

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
    $('#divDetalle').hide();
});//$(function()

$("#inventario").submit(function(){
    $("div.dt-buttons.btn-group").remove();
    $("#tablaDetalle").find("tbody").empty();
    $("#tabla").find("tbody").empty();
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
        { data: "idSucursal" },/*id de la sucursal*/
        { data: "descripcionSucursal" },/*nombre de la sucursal*/
        { data: "fechaSolicitud" },/*fecha de la solicitud, no confundir con la fecha de respuesta*/
        { data: "cantidadTotalInventario" },/*cantidad en variedad de productos*/
        { data: "cantidadInventario"},/*cantidad en variedad de productos inventariados*/
        /*{ data: "cantidadTotal" }, *//*suma total en cantidad de productos por inventariar*/
        /*{ data: "cantidadInventariada"},*//*suma total en cantidad de productos inventariados*/
        /*{ data: "diferencia" },*//*diferencia entre lo inventariado y lo real*/
        { data: "costo"} /*costo en base al precio de compra*/
    ];
    var arregloBoton={Boton:true};
    console.log(datosTabla1);
    Funcion.peticionAjaxDT({
        RestUrl:'ajuste/seleccionar/cabecero',
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
    $('#divDetalle').show();
    return false;

});
var banderaGenerado=false;
var dt;

$('#tabla tbody').on('dblclick', 'tr', function(){
    if ($(this).hasClass('selected')) {
        $(this).removeClass('selected');
    }
    else {
        table.$('tr.selected').removeClass('selected');
        $(this).addClass('selected');
        dt=Funcion.peticionAjaxDT({
            RestUrl:'ajuste/seleccionar/detalle',
            DT:('#tablaDetalle'),
            datos : {idSucursal:$('#idSucursal').val(),
                fecha:table.row('.selected').data().fechaSolicitud},
            arregloColumnas:[
                { data : "fechaSolicitud" }, /*oculto*/
                { data : "idInventario"}, /*oculto*/
                { data : "descripcion" },
                { data : "existenciaEjecucion" },/*oculto*/
                { data : "existenciaRespuesta" },/*oculto*/
                { data : "cantidadDeVueltas"},
                { data : "diferencia"},
                { data : "costoActual" },
                { data : "costoAjuste" },
                {
                    "data": "edicion"/*,
                 "defaultContent": "<button class='btn btn-info'>Ajuste</button>"*/
                }
            ],
            loading:null,
            funcionDeColor:{
                Boton:false,
                Posicion:1,
                PosicionMultiple:[0,1,3,4],
                Visible:false,
                BotonDetalles:true
            },
            rowCallBack:function( row, data ) {
                if (data.edicion === "EDICION") {
                    $(row).find('td:eq(-1)').html("<button class='btn btn-info'>Ajuste</button>");
                }else
                {
                    $(row).find('td:eq(-1)').html("<b>data.edicion</b>");
                }
            }
        });
        $('#divDetalle').show();

        return false;
    }

});
$('#tablaDetalle tbody').on( 'click', 'button', function () {
    var datatable=$('#tablaDetalle').DataTable();
    var datosRenglon = datatable.row($(this).parents('tr')).data();
    BootstrapDialog.confirm({
        title: 'Advertencia',
        message: 'Esta apunto de ajustar el artículo '+datosRenglon.descripcion+
        '\n\n existencia anterior:'+datosRenglon.existenciaEjecucion+
        '\n\n existencia nueva:'+datosRenglon.existenciaRespuesta +
        '\n \n ¿Desea Continuar?',
        size: BootstrapDialog.SIZE_LARGE,
        type: BootstrapDialog.TYPE_WARNING, // <-- Default value is BootstrapDialog.TYPE_PRIMARY
        closable: false, // <-- Default value is false
        draggable: true, // <-- Default value is false
        btnCancelLabel: 'Regresar', // <-- Default value is 'Cancel',
        btnOKLabel: 'Continuar', // <-- Default value is 'OK',
        btnOKClass: 'btn-danger', // <-- If you didn't specify it, dialog type will be used,
        callback: function(result) {
            // result will be true if button was click, while it will be false if users close the dialog directly.
            /* if(result) {
             Funcion.notificacionSuccess('Se ha eliminado correctamente');
             $(tr).remove();
             arregloConInputs['parametro']=document.getElementById('idSucursal2').value;
             arregloConInputs['valor']=idSucursal;
             Funcion.peticionAjax(API_SYS_PATH + 'parametros/eliminarListaFija', arregloConInputs, exitoso, fallo);
             }else {

             }*/
        }
    });
} );

var table;
function llamarclic() {
    table = $('#tabla').DataTable();
    $("div.dt-buttons.btn-group").append("<button id='detalle' name='detalle' class='btn btn-success'>Obtener Detalles</button>");


    $('#detalle').click(function () {
        $('#tabla tbody').dblclick();
    });
}