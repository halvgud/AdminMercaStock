var CONFIGURACION_INDIVIDUAL = 4;
var desc='';
var cl='';
var input = '';
var contador=0;
$(function() {
    $('#total').hide();
    $('#divDetalle').hide();
    cargarDropDownList(("#idSucursal"), 'idSucursal', 'nombre', API_SYS_PATH + 'sucursal/seleccionar', true, false, 'Buscando Sucursal...', 'Seleccione una Sucursal');
});
jQuery(function(){
    $.datetimepicker.setLocale('es');
    jQuery('#fechaInicio').datetimepicker({
        theme:'dark',
        format:'Y-m-d',
        onShow:function( ct ){
            this.setOptions({
                maxDate:jQuery('#fechaFin').val()?jQuery('#fechaFin').val():false
            })
        },
        timepicker:false
    });
    jQuery('#fechaFin').datetimepicker({
        theme:'dark',
        format:'Y-m-d ',
        onShow:function( ct ){
            this.setOptions({
                minDate:jQuery('#fechaInicio').val()?jQuery('#fechaInicio').val():false
            })
        },
        timepicker:false
    });
});

$("#venta").submit(function(){

    //if(banderaGenerado){
       // $('#total tbody').unbind('click');

      //  banderaGenerado=false;
    //}

    var form1 = $("#venta").find("select,input").serializeArray();
    var datosTabla1 = {};
    form1.forEach(function(input) {
        datosTabla1[input.name] = input.value;
    });
    datosTabla1['input2']=$('#input2').val();
    console.log(datosTabla1);
    var datos= (datosTabla1);
    var columnas = [{ data : "clave" },
        { data : "descripcion" },
        { data : "cantidad" },
        { data : "fecha" },
        { data : "unidad" },
        { data : "total" }];
    var success=function(resultado){
        //banderaGenerado=true;
        //llamarclic();

    };
    peticionAjaxDT('articulo/seleccionarIndividualMovimiento2',('#total'),datosTabla1,columnas,null,success);
    $('#total').show();
    return false;

});


var banderaGenerado=false;

