var CONFIGURACION_LISTA_FIJA = 0;
var CONFIGURACION_AZAR = 1;
var CONFIGURACION_MAS_VENDIDOS = 2;
var CONFIGURACION_MAS_CONFLICTIVOS = 3;
var CONFIGURACION_INDIVIDUAL = 4;
var tabla;
var tabla2;
var contador = 0;
var removerModal;

$(function() {
    cargarDropDownList(("#idSucursal"), 'idSucursal', 'nombre', API_SYS_PATH + 'sucursal/seleccionar', 12, false, 'cargando', 'Seleccione una Sucursal');
    $('#idSucursal').change(function() {
        $("#resultados").find("tbody").empty();
        cargarDropDownList(("#concepto"), 'idConcepto', 'descripcion', API_SYS_PATH + 'concepto/seleccionar', 12, false, 'cargando', 'Seleccione un Concepto');
        if (document.getElementById('idSucursal').selectedIndex != 0) {
            configuracionListaFija();
        }
        $("#concepto").empty();
        $("#dep_id").empty();
        $("#cat_id").empty();
        if (document.getElementById('idSucursal').selectedIndex != 0) {
            cargarDropDownList(("#dep_id"), 'dep_id', 'nombre', API_SYS_PATH + 'departamento/seleccionar', $("#idSucursal").val(), true, 'Cargando...', 'Seleccione un Departamento');
        }
    });
    $('#dep_id').change(function() {
        $("#cat_id").empty();
        var columnas = {
            idSucursal: $("#idSucursal").val(),
            dep_id: $("#dep_id").val()
        };
        if (document.getElementById('dep_id').selectedIndex != 0) {
            cargarDropDownList(("#cat_id"), 'cat_id', 'nombre', API_SYS_PATH + 'categoria/seleccionar', columnas, true, 'Cargando...', 'Seleccione una Categoria');
        }
    });
});

function InicializarDateTimePicker() {
    $.datetimepicker.setLocale('es');
    $('#hora_inicio').datetimepicker({

        theme: 'dark',
        format: 'Y-m-d',
        onShow: function(ct) {
            this.setOptions({
                maxDate: $('#hora_fin').val() ? $('#hora_fin').val() : false
            })
        },
        timepicker: false
    });
    $('#hora_fin').datetimepicker({
        theme: 'dark',
        format: 'Y-m-d ',
        onShow: function(ct) {
            this.setOptions({
                minDate: $('#hora_inicio').val() ? $('#hora_inicio').val() : false
            })
        },
        timepicker: false
    });
}

