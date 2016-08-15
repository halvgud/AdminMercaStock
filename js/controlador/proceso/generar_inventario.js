var CONFIGURACION_LISTA_FIJA = 0;
var CONFIGURACION_AZAR = 1;
var CONFIGURACION_MAS_VENDIDOS = 2;
var CONFIGURACION_MAS_CONFLICTIVOS = 3;
var CONFIGURACION_INDIVIDUAL = 4;
var CONFIGURACION_TODA_CATEGORIA=5;
var CONFIGURACION_PROVEEDOR=6;
var CONFIGURACION_PROVEEDOR_BUSQUEDA=6.5;
var tabla;
var tabla2;
var contador = 0;
var removerModal;

/*se carga el DOM*/
$(function() {
    Funcion.cargarDropDownList(("#idSucursal"), 'idSucursal', 'nombre', API_SYS_PATH + 'sucursal/seleccionar', 12, false, 'cargando', 'Seleccione una Sucursal');
    var idSuc=$('#idSucursal');
    idSuc.change(function() {
        $("#concepto").empty();
        $("#dep_id").empty();
        $("#cat_id").empty();
        $("#resultados").find("tbody").empty();
        Funcion.cargarDropDownList(("#concepto"), 'idConcepto', 'descripcion', API_SYS_PATH + 'concepto/seleccionar', 12, false, 'cargando', 'Seleccione un Concepto');
        if (idSuc.val() != "") {
            configuracionListaFija();
            Funcion.cargarDropDownList(("#dep_id"), 'dep_id', 'nombre', API_SYS_PATH + 'departamento/seleccionar', $("#idSucursal").val(), true, 'Cargando...', 'Seleccione un Departamento');
        }
    });
    $('#dep_id').change(function() {
        $("#cat_id").empty();
        var columnas = {
            idSucursal: $("#idSucursal").val(),
            dep_id: $("#dep_id").val()
        };
        if (idSuc.val() != "") {
            Funcion.cargarDropDownList(("#cat_id"), 'cat_id', 'nombre', API_SYS_PATH + 'categoria/seleccionar', columnas, true, 'Cargando...', 'Seleccione una Categoria');
        }
    });
});

/*se inicializan datetimepickers*/
function InicializarDateTimePicker() {
    $.datetimepicker.setLocale('es');
    var horaInicio=$('#hora_inicio');
    var horaFin=$('#hora_fin');
    horaInicio.datetimepicker({
        theme: 'dark',
        format: 'Y-m-d',
        onShow: function() {
            this.setOptions({
                maxDate: horaFin.val() ? horaFin.val() : false
            })
        },
        timepicker: false
    });
    horaFin.datetimepicker({
        theme: 'dark',
        format: 'Y-m-d ',
        onShow: function() {
            this.setOptions({
                minDate: horaInicio.val() ? horaInicio.val() : false
            })
        },
        timepicker: false
    });
}

