var banderaGenerado=false;
var banderaGenerado2=false;
var tablaDetalle;
var tablaCabecero;
var tablaAgrupado;

$(function() {
    $('#divDetalle').hide();
    $('#divCabecero').hide();
    $('#divAgrupado').hide();
    $('#fechas').hide();
    var idSucursalDropDownList=$('#idSucursal');
    var fechaIni=$('#fechaInicio');
    var fechaFin=$('#fechaFin');
    var dateNow = new Date();
    var month = dateNow.getUTCMonth() + 1;
    var day = dateNow.getUTCDate();
    var year = dateNow.getUTCFullYear();
    var newdate = year + "-" + month + "-" + day;

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
    Funcion.cargarDropDownList(
        ("#idOpcion"), /*nombre de objeto Jquery*/
        'idMostrar',/*id de sql*/
        'nombre',/*campo de descripcion*/
        API_SYS_PATH + 'ajuste/mostrar', /*rest url*/
        undefined,/*idGenerico*/
        false,/*opcion de "Cargar Todos"*/
        'cargando'/*Dialogo de espera al hacer cambio...*/
    );
    $('#idOpcion').prop('disabled', true);
    idSucursalDropDownList.change(function() {
        $("#tablaCabecero").find("tbody").empty();
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
});//$(function()


$("#inventario").submit(function(){
    if($('#idOpcion').val()==1){
        cargarInventarioAgrupado();
    }/*else{
        cargarInventarioPorFecha();
    }*/
    return false;
});
$('#seleccionarTodosAgrupado').on('click', function(){
    var rows = tablaAgrupado.rows({ 'search': 'applied' }).nodes();
    $('input[type="checkbox"]', rows).not(':disabled').prop('checked', this.checked);
});


function cargarInventarioAgrupado(){
    $('#divAgrupado').show();
    tablaDetalle = $('#tablaDetalle');
    tablaCabecero = $('#tablaCabecero');
    tablaDetalle.find('tbody').empty();
    tablaCabecero.find('tbody').empty();
    tablaDetalle.hide();
    tablaCabecero.hide();
    $("div.dt-buttons.btn-group").remove();
    if(banderaGenerado){
        $('#tablaAgrupado').find('tbody').unbind('click');
        banderaGenerado=false;
    }
    var form1 = $("#inventario").find("select,input").serializeArray();
    var datosTabla1 = {};
    form1.forEach(function(input) {
        datosTabla1[input.name] = input.value;
    });
    tablaAgrupado=Funcion.peticionAjaxDT({
        RestUrl:'ajuste/seleccionar/todo',
        DT:('#tablaAgrupado'),
        datos:datosTabla1,
        banderaMostrarBusqueda:true,
        arregloColumnas:[
            {data:'fechaSolicitud'},
            {data:'idInventario'},
            {data:'idDepartamento'},
            {data:'departamento'},
            {data:'clave'},
            {data:'descripcion'},
            {data:'existenciaEjecucion'},
            {data:'existencia'},
            {data:'existenciaRespuesta'},
            {data:'cantidadDeVueltas'},
            {data:'diferencia'},
            {data:'costoActual'},
            {data:'edicion'},
            {data:'aplicar'}
        ], 'select': {
            'style': 'multi'
        },

        initComplete:function(){
            var div = $('#tablaAgrupado_wrapper');
            div.find("#tablaAgrupado_filter")
                .prepend("<label for='idDepartamento'>Departamento:</label>" +
                          "<select id='idDepartamento' name='idDepartamento' class='form-control' required></select>");
            Funcion.cargarDropDownList(
                ("#idDepartamento"),
                'dep_id',
                'nombre',
                API_SYS_PATH + 'departamento/seleccionar',
                $("#idSucursal").val(),
                false,
                'Buscando Departamentos...',
                'TODOS');
            this.api().column(2).each(function() {
                var column = this;
                $('#idDepartamento').on('change', function() {
                    var val = $(this).val();
                    console.log(val);
                    column.search(val ? '^' + val + '$' : '', true, false)
                        .draw();
                });
            });
        },
        drawCallback:function(settings){
            var api = this.api();
            var rows = api.rows( {page:'current'} ).nodes();
            var last=null;
            api.column(3, {page:'current'} ).data().each( function ( group, i ) {
                if ( last !== group ) {
                    $(rows).eq( i ).before(
                        '<tr class="even selected"><td colspan="11">'+group+'</td></tr>'
                    );
                    last = group;
                }
            } );
        },
        loading:'Cargando detalle...',
        funcionDeColor:{
            Boton:false,
            PosicionColor:1,PosicionOrden:1
        },
        columnDefs:[{
            'targets': -1,
            'checkboxes': {
                'selectRow': false,
                'selectAll': false
            }
        },{
            'targets':[1,2,3],
            visible:false
        }
        ],
        rowCallBack:function( row, data ) {
            if (data.edicion === "EDICION") {
                $(row).find('td:eq(-2)').html("<button class='btn btn-info'>Ajuste</button>");
            }
            else{
                $(row).find('td:eq(-2)').html("<b>"+data.edicion+"</b>");
            }
            if ((data.aplicarCheckBox).valueOf() != "1") {
             $(row).find('input:eq(-1)').prop('disabled', 'disabled');
             }
        },
        success:function(){
            ajustar('tablaAgrupado',tablaAgrupado);
            banderaGenerado2=true;
            BootstrapDialog.closeAll();
        }
    });
}

$('#tablaAgrupado').find('tbody').on('click','button',function(){
    var datatable = $('#tablaAgrupado').DataTable();
    var datosRenglon = datatable.row($(this).parents('tr')).data();
    var datosCelda = $(this).closest('td');
    var renglon =$(this).closest('tr');
    ajusteIndividual(datatable,datosRenglon,datosCelda,renglon);
});

function ajusteIndividual(datatable,datosRenglon,datosCelda,renglon){
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
                console.log('entro a action');
                var cell = datatable.cell(datosCelda);
                var exitoAjuste = function(){
                    console.log('entro a exitoAjuste');
                    $('td:eq(-1)',renglon).html("<input type='checkbox' disabled/>");
                    cell.data("<p>AJUSTADO</p>").draw(false);

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
                Funcion.peticionAjax({
                    Url:API_SYS_PATH + 'ajuste/insertar',
                    datos:arregloFinal,
                    success:exitoAjuste,
                    error:falloAjuste,
                    mensajeDeEspera:"Enviando datos..."
                });

                dialog.close();

            }
        }]
    });
}