function configuracionGeneral(titulo, idTransaccion) {
    var $contenido = $("<form></form>", {
        name: 'formSucursal'
    });
    var $form_group = $("<div></div>", {
        class: 'form-inline'
    });
    if (idTransaccion != CONFIGURACION_INDIVIDUAL) {
        var espacio2 = $("<label> &nbsp;&nbsp; </label>");
        $form_group.append(espacio2);
        var label = $("<label></label>", {
            for: 'cantidad',
            text: 'Cantidad:\u00a0'
        });
        var nombre = $("<input>", {
            id: 'cantidad',
            name: 'cantidad',
            value: '10',
            type: 'text',
            class: 'form-control',
            required: 'required',
            style: 'width:15%;'
        });
        $form_group.append(label);
        $form_group.append(nombre);
    }
    if (idTransaccion == CONFIGURACION_INDIVIDUAL) {
        $form_group.append(espacio2);
        label = $("<label></label>", {
            for: 'input',
            text: 'Clave o Descripción del Artículo:\u00a0'
        });
        nombre = $("<input>", {
            id: 'input',
            name: 'input',
            value: '',
            type: 'text',
            class: 'form-control',
            required: 'required'
        });
        $form_group.append(label);
        $form_group.append(nombre);
    }
    if (idTransaccion == CONFIGURACION_MAS_CONFLICTIVOS || idTransaccion == CONFIGURACION_MAS_VENDIDOS) {
        label = $("<label></label>", {
            for: 'hora_inicio',
            text: '\u00a0Inicio:\u00a0'
        });
        $form_group.append(label);

        var inputInicio = $("<input>", {
            type: 'text',
            id: 'hora_inicio',
            name: 'hora_inicio',
            class: 'form-control',
            onclick: 'InicializarDateTimePicker();',
            autocomplete: 'off',
            style: 'width:85%;',
            readonly: 'readonly'
        });
        $form_group.append(inputInicio);

        label = $("<label></label>", {
            for: 'hora_fin',
            text: '\u00a0Fin:\u00a0'
        });
        $form_group.append(label);
        inputInicio = $("<input>", {
            type: 'text',
            id: 'hora_fin',
            name: 'hora_fin',
            class: 'form-control',
            onclick: 'InicializarDateTimePicker();',
            autocomplete: 'off',
            style: 'width:85%;',
            readonly: 'readonly'
        });
        $form_group.append(inputInicio);
        var espacio = $("<label> &nbsp;&nbsp;&nbsp; </label>");
        $form_group.append(espacio);
    }
    var generarModalPopUp = $("<button></button>", {
        id: "can",
        name: "can",
        type: 'button',
        class: 'btn btn-outline btn-success',
        text: 'Generar'
    });
    $form_group.append(generarModalPopUp);
    var espacio3 = $("<br><br>");
    $form_group.append(espacio3);
    tabla = $("<table></table>", {
        id: 'tabla1',
        name: 'tabla1',
        class: 'table table-condensed',
        style: ''
    });
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
    tabla.append(th1);
    th1 = $("<th>Edici&oacute;n</th>");
    tabla.append(th1);
    $contenido.append($form_group);
    $(generarModalPopUp).click(function() {
        inicializarTablaModalPopuUp();
        return false;
    });
    InicializarDateTimePicker();
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
                tabla2 = tabla;
                tabla.clone().find('tr').appendTo($("#resultados").find("tbody"));
            }
        }]
    });
}

function configuracionListaFija() {
    var $contenido = $("<form></form>", {
        id: 'formSucursal',
        name: 'formSucursal'
    });
    var $form_group = $("<div></div>", {
        class: 'form-inline'
    });
    tabla = $("<table></table>", {
        id: 'tabla1',
        name: 'tabla1',
        class: 'table table-condensed',
        style: ''
    });
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
    tabla.append(th1);
    th1 = $("<th>Edici&oacute;n</th>");
    tabla.append(th1);

    $contenido.append($form_group);

    var datosTabla4 = {};
    datosTabla4['idSucursal'] = $('#idSucursal').val();
    cargarTablaModalPopup(datosTabla4, CONFIGURACION_LISTA_FIJA);

    tabla2 = tabla;
    console.log(tabla.clone());
    tabla.clone().find('tr').appendTo($("#resultados").find("tbody"));
    return false;
}

function inicializarTablaModalPopuUp() {
    var idConcepto = $('#concepto').val();
    var datosTabla4 = {};
    datosTabla4['idSucursal'] = document.getElementById('idSucursal').value;
    datosTabla4['cat_id'] = document.getElementById('cat_id').value;
    datosTabla4['cantidad'] = $('#cantidad').val() != null ? $('#cantidad').val() : 0;
    datosTabla4['dep_id'] = document.getElementById('dep_id').value;;
    if (idConcepto == CONFIGURACION_MAS_VENDIDOS || idConcepto == CONFIGURACION_MAS_CONFLICTIVOS) {
        datosTabla4['fechaInicio'] = document.getElementById('hora_inicio').value;
        datosTabla4['fechaFin'] = document.getElementById('hora_fin').value;
    } else if (idConcepto == CONFIGURACION_INDIVIDUAL) {
        datosTabla4 = {};
        datosTabla4['input'] = $('#input').val();
    }
    cargarTablaModalPopup(datosTabla4, idConcepto);
}