/*
* Función que cuenta los registros en la tabla inferior y muestra el número en el header
* */
function cantidadDeRegistros(){
    var rowCount = $('#resultados').find('tr').length;
    $('#titulo').text('Generar Inventario - Productos : '+(rowCount-1));

}
function AgregarInputCantidad(form_group){
    var label = $("<label></label>", { for: 'cantidad', text: 'Cantidad:\u00a0'});
    var nombre = $("<input>", { id: 'cantidad', name: 'cantidad', value: '10', type: 'number', class: 'form-control', required: 'required', style: 'width:15%;'});
    form_group.append(label);
    form_group.append(nombre);
    return form_group;
}
function AgregarInputBusquedaIndividual(form_group){
    var label = $("<label></label>", { for: 'input', text: 'Clave o Descripción del Artículo:\u00a0'});
    var  nombre = $("<input>", { id: 'input', name: 'input', value: '', type: 'text', class: 'form-control', required: 'required'});
    form_group.append(label);
    form_group.append(nombre);
    return form_group;
}
function AgregarDateTimePickers(form_group){
   var label = $("<label></label>", { for: 'hora_inicio', text: '\u00a0Inicio:\u00a0'});
    form_group.append(label);
    var inputInicio = $("<input>", { type: 'text', id: 'hora_inicio', name: 'hora_inicio', class: 'form-control', onclick: 'InicializarDateTimePicker();', autocomplete: 'off', style: 'width:20%;', readonly: 'readonly'});
    form_group.append(inputInicio);
    label = $("<label></label>", { for: 'hora_fin', text: '\u00a0Fin:\u00a0'});
    form_group.append(label);
    inputInicio = $("<input>", { type: 'text', id: 'hora_fin', name: 'hora_fin', class: 'form-control', onclick: 'InicializarDateTimePicker();', autocomplete: 'off', style: 'width:20%;', readonly: 'readonly'});
    form_group.append(inputInicio);
    var espacio = $("<label> &nbsp;&nbsp;&nbsp; </label>");
    form_group.append(espacio);
    return form_group;
}
function AgregarHiddenFieldBusquedaCategoria(form_group){
    //        form_group.append(espacio2);
    //label = $("<label></label>", { for: 'input', text: 'Clave o Descripción del Artículo:\u00a0'});
    var nombre = $("<input>", { id: 'cantidad', name: 'cantidad', value:'250', type: 'hidden', class: 'form-control', required: 'required'});
    //form_group.append(label);
    form_group.append(nombre);
    return form_group;
}
var dialogoProveedor;
function AgregarInputBusquedaDeProveedor(form_group){
    var form_group2 = $("<div></div>", { class: 'form-inline'});//var espacio2 = $("<label> &nbsp;&nbsp; </label>");
    var id = $("<input>",{id:'idProveedor',name:'idProveedor',value:'',type:'hidden',class:'form-control',required:'required',readonly:'readonly'});
    var nombre =$("<input>",{id:'nombreProveedor',name:'nombreProveedor',value:'',type:'text',class:'form-control',required:'required',readonly:'readonly' , style: 'width:30%;'});
    var buscarProveedor=$("<button></button>",{id: "buscarProveedor", name: "buscarProveedor", type: 'button', class: 'btn btn-warning', text: 'Buscar Proveedor', onclick: 'this.blur();'});
    form_group.append(id);
    form_group.append(nombre);
    form_group.append(buscarProveedor);
    /*nuevo bootstrapdialog*/
    var cuadroDeBusquedaProveedor = $("<form></form>", {id: 'formSucursal', name: 'formSucursal'});
    var tablaDeProveedores = $("<table></table>",{id:'resultadoProveedor',name:'resultadoProveedor' ,class:'table table-condensed text-center'});
    var theadProveedores = $("<thead></thead>");
    var tr=$("<tr></tr>");
    var th1=$("<th></th>").append('Id');
    var th2=$("<th></th>").append('Nombre');
    var th3=$("<th></th>").append('Representante');
    var th4=$("<th></th>").append('Seleccionar');
    tr.append(th1);
    tr.append(th2);
    tr.append(th3);
    tr.append(th4);
    theadProveedores.append(tr);
    tablaDeProveedores.append(theadProveedores);
    cuadroDeBusquedaProveedor.append(form_group2);
    cuadroDeBusquedaProveedor.append(tablaDeProveedores);
    $(buscarProveedor).click(function(){
        dialogoProveedor= BootstrapDialog.show({
            title:'Buscar Proveedor',
            message:function(){
                return cuadroDeBusquedaProveedor;
            },
            buttons: [{
                id: 'cancelarProveedor',
                label: 'Cancelar',
                cssClass: 'btn-primary',
                action: function(dialog) {
                    dialog.close();
                }
            }, {
                id: 'terminarProveedor',
                label: 'Terminar',
                cssClass: 'btn-danger',
                submit: function() {
                    return false;
                }
            }],
            closable:false,
            onshown:function(){
                inicializarTablaModalPopuUp(true);
                return false;
            }
        });
    });
    return form_group;
}
function AgregarTablaDeResultados(form_group){
   var espacio = $("<label> &nbsp;&nbsp;&nbsp; </label>");
    form_group.append(espacio);
    var gear = $("<a id='g2' style='display: none'><i class='fa fa-cog fa-spin fa-3x fa-fw' ></i></a>", {id: "gear", name: "gear"});
    form_group.append(gear);
    $('#g2').hide();
    var espacio3 = $("<br><br>");
    form_group.append(espacio3);
    tabla = $("<table></table>", { id: 'tabla1', name: 'tabla1', class: 'table table-condensed', style: ''});
    form_group.append(tabla);
    var $thead = $("<thead></thead>", {
        name: 'thead'
    });
    tabla.append($thead);
    var th1 = $("<th>Clave</th>");
    tabla.append(th1);
    th1 = $('<th>Descripci&oacute;n</th>');
    tabla.append(th1);
    th1 = $("<th>Existencia</th>");
    tabla.append(th1);
    th1 = $("<th>Edici&oacute;n</th>");
    tabla.append(th1);
    return form_group;
}
function AgregarBotonesYTablaContenido(form_group){
    var espacio = $("<label>&nbsp;&nbsp;&nbsp;</label>");
    form_group.append(espacio);
    var generarModalPopUp = $("<button></button>", {id: "can", name: "can", type: 'button', class: 'btn btn-success', text: 'Generar', onclick: 'this.blur();'});
    var terminarModalPopUp = $("<button></button>", {id: "done", name: "done", type: 'button', class: 'btn btn-info', text: 'Terminar', style:'visibility:hidden;'});
    form_group.append(generarModalPopUp);
    form_group.append(terminarModalPopUp);
    form_group=AgregarTablaDeResultados(form_group);

    var contenido = $("<form></form>", { name: 'formSucursal'});
    contenido.append(form_group);
    contenido.on("submit", function () {
        $(generarModalPopUp).click();
        return false;
    });
    $(generarModalPopUp).click(function() {
        var g2 = $('#g2');
        g2.show();
        inicializarTablaModalPopuUp();
        $(generarModalPopUp).focusout();
        g2.focus();
        $(terminarModalPopUp).removeAttr("style");
        return false;
    });
    $(terminarModalPopUp).click(function(){
        BootstrapDialog.closeAll();
        tabla2 = tabla;
        tabla.clone().find('tr').appendTo($("#resultados").find("tbody"));
        cantidadDeRegistros();
    });
    return contenido;
}