function ajustar(tabla,tablaDeAjuste) {
    var div  = $('#'+tabla+'_wrapper');

    div.find("div.dt-buttons.btn-group").append("<button id='AjustarRegistros' name='AjustarRegistros' class='btn btn-warning' >Ajustar registros</button>");
/*
    $('#detalle').click(function () {
        $('#'+tabla+' tbody tr.selected2').dblclick();
    });*/
    $('#AjustarRegistros').click(function(e){
        var arregloFinal =[];
        var rows = $(tablaDeAjuste.rows({ 'search': 'applied' }).nodes()).filter(':has(:checkbox:checked:enabled)');
       // var rowcollection =  tablaDeAjuste.$($('tr').filter(':has(:checkbox:checked)'), {"page": "all"});
        var cantidad=0;
        var costo = 0;
        var ganancia=0;
        rows.each(function(index,elem){
            console.log(elem);
            //if($(elem).closest('checkbox').prop('disabled',false)){
                cantidad++;
                if(parseFloat(tablaDeAjuste.row(elem).data().costoActual)<0){
                    costo+=parseFloat(tablaDeAjuste.row(elem).data().costoActual);
                }else{
                    ganancia+=parseFloat(tablaDeAjuste.row(elem).data().costoActual);
                }
            //}
        });
        BootstrapDialog.show({
            title:'Advertencia',
            message: 'Está apunto de ajustar <b>'+cantidad+'</b> de articulos \n con un costo de <b>'+costo+'</b> y \nun ajuste' +
            ' positivo de <b>'+ganancia
            +'</b> \n <b>La acción no se podrá deshacer</b>'
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
                    rows.each(function(index,elem){
                        var arregloJson={};
                        arregloJson['idInventario']=tablaDeAjuste.row(elem).data().idInventario;
                        arregloJson['idSucursal']=$('#idSucursal').val();
                        arregloJson['idUsuario'] = $('#idUsuario').val();
                        arregloFinal.push(arregloJson);
                        $($(elem).find('td:eq(-1)')).html("<input type='checkbox' disabled/>");
                        var cell = tablaDeAjuste.cell($(elem).find('td:eq(-2)'));
                        cell.data("<p>AJUSTADO</p>").draw(false);
                    });
                    console.log(arregloFinal);
                    var exitoso = function(datos) {
                        Funcion.notificacionSuccess(datos.success);
                        return false;
                    };
                    var fallo = function(/*datos*/) {
                        return false;
                    };
                    Funcion.peticionAjax({Url:API_SYS_PATH + 'ajuste/insertar', datos:arregloFinal,success: exitoso,error: fallo,mensajeDeEspera: "Enviando datos..."});
                    dialog.close();
                }
            }
            ]

        });
        e.preventDefault();
    });
}

