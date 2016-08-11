var banderaGenerado=false;
var banderaGenerado2=false;
var tablaDetalle;
var tablaCabecero;

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
    $('#divCabecero').hide();
});//$(function()

$("#inventario").submit(function(){
    $('#divCabecero').show();
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
  tablaCabecero=Funcion.peticionAjaxDT({
        RestUrl:'ajuste/seleccionar/cabecero',
        DT:('#tabla'),
        datos:datosTabla1,
        arregloColumnas:[
            { data: "idSucursal" },/*id de la sucursal*/
            { data: "descripcionSucursal" },/*nombre de la sucursal*/
            { data: "fechaSolicitud" },/*fecha de la solicitud, no confundir con la fecha de respuesta*/
            { data: "cantidadTotalInventario" },/*cantidad en variedad de productos*/
            { data: "cantidadInventario"},/*cantidad en variedad de productos inventariados*/
            /*{ data: "cantidadTotal" }, *//*suma total en cantidad de productos por inventariar*/
            /*{ data: "cantidadInventariada"},*//*suma total en cantidad de productos inventariados*/
            /*{ data: "diferencia" },*//*diferencia entre lo inventariado y lo real*/
            { data: "costo"} /*costo en base al precio de compra*/
        ],
        loading:null,
        success:function(){
            banderaGenerado=true;
            llamarclic();

        },
        ocultarBusqueda:undefined,
        funcionDeColor:{Boton:true}});
    $('#divDetalle').show();
    return false;

});




$('#tabla').find('tbody').on('click','tr',function(){
    if ($(this).hasClass('selected2')) {
        $(this).removeClass('selected2');
    }
    else {
        tablaCabecero.$('tr.selected2').removeClass('selected2');
        $(this).addClass('selected2');
    }
});


$('#tabla').find('tbody').on('dblclick', 'tr', function(){
    if ($(this).hasClass('selected')) {
        $(this).removeClass('selected');
    }
    else {
        tablaCabecero.$('tr.selected').removeClass('selected');
        $(this).addClass('selected');
        if(banderaGenerado2){
            $('#AjustarRegistros').unbind('click');
            $('#detalle').unbind('click');
            banderaGenerado2=false;
        }
        tablaDetalle=Funcion.peticionAjaxDT({
            RestUrl:'ajuste/seleccionar/detalle',
            DT:('#tablaDetalle'),
            datos : {
                idSucursal:$('#idSucursal').val(),
                fecha     :tablaCabecero.row('.selected').data().fechaSolicitud
            },
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
                { data : "edicion" },
                { data : "aplicar"}
            ], 'select': {
                'style': 'multi'
            },
            loading:'Cargando detalle...',
            funcionDeColor:{
                Boton:false,
                Posicion:1
            },
            columnDefs:[{
                'targets': -1,
                'checkboxes': {
                    'selectRow': false,
                    'selectAll': false
                }
            },{
                'targets':[1,3,4],
                visible:false
              }
            ],
            rowCallBack:function( row, data ) {
                if (data.edicion === "EDICION") {
                    $(row).find('td:eq(-2)').html("<button class='btn btn-info'>Ajuste</button>");
                }else
                {
                    $(row).find('td:eq(-2)').html("<b>"+data.edicion+"</b>");
                }

                if ((data.aplicarCheckBox).valueOf() != "1") {
                    $(row).find('input:eq(-1)').prop('disabled', 'disabled');
                }
            },
            success:function(){

                ajustar();
                banderaGenerado2=true;
                BootstrapDialog.closeAll();
            }
        });

        $('#divDetalle').show();

        return false;
    }

});

$('#tablaDetalle').find('tbody').on('click','tr',function(){
    var datatable=$('#tablaDetalle').DataTable();
    var datosRenglon = datatable.row($(this).parents('tr')).data();

});

$('#seleccionarTodos').on('click', function(){
    var rows = tablaDetalle.rows({ 'search': 'applied' }).nodes();
    $('input[type="checkbox"]', rows).not(':disabled').prop('checked', this.checked);

});