function configuracionGeneral(titulo, idTransaccion) {
    var form_group = $("<div></div>", { class: 'form-inline'});//var espacio2 = $("<label> &nbsp;&nbsp; </label>");
    if (idTransaccion != CONFIGURACION_INDIVIDUAL&&idTransaccion!=CONFIGURACION_TODA_CATEGORIA) {
        form_group=AgregarInputCantidad(form_group);
    }
    if (idTransaccion == CONFIGURACION_INDIVIDUAL) {
        form_group=AgregarInputBusquedaIndividual(form_group);
    }
    else if (idTransaccion == CONFIGURACION_MAS_CONFLICTIVOS || idTransaccion == CONFIGURACION_MAS_VENDIDOS) {
        form_group=AgregarDateTimePickers(form_group);
    }
    else if(idTransaccion==CONFIGURACION_TODA_CATEGORIA){
        form_group=AgregarHiddenFieldBusquedaCategoria(form_group);
    }
    else if(idTransaccion==CONFIGURACION_PROVEEDOR){
        form_group=AgregarInputBusquedaDeProveedor(form_group);
    }else{
        Funcion.notificacionWarning("Función no implementada");
    }
    var contenido = AgregarBotonesYTablaContenido(form_group);
    InicializarDateTimePicker();
    BootstrapDialog.show({
        title: titulo,
        message: function() {
            return contenido;
        },
        style: 'width:90%;',
        closable: false,
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
            submit: function() {
                return false;
            },
            action: function(dialog) {
                dialog.close();
                tabla2 = tabla;
                tabla.clone().find('tr').appendTo($("#resultados").find("tbody"));
                cantidadDeRegistros();
            }
        }]
    });
}


