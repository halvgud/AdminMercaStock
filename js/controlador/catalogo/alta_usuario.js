        var contador = 0;
        $("#guardarUsuario").submit(function(){
            var form1 = $("#guardarUsuario").find("select,input").serializeArray();
            var datosTabla1 = {};
            form1.forEach(function(input) {
                datosTabla1[input.name] = input.value;
            });
           // datosTabla1['fecha_alta'] = moment().format("YYYY/MM/DD HH:mm:ss");
            exitoso = function(datos){

                notificacionSuccess(datos.success);
                $("#guardarUsuario")[0].reset();
                contador = 0;
            };
            fallo = function(datos){
              //  console.log(datos);
               // notificacionError(datos.error);
            };
            peticionAjax(API_SYS_PATH+'usuario/insertar',datosTabla1,exitoso,fallo);

            return false;
        });

        $(function() {
            cargarDropDownList(("#sexo"),'idSexo','descripcion',API_SYS_PATH+'usuario/sexo/seleccionar',12);
            cargarDropDownList(("#idNivelAutorizacion"),'idNivelAutorizacion','descripcion',API_SYS_PATH+'usuario/nivel_autorizacion/seleccionar',$("#idUsuario").val());
            $("#descripcion").enterKey(function(){
                e.preventDefault();
                buscar();
            });
            $("#clave").enterKey(function(e){
                e.preventDefault();
                buscar();
            });
            $("#buscarUsuario").submit(function(e){
                e.preventDefault();
                buscar();
            });
           // function buscar(){
            var datosTabla1 = {};
                    datosTabla1['usuario'] = usuario;
                    console.warn(datosTabla1);
                    cargarTabla(datosTabla1,10);
            //}
            //funcion engargada de cargar informacion en los lugares donde se mete informacion del empleado
            function cargarTabla(arregloConInputs,idTransaccion) {
                arregloConInputs['idTransaccion']=idTransaccion;
                $("#resultados").hide();
                var tbody = $("#resultados tbody").empty();
                exitoso = function(result){
                    console.log(result);
                    if(result.estado!=undefined){
                        if(result.estado =='warning'){
                            notificacionWarning(result.success);
                            return;
                        }
                    }
                    var find = false;
                    result.forEach( function(element, index) {
                        find = true;
                        var tr = $("<tr></tr>");

                        var id_usuario = element['idUsuario'];
                        var usuario = element['usuario'];
                      //  var password = element['password'];
                        var descripcionRol = element['descripcion'];

                        var editar = $("<button></button>",{class:'btn btn-primary'});
                        var icono_editar = $("<i></i>",{class:'fa fa-pencil-square-o'});
                        editar.append(icono_editar);
                        editar.append(" Editar");
                        $(editar).click(function(){
                            editarUsuario(element,tr);
                        })
                        var eliminar = $("<button></button>",{class:'btn btn-danger'});
                        var icono_eliminar = $("<i></i>",{class:'fa fa-trash-o'});
                        eliminar.append(icono_eliminar);
                        eliminar.append(" Eliminar");
                        $(eliminar).click(function(){
                            eliminarUsuario(element,tr);
                        })

                        agregarTDaTR(tr,usuario);
                       // agregarTDaTR(tr,password);
                        agregarTDaTR(tr,descripcionRol);
                        agregarTDaTR(tr,editar);
                        agregarTDaTR(tr,eliminar);
                        $(tbody).append(tr);
                    });
                    console.log(find);
                    if(find)
                        $('#resultados').show();
                };
                fallo = function(datos){
                    console.log(datos);
                };
                peticionAjax(API_SYS_PATH+'usuario/seleccionar',arregloConInputs,exitoso,fallo);
            }
            function agregarTDaTR (tr,element){
                var td = $("<td></td>");
                $(td).append(element);
                $(tr).append(td);
            }
            function eliminarUsuario(element,tr){
                BootstrapDialog.show({
                    title: 'Peligro',
                    message:'Realmente desea eliminar a '+element.usuario,
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
                    title: 'Esta a punto de modificat los siguientes datos',
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

