$(function() {
    var
        $online = $('.online'),
        $offline = $('.offline');
    Offline.on('confirmed-up', function() {
        $offline.fadeOut(function() {
            $online.fadeIn();
        });
    });
    cargarDropDownList(("#idSucursal"), 'idSucursal', 'nombre', API_SYS_PATH + 'sucursal/seleccionar', 12, false, 'Buscando Sucursales...', 'Seleccione una Sucursal');
});

$("#articulo").submit(function() {
    var form1 = $("#articulo").find("select,input").serializeArray();
    var datosTabla1 = {};
    form1.forEach(function(input) {
        datosTabla1[input.name] = input.value;
    });
    var datos = (datosTabla1);
    var columnas = [{
        data: "clave"
    }, {
        data: "descripcion"
    }, {
        data: "margen1"
    }, {
        data: "precio1"
    }, {
        data: "existencia"
    }];
    console.log(datosTabla1);
    peticionAjaxDT('articulo/seleccionar', ('#resultadosArticulo'), datosTabla1, columnas, 'Buscando artículos...');
    return false;
});

function buscarDeparamento() {
    $("#dep_id").empty();
    $("#cat_id").empty();
    if($('#idSucursal').val()!='') {
        cargarDropDownList(("#dep_id"), 'dep_id', 'nombre', API_SYS_PATH + 'departamento/seleccionar', $("#idSucursal").val(), true, 'Buscando Departamentos...', 'Seleccione un Departamento');
    }else{
        $("#resultadosArticulo").empty();
    }
}

function buscarCategoria() {
    $("#cat_id").empty();
    var columnas = {
        idSucursal: $("#idSucursal").val(),
        dep_id: $("#dep_id").val()
    };
    if($('#idSucursal').val()!='') {
        cargarDropDownList(("#cat_id"), 'cat_id', 'nombre', API_SYS_PATH + 'categoria/seleccionar', columnas, false, 'Buscando Categorias...', 'Seleccione una Categoria');
    }else{
        $("#resultadosArticulo").empty();
    }
}