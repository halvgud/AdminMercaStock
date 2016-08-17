$(function() {
    Funcion.cargarDropDownList(("#idSucursal"), 'idSucursal', 'nombre', API_SYS_PATH + 'sucursal/seleccionar', 12, false, 'cargando', 'Seleccione una Sucursal');
    var idSuc=$('#idSucursal');
    idSuc.change(function() {
        $("#resultados").find("tbody").empty();
    });
});

$('#descripcion').click(function(){
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
    espacio = $("<label> &nbsp;&nbsp;&nbsp; </label>");
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
        var g2=$('#g2');
        g2.show();
        inicializarTablaModalPopuUp();
        $(generarModalPopUp).focusout();
        g2.focus();
        return false;
    });
    //InicializarDateTimePicker();
    BootstrapDialog.show({
        title: 'Articulos',
        message: function() {
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
            submit: function() {return false;},
            action: function(dialog) {
                dialog.close();
                $('#descripcionArticulo').val(descripcion);
                $('#input2').val(clave);
            }
        }]
    });
});