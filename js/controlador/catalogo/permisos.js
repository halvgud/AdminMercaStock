$(function() {
    cargarTabla();
    function cargarTabla() {
        var arregloConInputs = {};
        arregloConInputs['idTransaccion']='permisos/obtener';
        var $resultados =  $("#resultados");
        $resultados.hide();
        var tbody = $resultados.find("tbody").empty();
        exitoso = function(result){
            console.log(result);
            var find = false;
            result.forEach( function(element, index) {
                find = true;
                var tr = $("<tr></tr>");
                var descripcion = element['descripcion'];
                var editar = $("<button></button>",{class:'btn btn-primary'});
                var icono_editar = $("<i></i>",{class:'fa fa-pencil-square-o'});
                editar.append(icono_editar);
                editar.append(" Editar Permisos");
                $(editar).click(function(){
                    editarPermisos(element,tr);
                })
                var eliminar = $("<button></button>",{class:'btn btn-danger'});
                var icono_eliminar = $("<i></i>",{class:'fa fa-trash-o'});
                eliminar.append(icono_eliminar);
                eliminar.append(" Eliminar");
                $(eliminar).click(function(){
                    eliminarUsuario(element,tr);
                })

                agregarTDaTR(tr,descripcion);
                agregarTDaTR(tr,editar,'text-center');
                agregarTDaTR(tr,eliminar,'text-center');
                $(tbody).append(tr);
            });
            console.log(find);
            if(find)
                $('#resultados').show();

        };
        fallo = function(datos){
            console.log(datos);
        };
        peticionAjax(API_SYS_PATH+'permisos/obtener',arregloConInputs,exitoso,fallo,"Cargando permisos...");
    }
    function agregarTDaTR (tr,element,CSSclass){
        var td = $("<td></td>",{class:CSSclass});
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
                icon: 'fa fa-trash-o',
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
    function editarPermisos(element,tr){
        var $contenido = $("<div></div>");
        var $div_center = $("<div></div>",{class:'text-center'});
        var permisos = element['permisos'];
        var div= $("<div></div>",{class:'btn-group-vertical','data-toggle':'buttons'});
        permisos.forEach(function(el,index){
            var claseActivo = el.activo?'active':'';
            var claseDefinida = el.activo?'btn btn-success ':'btn btn-danger ';
            var label= $("<label></label>",{class:claseDefinida +claseActivo });
            var checkbox= $("<input>",{type:'checkbox',autocomplete:'off',value:el.id_permiso,checked:el.activo});
            label.click(function(){
                console.log(element);
                if($(this).children().attr("checked")){
                    $(this ).removeClass( "btn btn-success" );
                    $( this ).addClass( "btn btn-danger" );
                }else{
                    $(this ).removeClass( "btn btn-danger" );
                    $( this ).addClass( "btn btn-success" );
                }
                $(this).children().attr("checked", !$(this).children().attr("checked"));
                el.activo=!el.activo;
                console.log(element);
            });
            $(label).append(checkbox);
            $(label).append(el.descripcion);
            $(div).append(label);
        });
        $div_center.append(div);
        $contenido.append($div_center);


        BootstrapDialog.show({
            title: 'Esta a punto de cambiar permisos del rol '+element.descripcion,
            message:function(dialog) {
                return $contenido;
            },
            type: BootstrapDialog.TYPE_WARNING,
            buttons: [{
                id: 'btn-1',
                label: 'Cancelar',
                cssClass: 'btn-primary',
                action: function(dialog) {
                    dialog.close();
                }
            },{
                id: 'btn-2',
                label: 'Guardar',
                icon: 'fa fa-floppy-o',
                cssClass: 'btn-success',
                action: function(dialog) {
                    var datos = {};
                    datos = element;

                    exitoso = function(datos){
                        notificacionSuccess(datos.success);
                        dialog.close();
                        setTimeout(function(){
                            window.location.reload();
                        },1000);
                    };
                    fallo = function(datos){
                        notificacionError(datos.error);
                    };
                    peticionAjax(API_SYS_PATH+'permisos/actualizar',datos,exitoso,fallo);
                }
            }]
        });
    }
});