function configuracionListaFija() {
    var contenido = $("<form></form>", {id: 'formSucursal', name: 'formSucursal'});
    var form_group = $("<div></div>", {class: 'form-inline'});
    tabla = $("<table></table>", {id: 'tabla1', name: 'tabla1', class: 'table table-condensed', style: ''});
    form_group.append(tabla);
    var $thead = $("<thead></thead>", {name: 'thead'});
    tabla.append($thead);
    var th1 = $("<th>Clave</th>");
    tabla.append(th1);
    th1 = $("<th>Descripci&oacute;n</th>");
    tabla.append(th1);
    th1 = $("<th>Existencia</th>");
    tabla.append(th1);
    th1 = $("<th>Edici&oacute;n</th>");
    tabla.append(th1);
    contenido.append(form_group);
    var datosTabla4 = {};
    datosTabla4['idSucursal'] = $('#idSucursal').val();
    cargarTablaModalPopup(datosTabla4, CONFIGURACION_LISTA_FIJA);
    tabla2 = tabla;
    console.log(tabla.clone());
    tabla.clone().find('tr').appendTo($("#resultados").find("tbody"));
    //cantidadDeRegistros();
    return false;
}

function inicializarTablaModalPopuUp(bandera) {
    var idConcepto = $('#concepto').val();
    var idSucursal = $('#idSucursal').val();
    var datosTabla4 = {};
    datosTabla4['idSucursal'] = idSucursal;
    datosTabla4['cat_id'] = $('#cat_id').val();
    var cantidad =$('#cantidad');
    datosTabla4['cantidad'] = cantidad.val() != null ? cantidad.val() : 0;
    datosTabla4['dep_id'] = $('#dep_id').val();
    if (idConcepto == CONFIGURACION_MAS_VENDIDOS || idConcepto == CONFIGURACION_MAS_CONFLICTIVOS) {
        datosTabla4['fechaInicio'] = $('#hora_inicio').val();
        datosTabla4['fechaFin'] = $('#hora_fin').val();
    } else if (idConcepto == CONFIGURACION_INDIVIDUAL) {
        datosTabla4 = {};
        datosTabla4['idSucursal'] = idSucursal;
        datosTabla4['input'] = $('#input').val();
    }else if (idConcepto == CONFIGURACION_PROVEEDOR && bandera==undefined){
        datosTabla4 = {};
        datosTabla4['idSucursal'] = idSucursal;
        datosTabla4['pro_id'] = $('#idProveedor').val();
        //datosTabla4['input'] = $('#input').val();
    }
    if(bandera==undefined){
        cargarTablaModalPopup(datosTabla4, idConcepto);
    }else{
     cargarTablaModalPopup(datosTabla4,CONFIGURACION_PROVEEDOR_BUSQUEDA)
    }

}

