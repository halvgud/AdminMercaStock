$(function() {
    var
        $online = $('.online'),
        $offline = $('.offline');
    Offline.on('confirmed-up', function() {
        $offline.fadeOut(function() {
            $online.fadeIn();
        });
    });
    Funcion.cargarDropDownList(("#idSucursal"), 'idSucursal', 'nombre', API_SYS_PATH + 'sucursal/seleccionar', 12, false, 'Buscando Sucursales...', 'Seleccione una Sucursal');
});

$("#articulo").submit(function() {
    var form1 = $("#articulo").find("select,input").serializeArray();
    var datosTabla1 = {};
    form1.forEach(function(input) {
        datosTabla1[input.name] = input.value;
    });
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
    Funcion.peticionAjaxDT('articulo/seleccionar', ('#resultadosArticulo'), datosTabla1, columnas, 'Buscando artículos...');
    return false;
});

$('#idSucursal').on('change', function(){
    $("#dep_id").empty();
    $("#cat_id").empty();
    if(this.value!='') {
        Funcion.cargarDropDownList(("#dep_id"), 'dep_id', 'nombre', API_SYS_PATH + 'departamento/seleccionar', $("#idSucursal").val(), true, 'Buscando Departamentos...', 'Seleccione un Departamento');
    }else{
        $("#resultadosArticulo").empty();
    }

});

$('#dep_id').on('change', function(){
    $("#cat_id").empty();
    var idSucursal = $("#idSucursal").val();
    var columnas = {
        idSucursal:idSucursal,
        dep_id: $("#dep_id").val()
    };
    if(idSucursal!='') {
        Funcion.cargarDropDownList(("#cat_id"), 'cat_id', 'nombre', API_SYS_PATH + 'categoria/seleccionar', columnas, false, 'Buscando Categorias...', 'Seleccione una Categoria');
    }else{
        $("#resultadosArticulo").empty();
    }

});
