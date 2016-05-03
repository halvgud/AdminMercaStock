var contador = 0;
$("#enviarSucursal").submit(function(){
    var e = document.getElementById("sucursal");
    var sucursal = e.value;
    var e2 = document.getElementById("art");
    var articulo = e2.value;
    //document.write(sucursal);
    /* var form1 = $("#enviarSucursal").find("select,input").serializeArray();
     var datosTabla1 = {};
     form1.forEach(function(input) {
     datosTabla1[input.name] = input.value;
     });
     // datosTabla1['fecha_alta'] = moment().format("YYYY/MM/DD HH:mm:ss");
     exitoso = function(datos){
     console.log(datos);
     notificacionSuccess(datos.success);
     $("#enviarSucursal")[0].reset();
     contador = 0;
     };
     fallo = function(datos){
     console.log(datos);
     notificacionError(datos.error);
     };
     peticionAjax(API_SYS_PATH+'sucursal/seleccionar',datosTabla1,exitoso,fallo);


     //return false;
     */
    var datosTabla1 = {};
    //datosTabla1['nombre'] = usuario;
    //datosTabla1['nombre']=nombre;
    console.warn(datosTabla1);
    cargarTabla(datosTabla1, 10);

    function cargarTabla(arregloConInputs, idTransaccion) {
        arregloConInputs['idTransaccion'] = idTransaccion;
        $("#test").hide();
        var tbody = $("#test tbody").empty();
        exitoso = function (result) {
            console.log(result);
            if (result.estado != undefined) {
                if (result.estado == 'warning') {
                    notificacionWarning(result.success);
                    return;
                }
            }
            var find = false;
            result.forEach(function (element, index) {
                find = true;
                var tr = $("<tr></tr>");

                var artId = element['art_id'];
                var idInventario = element['id_inventario'];
                //  var password = element['password'];
                // var descripcionRol = element['domicilio'];
                var idSucursal = element['idSucursal'];

                var editar = $("<button></button>", {class: 'btn btn-primary'});
                var icono_editar = $("<i></i>", {class: 'fa fa-pencil-square-o'});
                editar.append(icono_editar);
                editar.append(" Editar");
                $(editar).click(function () {
                    //editarUsuario(element,tr);
                })
                var eliminar = $("<button></button>", {class: 'btn btn-danger'});
                var icono_eliminar = $("<i></i>", {class: 'fa fa-trash-o'});
                eliminar.append(icono_eliminar);
                eliminar.append(" Eliminar");
                $(eliminar).click(function () {
                    //eliminarSucursal(element, tr);
                })

                if (sucursal == idSucursal && articulo==artId && (articulo!='' & sucursal!='')) {
                    agregarTDaTR(tr, artId);
                    // agregarTDaTR(tr,password);
                    agregarTDaTR(tr, idInventario);
                    agregarTDaTR(tr, editar);
                    agregarTDaTR(tr, eliminar);
                    $(tbody).append(tr);
                }
                else {
                    $(tbody).append(tr);
                }

            });
            console.log(find);
            if (find)
                $('#test').show();
        };
        fallo = function (datos) {
            console.log(datos);
        };
         peticionAjax(API_SYS_PATH + 'categoria/inventario/seleccionar', arregloConInputs, exitoso, fallo);

    }

    function agregarTDaTR(tr, element) {
        var td = $("<td align='center'></td>");
        $(td).append(element);
        $(tr).append(td);
    }
    return false;
});