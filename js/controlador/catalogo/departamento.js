$(function() {
    cargarDropDownList(("#sucursal"), 'idSucursal', 'nombre', API_SYS_PATH + 'sucursal/seleccionar', 12,true);
});

$("#departamento").submit(function(){
    var datosTabla1 = {};
    console.warn(datosTabla1);
    cargarTabla(datosTabla1, 10);

    function cargarTabla(arregloConInputs, idTransaccion) {
        arregloConInputs['idTransaccion'] = idTransaccion;

        var resultadoSucursal = $("#departamento");
        var form1 = resultadoSucursal.find("select").serializeArray();
        var datosTabla1 = {};
        form1.forEach(function(input) {
            datosTabla1[input.name] = input.value;
        });

        var tbody = $("#resultadosSucursal tbody").empty();
        exitoso = function (result) {

            if (result.estado != undefined) {
                if (result.estado == 'warning') {
                    notificacionWarning(result.success);
                    return;
                }
            }
            var find = false;
            result.data.forEach(function (element, index) {
                find = true;
                var tr = $("<tr></tr>");

                var idDepartamento = element['dep_id'];
                var idLocal = element['dep_idLocal'];
                var idSucursal = element['idSucursal'];
                var nombre = element['nombre'];
                var restringido = element['restringido'];
                var porcentaje = element['porcentaje'];

                agregarTDaTR(tr, idDepartamento);
                agregarTDaTR(tr, idLocal);
                agregarTDaTR(tr, idSucursal);
                agregarTDaTR(tr, nombre);
                agregarTDaTR(tr, restringido);
                agregarTDaTR(tr, porcentaje);
                $(tbody).append(tr);
            });
            console.log(find);
            if (find)
                $('#resultadosSucursal').show();
        };
        fallo = function (datos) {
            console.log(datos);
        };
        peticionAjax(API_SYS_PATH + 'categoria/departamento/seleccionar', datosTabla1, exitoso, fallo);
    }

    function agregarTDaTR(tr, element) {
        var td = $("<td align='center'></td>");
        $(td).append(element);
        $(tr).append(td);
    }
    return false;
});