function cargarTablaModalPopup(arregloConInputs, idTransaccion) {
    var idSucursal = $('#idSucursal').val();
    var idConcepto = idTransaccion;//$('#concepto').val();
    $("#tabla1").find("tbody").empty();
    var datosTabla1 = {};
    arregloConInputs['idTransaccion'] = idTransaccion;
    var form1 = $("#resultados").find('input[data1]').serializeArray();
    form1.forEach(function (input) {
        datosTabla1[input.name] = input.value;
    });
    arregloConInputs['articulos'] = datosTabla1;
    arregloConInputs['idSucursal'] = idSucursal;
    /**
     * @param {{estado:string}} result
     * @param {{success:string}} result
     */
    var exitoso = function (result) {
        if (typeof(result.estado)!= 'undefined') {
            if (result.estado == 'warning') {
                Funcion.notificacionWarning(result.success);
                $('#g2').hide();
                return;
            }
        }
        var find = false;
        if (result.data.length > 0) {
            console.log(result.data);
            result.data.forEach(function (element) {
                find = true;
                contador++;
                var row = $("<tr></tr>", {id: contador, name: 'row' + contador});
                var td = $("<td></td>");
                var claveArt = $("<input>", {name: "clave" + contador, id: "clave" + contador, class: 'form-control', value: element['clave'], style: 'width:85%;', readonly: 'readonly'});
                td.append(claveArt);
                row.append(td);
                var descArt = $("<input>", {name: "descripcion", id: "descripcion" + contador, class: 'form-control', value: element['descripcion'], readonly: 'readonly'});
                td = $("<td></td>");
                td.append(descArt);
                row.append(td);
                var idArt = $("<input>", {type: 'hidden', id: "art_id" + contador, name: "art_id" + contador, class: 'art form-control', value: element['art_id'], data1: 'true'});
                td.append(idArt);
                row.append(td);
                var exisArt = $("<input>", {id: "existencia" + contador, name: "existencia" + contador, type: 'text', class: 'form-control', value: element['existencia'], style: 'width:65%;', readonly: 'readonly'});
                td = $("<td></td>");
                td.append(exisArt);
                row.append(td);
                var icono = $("<i></i>", {class: 'fa fa-minus-square'});
                removerModal = $("<button></button>", {id: "cantidad" + contador, name: "cantidad" + contador, type: 'button', class: 'btn btn-outline btn-danger', readonly: 'readonly', onclick: 'remover(' + contador + ');'});
                $(removerModal).click(function () {
                    $(row).remove();
                    contador--;
                });
                removerModal.append(icono);
                td = $("<td></td>");
                td.append(removerModal);
                row.append(td);
                if (idTransaccion == CONFIGURACION_LISTA_FIJA) {
                    $("#resultados").append(row);
                } else {
                    $("#tabla1").append(row);
                }
                $('#g2').hide();
            });
            if (find) {
                tabla.show();
            }
        } else {
            Funcion.notificacionWarning('No se encontró información');
        }
    };
    var fallo = function (datos) {
    };
    if (idConcepto == CONFIGURACION_AZAR) {
        Funcion.peticionAjax(API_SYS_PATH + 'inventario/seleccionarAzar', arregloConInputs, exitoso, fallo);
    } else if (idConcepto == CONFIGURACION_MAS_VENDIDOS) {
        Funcion.peticionAjax(API_SYS_PATH + 'inventario/seleccionarMasVendidos', arregloConInputs, exitoso, fallo);
    } else if (idConcepto == CONFIGURACION_MAS_CONFLICTIVOS) {
        Funcion.peticionAjax(API_SYS_PATH + 'inventario/seleccionarMasConflictivos', arregloConInputs, exitoso, fallo);
    } else if (idConcepto == CONFIGURACION_INDIVIDUAL) {
        Funcion.peticionAjax(API_SYS_PATH + 'inventario/seleccionarIndividual', arregloConInputs, exitoso, fallo);
    }else if (idConcepto ==CONFIGURACION_TODA_CATEGORIA){
        Funcion.peticionAjax(API_SYS_PATH + 'inventario/seleccionarAzar', arregloConInputs, exitoso, fallo);
    }else if (idConcepto ==CONFIGURACION_PROVEEDOR){
        Funcion.peticionAjax(API_SYS_PATH + 'inventario/seleccionarPorProveedor', arregloConInputs, exitoso, fallo);
    }else if (idConcepto==CONFIGURACION_PROVEEDOR_BUSQUEDA){
        Funcion.peticionAjaxDT({
            RestUrl:'proveedor/seleccionar',
            DT:("#resultadoProveedor"),
            datos : {
                idSucursal:idSucursal
            },
            arregloColumnas:[
                { data : "pro_id" },
                { data : "nombre"},
                { data : "representante" },
                {data : 'edicion'}
            ], 'select': {
                'style': 'multi'
            },
            rowCallBack:function( row, data ) {
                if (data.edicion === "edicion") {
                    $(row).find('td:eq(-1)').html("<button class='btn btn-info'>Seleccionar</button>");
                }else
                {
                    $(row).find('td:eq(-1)').html("<b>"+data.edicion+"</b>");
                }
            },
            success:function(){
                $('#resultadoProveedor').find('tbody').on( 'click', 'button', function () {
                    var datatable = $('#resultadoProveedor').DataTable();
                    var datosRenglon = datatable.row($(this).parents('tr')).data();
                    console.log(datosRenglon);
                    $('#idProveedor').val(datosRenglon.pro_id);
                    $('#nombreProveedor').val(datosRenglon.nombre);
                    dialogoProveedor.close();
                    return false;
                });
                return false;
            }
        });
    }
    else{
        Funcion.peticionAjax(API_SYS_PATH + 'parametros/seleccionar/lista/fija/inventario', arregloConInputs, exitoso, fallo);
    }
    return false;
}