function cargarTablaModalPopup(arregloConInputs, idTransaccion) {
    var idSucursal = $('#idSucursal').val();
    var idConcepto = $('#concepto').val();
    var tbody = $("#tabla1").find("tbody").empty();
    var datosTabla1 = {};
    arregloConInputs['idTransaccion'] = idTransaccion;

    var form1 = $("#resultados").find('input[data1]').serializeArray();
    form1.forEach(function(input) {
        datosTabla1[input.name] = input.value;
    });
    arregloConInputs['articulos'] = datosTabla1;
    arregloConInputs['idSucursal'] = idSucursal;
    exitoso = function(result) {
        if (result.estado != undefined) {
            if (result.estado == 'warning') {
                notificacionWarning(result.success);
                return;
            }
        }
        var find = false;
        if (result.data.length > 0) {
            console.log(result.data);
            result.data.forEach(function(element, index) {
                find = true;
                contador++;
                var row = $("<tr></tr>", {
                    id: contador,
                    name: 'row' + contador
                });
                var td = $("<td></td>");
                var claveArt = $("<input>", {
                    name: "clave" + contador,
                    id: "clave" + contador,
                    class: 'form-control',
                    value: element['clave'],
                    style: 'width:85%;',
                    readonly: 'readonly'
                });
                td.append(claveArt);
                row.append(td);
                var descArt = $("<input>", {
                    name: "descripcion",
                    id: "descripcion" + contador,
                    class: 'form-control',
                    value: element['descripcion'],
                    readonly: 'readonly'
                });
                td = $("<td></td>");
                td.append(descArt);
                row.append(td);
                var idArt = $("<input>", {
                    type: 'hidden',
                    id: "art_id" + contador,
                    name: "art_id" + contador,
                    class: 'art form-control',
                    value: element['art_id'],
                    data1: 'true'
                });
                td.append(idArt);
                row.append(td);
                var exisArt = $("<input>", {
                    id: "existencia" + contador,
                    name: "existencia" + contador,
                    type: 'text',
                    class: 'form-control',
                    value: element['existencia'],
                    style: 'width:65%;',
                    readonly: 'readonly'
                });
                td = $("<td></td>");
                td.append(exisArt);
                row.append(td);
                var icono = $("<i></i>", {
                    class: 'fa fa-minus-square'
                });
                removerModal = $("<button></button>", {
                    id: "cantidad" + contador,
                    name: "cantidad" + contador,
                    type: 'button',
                    class: 'btn btn-outline btn-danger',
                    readonly: 'readonly',
                    onclick: 'remover(' + contador + ');'
                });
                $(removerModal).click(function() {
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
            });
            if (find) {
                tabla.show();
            }
        } else {
            notificacionWarning('No se encontro informacion');
        }
    };
    fallo = function(datos) {

    };
    if (idConcepto == CONFIGURACION_AZAR) {
        peticionAjax(API_SYS_PATH + 'inventario/seleccionarAzar', arregloConInputs, exitoso, fallo);
    } else if (idConcepto == CONFIGURACION_MAS_VENDIDOS) {
        peticionAjax(API_SYS_PATH + 'inventario/seleccionarMasVendidos', arregloConInputs, exitoso, fallo);
    } else if (idConcepto == CONFIGURACION_MAS_CONFLICTIVOS) {
        peticionAjax(API_SYS_PATH + 'inventario/seleccionarMasConflictivos', arregloConInputs, exitoso, fallo);
    } else if (idConcepto == CONFIGURACION_INDIVIDUAL) {
        peticionAjax(API_SYS_PATH + 'inventario/seleccionarIndividual', arregloConInputs, exitoso, fallo);
    } else {
        peticionAjax(API_SYS_PATH + 'parametros/seleccionar/lista/fija/inventario', arregloConInputs, exitoso, fallo);
    }
    return false;
}

$("#send").submit(function() {
    var form1 = $("#resultados").find("input[data1]").serializeArray();
    var datosTabla1 = {};
    var subArreglo = [];
    form1.forEach(function(input) {
        if ((input.name).indexOf("art_id") != -1) {
            subArreglo.push(input.value);
        }
    });
    datosTabla1['art_id'] = subArreglo;
    datosTabla1['idSucursal'] = $('#idSucursal').val();
    datosTabla1['idUsuario'] = document.getElementById('idUsuario').value;
    exitoso = function(datos) {
        notificacionSuccess(datos.success);
        return false;
    };
    fallo = function(datos) {
        return false;
    };
    var tbody = $("#resultados").find("tbody").empty();
    peticionAjax(API_SYS_PATH + 'inventario/insertar', datosTabla1, exitoso, fallo, "Enviando datos...");
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
    } else {
        notificacionWarning("Faltan parametros para la busqueda");
    }
    return false;
});