/***************************************************************/
/*FUNCIONES DE LA AGRUPACION POR FECHA*/
/***************************************************************/
/*
 function llamarclic() {
 //table = $('#tabla').DataTable();
 $("div.dt-buttons.btn-group").append("<button id='detalle' name='detalle' class='btn btn-success'>Obtener Detalles</button>");

 $('#detalle').click(function () {
 $('#tabla tbody tr.selected2').dblclick();
 });
 }*/

/*
 function cargarInventarioPorFecha(){
 $('#divCabecero').show();
 $("div.dt-buttons.btn-group").remove();
 $("#tablaDetalle").find("tbody").empty();
 $("#tablaCabecero").find("tbody").empty();
 if(banderaGenerado){
 $('#tablaCabecero').find('tbody').unbind('click');
 banderaGenerado=false;
 }
 var form1 = $("#inventario").find("select,input").serializeArray();
 var datosTabla1 = {};
 form1.forEach(function(input) {
 datosTabla1[input.name] = input.value;
 });
 tablaCabecero=Funcion.peticionAjaxDT({
 RestUrl:'ajuste/seleccionar/cabecero',
 DT:('#tablaCabecero'),
 datos:datosTabla1,
 arregloColumnas:[
 { data: "idSucursal" },//id de la sucursal
 { data: "descripcionSucursal" },//nombre de la sucursal
 { data: "fechaSolicitud" },//fecha de la solicitud, no confundir con la fecha de respuesta
 { data: "cantidadTotalInventario" },//cantidad en variedad de productos
 { data: "cantidadInventario"},//cantidad en variedad de productos inventariados
 { data: "costo"} //costo en base al precio de compra
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
 }*/



/*
 $('#tablaCabecero').find('tbody').on('click','tr',function(){
 if ($(this).hasClass('selected2')) {
 $(this).removeClass('selected2');
 }
 else {
 tablaCabecero.$('tr.selected2').removeClass('selected2');
 $(this).addClass('selected2');
 }
 });
 $('#tablaCabecero').find('tbody').on('dblclick', 'tr', function(){
 if ($(this).hasClass('selected')) {
 $(this).removeClass('selected');
 }
 else {
 tablaCabecero.$('tr.selected').removeClass('selected');
 $(this).addClass('selected');
 if(banderaGenerado2){
 $('#AjustarRegistros').unbind('click');
 $('#tablaDetalle').unbind('click');
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
 { data : "fechaSolicitud" }, //oculto
 { data : "idInventario"}, //oculto
 { data : "clave"},
 { data : "descripcion" },
 { data : "existenciaEjecucion" },//oculto
 { data : "existenciaRespuesta" },//oculto
 { data : "cantidadDeVueltas"},
 { data : "diferencia"},
 { data : "costoActual" },
 { data : "edicion" },
 { data : "aplicar"}
 ], 'select': {
 'style': 'multi'
 },
 loading:'Cargando detalle...',
 funcionDeColor:{
 Boton:false,
 PosicionColor:1,PosicionOrden:1
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
 }else{
 $(row).find('td:eq(-2)').html("<b>"+data.edicion+"</b>");
 }
 if ((data.aplicarCheckBox).valueOf() != "1") {
 $(row).find('input:eq(-1)').prop('disabled', 'disabled');
 }
 },
 success:function(){
 ajustar('tablaDetalle',tablaDetalle);
 banderaGenerado2=true;
 BootstrapDialog.closeAll();
 }
 });
 $('#divDetalle').show();
 return false;
 }
 });*/
/*
 $('#tablaDetalle').find('tbody').on('click','tr',function(){
 var datatable=$('#tablaDetalle').DataTable();
 var datosRenglon = datatable.row($(this).parents('tr')).data();

 });*/


/*
 $('#seleccionarTodos').on('change', function(){
 var rows = tablaDetalle.rows({ 'search': 'applied' }).nodes();
 $('input[type="checkbox"]', rows).not(':disabled').prop('checked', this.checked);

 });
 */
/*
 $('#tablaDetalle').find('tbody').on( 'click', 'button', function () {
 var datatable = $('#tablaDetalle').DataTable();
 var datosRenglon = datatable.row($(this).parents('tr')).data();
 var datosCelda = $(this).closest('td');
 var renglon =$(this).closest('tr');
 ajusteIndividual(datatable,datosRenglon,datosCelda,renglon);
 });*/

/*$('#idOpcion').change(function(){
 if($('#idOpcion').val()==1){
 $('#fechas').hide();

 }else{
 $('#fechas').show();
 }
 });*/