$('#tablaDetalle').find('tbody').on( 'click', 'button', function () {
    var datatable=$('#tablaDetalle').DataTable();
    var datosRenglon = datatable.row($(this).parents('tr')).data();
    var datosCelda = $(this).closest('td');
    var renglon =$(this).closest('tr');
    var datosCheckBox = $(this).closest('td').next();

    console.log(datosCelda);
    console.log(datosCheckBox);
    BootstrapDialog.show({
        title: 'Advertencia',
        message: 'Esta apunto de ajustar el artículo '+datosRenglon.descripcion+
        '\n\n existencia anterior:'+datosRenglon.existenciaEjecucion+
        '\n\n existencia nueva:'+datosRenglon.existenciaRespuesta +
        '\n \n ¿Desea Continuar?'
        ,
        style: 'width:85%;',
        closable: true,
        type: BootstrapDialog.TYPE_WARNING,
        onshown: function() {},
        buttons: [{
            id: 'btn-1',
            label: 'Cancelar',
            cssClass: 'btn-primary',
            action: function(dialog) {
                dialog.close();
            }
        }, {
            id: 'btn-2',
            label: 'Terminar',
            cssClass: 'btn-danger',
            action: function(dialog) {
                var cell = datatable.cell(datosCelda);
                var exitoAjuste = function(){
                    $('td:eq(-1)',renglon).html("<input type='checkbox' disabled/>");
                    cell.data("<p>AJUSTADO</p>").draw();
                };
                var falloAjuste = function(){
                    Funcion.notificacionError("Fallo al realizar ajuste, favor de notificar");
                };
                var arregloFinal =[];
                var arregloJson = {};
                arregloJson['idInventario']=datosRenglon.idInventario;
                arregloJson['idSucursal']=$('#idSucursal').val();
                arregloJson['idUsuario'] = $('#idUsuario').val();
                arregloFinal.push(arregloJson);
                console.log(arregloFinal);
                Funcion.peticionAjax(API_SYS_PATH + 'ajuste/insertar', arregloFinal, exitoAjuste, falloAjuste, "Enviando datos...");

                dialog.close();

            }
        }]
    });
});


function llamarclic() {
    //table = $('#tabla').DataTable();
    $("div.dt-buttons.btn-group").append("<button id='detalle' name='detalle' class='btn btn-success'>Obtener Detalles</button>");

    $('#detalle').click(function () {
        $('#tabla tbody tr.selected2').dblclick();
    });

}
function ajustar() {
    var div  = $('#tablaDetalle_wrapper');

    div.find("div.dt-buttons.btn-group").append("<button id='AjustarRegistros' name='AjustarRegistros' class='btn btn-warning' >Ajustar registros</button>");

    $('#detalle').click(function () {
        $('#tabla tbody tr.selected2').dblclick();
    });
    $('#AjustarRegistros').click(function(e){
        console.log('entro');
        BootstrapDialog.show({
            title:'Advertencia',
            message: 'Esta apunto de ajustar '+'cantidad'+' de articulos'
            +' La acción no se podrá deshacer'
            +'\n\n ¿Desea continuar?',
            closable:true,
            type:BootstrapDialog.TYPE_WARNING,
            onshown:function(){},
            buttons:[{
                id:'btnCancelar',
                label:'Cancelar',
                cssClass:'btn-info',
                action:function(dialog){
                    dialog.close();
                }
            },{
                id:'btnAceptar',
                label:'Terminar',
                cssClass:'btn-danger',
                action:function(dialog){
                    var rows = tablaDetalle.rows({ 'search': 'applied' }).nodes();
                    var arregloFinal =[];
                    $.each($('input[type="checkbox"]:checked', rows).not(':disabled'),function(index,rowId){
                        var arregloJson = {};
                        arregloJson['idInventario']=tablaDetalle.row(index).data().idInventario;
                        arregloJson['idSucursal']=$('#idSucursal').val();
                        arregloJson['idUsuario'] = $('#idUsuario').val();
                        arregloFinal.push(arregloJson);
                    });
                    var resultados = $("#tablaDetalles");
                    var exitoso = function(datos) {
                        Funcion.notificacionSuccess(datos.success);
                        return false;
                    };
                    var fallo = function(/*datos*/) {
                        return false;
                    };
                    resultados.find("tbody").empty();
                    console.log(arregloFinal);
                    Funcion.peticionAjax(API_SYS_PATH + 'ajuste/insertar', arregloFinal, exitoso, fallo, "Enviando datos...");
                    dialog.close();
                }
            }
            ]

        });
        e.preventDefault();
    });
}