function limpiarTablas(){
    $('#total').hide();
    $('#divDetalle').hide();
    $('#detalle').hide();
}
function modalPopUp(){
    configuracionGeneral("Configuración de búsqueda individual", CONFIGURACION_INDIVIDUAL);
}
function configuracionGeneral(titulo, idTransaccion) {
    var $contenido = $("<form></form>", { name: 'formSucursal'});
    var $form_group = $("<div></div>", { class: 'form-inline'});
    var label = $("<label></label>", { for: 'input', text: 'Clave del Artículo:\u00a0'});
    var nombre = $("<input>", { id: 'input', name: 'input', value: '', type: 'text', class: 'form-control', required: 'required'});
    $form_group.append(label);

    $form_group.append(nombre);
    var espacio = $("<label> &nbsp;&nbsp;&nbsp; </label>");
    $form_group.append(espacio);
    var generarModalPopUp = $("<button></button>", {id: "can", name: "can", type: 'button', class: 'btn btn-success', text: 'Generar', onclick: 'this.blur();'});
    $form_group.append(generarModalPopUp);
    var espacio = $("<label> &nbsp;&nbsp;&nbsp; </label>");
    $form_group.append(espacio);
    var gear = $("<a id='g2' style='display: none'><i class='fa fa-cog fa-spin fa-3x fa-fw' ></i></a>", {id: "gear", name: "gear"});
    $form_group.append(gear);
    $('#g2').hide();
    var espacio3 = $("<br><br>");
    $form_group.append(espacio3);
    tabla = $("<table></table>", { id: 'tabla1', name: 'tabla1', class: 'table table-condensed', style: ''});
    $form_group.append(tabla);
    var $thead = $("<thead></thead>", {
        name: 'thead'
    });
    tabla.append($thead);
    var th1 = $("<th>Clave</th>");
    tabla.append(th1);
    th1 = $("<th>Descripci&oacute;n</th>");
    tabla.append(th1);
    th1 = $("<th>Existencia</th>");
    tabla.append(th1);/*
    th1 = $("<th>Edici&oacute;n</th>");
    tabla.append(th1);
    */
    $contenido.append($form_group);
    $(nombre).focus();
    $(generarModalPopUp).click(function() {
        $('#g2').show();
        inicializarTablaModalPopuUp();
        $(generarModalPopUp).focusout();
        $('#g2').focus();
        return false;
    });
    //InicializarDateTimePicker();
    BootstrapDialog.show({
        title: titulo,
        message: function(dialog) {
            return $contenido;
        },
        style: 'width:85%;',
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
            submit: function(dialog) {
                return false;
            },
            action: function(dialog) {

                dialog.close();
                //tabla2 = tabla;
                //tabla.clone().find('tr').appendTo($("#total").find("tbody"));
                //$('#total').show();
                document.getElementById('descripcionArticulo').value=desc;
                document.getElementById('input2').value=cl;
            }
        }]
    });
}
function inicializarTablaModalPopuUp() {

        var datosTabla4 = {};
        datosTabla4['idSucursal'] = document.getElementById('idSucursal').value;
        datosTabla4 = {};
        datosTabla4['input'] = $('#input').val();
        input = $('#input').val();

        cargarTablaModalPopup(datosTabla4);
}
function cargarTablaModalPopup(arregloConInputs, idTransaccion) {
    var idSucursal = $('#idSucursal').val();
    //var idConcepto = $('#concepto').val();
    var tbody = $("#tabla1").find("tbody").empty();
    var datosTabla1 = {};
    arregloConInputs['idTransaccion'] = idTransaccion;
    var form1 = $("#resultados").find('input[data1]').serializeArray();
    form1.forEach(function (input) {
        datosTabla1[input.name] = input.value;
    });
    arregloConInputs['articulos'] = datosTabla1;
    arregloConInputs['idSucursal'] = idSucursal;
    arregloConInputs['input']=input;
    exitoso = function (result) {
        if (result.estado != undefined) {
            if (result.estado == 'warning') {
                notificacionWarning(result.success);
                $('#g2').hide();
                return;
            }
        }
        var find = false;
        if (result.data.length > 0) {
            console.log(result.data);
            result.data.forEach(function (element, index) {
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
                td = $("<td></td>")
                td.append(idArt);
                row.append(td);

                desc= element['descripcion'];
                cl= element['clave'];

                /*var exisArt = $("<input>", {id: "existencia" + contador, name: "existencia" + contador, type: 'text', class: 'form-control', value: element['existencia'], style: 'width:65%;', readonly: 'readonly'});
                td = $("<td></td>");
                td.append(exisArt);
                row.append(td);*/
                var agregar = $("<button></button>",{class:'btn btn-success'}).append('Agregar');
                var icono_agregar = $("<i></i>",{class:'fa fa-check-square-o'});
                td = $("<td></td>");
                agregar.append(icono_agregar);
                td.append(agregar);
                row.append(td);
                $(agregar).click(function() {

                    BootstrapDialog.confirm({
                        title: 'Advertencia',
                        message: 'Se agregará '+element['descripcion']+' \n \n ¿Desea Continuar?',
                        size: BootstrapDialog.SIZE_LARGE,
                        type: BootstrapDialog.TYPE_WARNING, // <-- Default value is BootstrapDialog.TYPE_PRIMARY
                        closable: false, // <-- Default value is false
                        draggable: true, // <-- Default value is false
                        btnCancelLabel: 'Regresar', // <-- Default value is 'Cancel',
                        btnOKLabel: 'Continuar', // <-- Default value is 'OK',
                        btnOKClass: 'btn-danger', // <-- If you didn't specify it, dialog type will be used,
                        callback: function(result) {
                            // result will be true if button was click, while it will be false if users close the dialog directly.
                            if(result) {
                                notificacionSuccess('Se ha agregado correctamente');
                                desc= element['descripcion'];
                                cl= element['clave'];

                                document.getElementById('descripcionArticulo').value=desc;
                                document.getElementById('input2').value=cl;
                                BootstrapDialog.closeAll();
                            }else {

                            }
                        }
                    });
                    return false;
                });
                /*function agregar(row) {
                    alert(element['clave']);
                }/*
                removerModal.append(icono);
                td = $("<td></td>");
                td.append(removerModal);
                row.append(td);*/

                $("#tabla1").append(row);
                $('#g2').hide();
            });
            if (find) {
                tabla.show();
            }
        } else {
            notificacionWarning('No se encontró información');
        }
    };
    fallo = function (datos) {
    };
    peticionAjax(API_SYS_PATH + 'articulo/seleccionarIndividualMovimiento', arregloConInputs, exitoso, fallo);
    return false;
}