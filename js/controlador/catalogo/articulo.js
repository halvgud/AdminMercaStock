$(function() {
    var datosTabla1 = {};
    //datosTabla1['descripcion'] = descripcion;
    //datosTabla1['nombre']=nombre2;
    //datosTabla1['nombre']=Nombre;
    console.warn(datosTabla1);
    cargarTabla(datosTabla1, 10);

    function cargarTabla(arregloConInputs, idTransaccion) {
        arregloConInputs['idTransaccion'] = idTransaccion;
        $("#resultadosArticulo").hide();
        var tbody = $("#resultadosArticulo tbody").empty();
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

                var idArticulo = element['art_id'];
                var descripcion = element['descripcion'];
                //  var password = element['password'];
                // var descripcionRol = element['domicilio'];

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
                    eliminarArticulo(element,tr);
                })

                agregarTDaTR(tr, idArticulo);
                // agregarTDaTR(tr,password);
                agregarTDaTR(tr, descripcion);
                agregarTDaTR(tr, editar);
                agregarTDaTR(tr, eliminar);
                $(tbody).append(tr);
            });
            console.log(find);
            if (find)
                $('#resultadosArticulo').show();
        };
        fallo = function (datos) {
            console.log(datos);
        };
        peticionAjax(API_SYS_PATH + 'categoria/articulo/seleccionar', arregloConInputs, exitoso, fallo);
    }

    function agregarTDaTR(tr, element) {
        var td = $("<td align='center'></td>");
        $(td).append(element);
        $(tr).append(td);
    }
    function eliminarArticulo(element,tr){
        BootstrapDialog.show({
            title: 'Peligro',
            message:'Realmente desea eliminar a '+element.descripcion,
            type: BootstrapDialog.TYPE_DANGER,
            buttons: [{
                id: 'btn-1',
                label: 'Cancelar',
                cssClass: 'btn-primary',
                action: function(dialog) {
                    dialog.close();
                }
            },{
                id: 'btn-2',
                label: 'Aceptar',
                cssClass: 'btn-danger',
                action: function(dialog) {
                    var datos = {};
                    datos.id_usuario = element.id_usuario;
                    datos.idTransaccion = 4;
                    exitoso = function(datos){
                        notificacionSuccess(datos.success);
                        $(tr).remove();
                        buscar();
                        dialog.close();
                    };
                    fallo = function(datos){
                        notificacionError(datos.error);
                    };
                    peticionAjax('data/test-actualizar.php',datos,exitoso,fallo);
                }
            }]
        });
    }
    function editarUsuario(element,tr){
        var $contenido = $("<div></div>");
        var $form_group = $("<div></div>",{class:'form-group'});
        var label = $("<label></label>",{for:'usuario',text:'Usuario'});
        var usuario = $("<input>",{name:'usuario',value:element['usuario'],type:'text',class:'form-control'});
        $form_group.append(label);
        $form_group.append(usuario);
        $contenido.append($form_group);
        var $form_group = $("<div></div>",{class:'form-group'});
        var label = $("<label></label>",{for:'password',text:'Password'});
        var password = $("<input>",{name:'password',value:'',type:'password',class:'form-control'});
        $form_group.append(label);
        $form_group.append(password);
        $contenido.append($form_group);
        var $form_group = $("<div></div>",{class:'form-group'});
        var label = $("<label></label>",{for:'nivelAutorizacion',text:'nivel de Autorización'});
        var option = $("<option></option>",{name:'empty',text:'Seleccione un nivel de autorización',value:''});
        var rol = $("<select></select>",{name:'nivelAutorizacion',id:'nivelAutorizacion',class:'form-control'});
        $(rol).append(option);
        $(rol).val('');
        $form_group.append(label);
        $form_group.append(rol);
        $contenido.append($form_group);
        cargarDropDownList((rol),'idNivelAutorizacion','descripcion',API_SYS_PATH+'usuario/nivel_autorizacion/seleccionar',$("#idUsuario").val());

        BootstrapDialog.show({
            title: 'Esta a punto de modificar los siguientes datos',
            message:function(dialog) {
                return $contenido;
            },
            type: BootstrapDialog.TYPE_WARNING,
            onshown:function(){
                console.log($(rol).val());
                $(rol).val(element['rol']);
                //$(rol).val(2);
                //$(rol).find('option[value='+element['rol']+']').attr('selected','selected');
                console.log(element['rol'],rol);
                console.log($(rol).val());
            },
            buttons: [{
                id: 'btn-1',
                label: 'Cancelar',
                cssClass: 'btn-primary',
                action: function(dialog) {
                    dialog.close();
                }
            },{
                id: 'btn-2',
                label: 'Aceptar',
                cssClass: 'btn-danger',
                action: function(dialog) {
                    var datos = {};
                    datos.id_usuario = element.id_usuario;
                    datos.usuario = $(usuario).val();
                    datos.password = $(password).val();
                    datos.rol = $(rol).val();
                    datos.idTransaccion = 5;
                    exitoso = function(datos){
                        notificacionSuccess(datos.success);
                        $(tr).remove();
                        buscar();
                        dialog.close();
                    };
                    fallo = function(datos){
                        notificacionError(datos.error);
                    };
                    peticionAjax('data/test-actualizar.php',datos,exitoso,fallo);
                }
            }]
        });
    }
});