$("#send").submit(function() {
    var resultados = $("#resultados");
    var form1 = resultados.find("input[data1]").serializeArray();
    var datosTabla1 = {};
    var subArreglo = [];
    form1.forEach(function(input) {
        if ((input.name).indexOf("art_id") != -1) {
            subArreglo.push(input.value);
        }
    });
    datosTabla1['art_id'] = subArreglo;
    datosTabla1['idSucursal'] =  $('#idSucursal').val();
    datosTabla1['idUsuario'] = $('#idUsuario').val();
    var exitoso = function(datos) {
        Funcion.notificacionSuccess(datos.success);
        return false;
    };
    var fallo = function(/*datos*/) {
        return false;
    };
    var tbody = resultados.find("tbody").empty();
    Funcion.peticionAjax(API_SYS_PATH + 'inventario/insertar', datosTabla1, exitoso, fallo, "Enviando datos...");
    return false;
});

$("#inventario").submit(function() {
    var idConcepto = $('#concepto').val();
    var idCategoria = $('#cat_id').val();
    var idDepartamento = $('#dep_id').val();
    if (idConcepto == CONFIGURACION_AZAR && idCategoria != "" && idDepartamento != "") {
        configuracionGeneral("Configuración de búsqueda al azar", CONFIGURACION_AZAR);
    } else if (idConcepto == CONFIGURACION_MAS_VENDIDOS && idCategoria != "" && idDepartamento != "") {
        configuracionGeneral('Configuración de Búsqueda Mas Vendidos', CONFIGURACION_MAS_VENDIDOS);
    } else if (idConcepto == CONFIGURACION_MAS_CONFLICTIVOS && idCategoria != "" && idDepartamento != "") {
        configuracionGeneral('Configuración de Búsqueda Mas Conflictivos', CONFIGURACION_MAS_CONFLICTIVOS);
    } else if (idConcepto == CONFIGURACION_INDIVIDUAL) {
        configuracionGeneral("Configuración de búsqueda individual", CONFIGURACION_INDIVIDUAL);
    }
    else if (idConcepto == CONFIGURACION_TODA_CATEGORIA){
        configuracionGeneral("Configuración de búsqueda de departamento", CONFIGURACION_TODA_CATEGORIA);
    }
    else if (idConcepto == CONFIGURACION_PROVEEDOR){
        configuracionGeneral("Configuración de Búsqueda por Proveedor",CONFIGURACION_PROVEEDOR);
    }
    else {
        Funcion.notificacionWarning("Faltan parametros para la busqueda");
    }
    return false;
});
function remover(row){
    $('#'+row).remove();
    cantidadDeRegistros();
}