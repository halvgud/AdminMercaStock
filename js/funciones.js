class Funcion{
    static mostrarDialogoDeEspera($dialogo){
        var $contenido = $("<div></div>");
        var $form_group = $("<div></div>",{class:'sk-cube-grid',id:'cover'});
        var br="";
        for(var $i = 1;$i<10;$i++){
            var $cubo = $("<div></div>",{class:'sk-cube sk-cube'+$i});
            $form_group.append($cubo);
            br+="<br>";
        }
        $contenido.append($form_group);
        $contenido.append(br);
        BootstrapDialog.show({
            'title': $dialogo,
            'closable': false,
            'message':function(/*dialog*/) {
                return $contenido;
            },
            'type': BootstrapDialog.TYPE_WARNING,
            'size': BootstrapDialog.SIZE_SMALL
        })
    }
    static setearLenguaje(){
        return {
            "sProcessing":     "Procesando...",
            "sLengthMenu":     "Mostrar _MENU_ registros",
            "sZeroRecords":    "No se encontraron resultados",
            "sEmptyTable":     "Ningún dato disponible en esta tabla",
            "sInfo":           "Mostrando registros del _START_ al _END_ de un total de _TOTAL_ registros",
            "sInfoEmpty":      "Mostrando registros del 0 al 0 de un total de 0 registros",
            "sInfoFiltered":   "(filtrado de un total de _MAX_ registros)",
            "sInfoPostFix":    "",
            "sSearch":         "Buscar:",
            "sUrl":            "",
            "sInfoThousands":  ",",
            "sLoadingRecords": "Cargando...",
            "oPaginate": {
                "sFirst":    "Primero",
                "sLast":     "Último",
                "sNext":     "Siguiente",
                "sPrevious": "Anterior"
            },
            "oAria": {
                "sSortAscending":  ": Activar para ordenar la columna de manera ascendente",
                "sSortDescending": ": Activar para ordenar la columna de manera descendente"
            },buttons: {
                copyTitle: 'Copiado al Portapapeles',
                copySuccess: {
                    _: 'Se han copiado %d Registros'
                },

                colvis: 'Cambiar Columnas'
            }
        };
    }
    /**
     * @param opciones                                      objeto con multiples propiedades.
     * @param opciones.RestUrl                              ruta corta //obligatorio
     * @param opciones.DT                                   Identificador del DataTable //obligatorio
     * @param opciones.datos                                parametros a enviar //obligatorio
     * @param opciones.arregloColumnas                      arreglo que contiene las columnas //obligatorio
     * @param opciones.loading                              valor booleano para mostrar o no el mensaje de carga //opcional
     * @param opciones.success                              callback al mostrar la tabla //opcional
     * @param opciones.ocultarBusqueda                      valor booleano para ocultar la opcion de busqueda //opcional
     * @param opciones.funcionDeColor                       arreglo para la columna de colores. //opcional
     * @param opciones.funcionDeColor['Posicion']           lugar en el que se va ordenar y se va pintar
     * @param opciones.funcionDeColor['PosicionMultiple']   arreglo que contiene las columnas que se van a ocultar
     * @param opciones.rowCallBack                          callback para ajustar valor de columnas
     * @param opciones.select
     * @param opciones.habilitarCheckBox
     */
    static peticionAjaxDT(opciones) {
        opciones =  opciones || {}; //forzar que sea objeto
        if ((opciones.loading) != undefined) {
            Funcion.mostrarDialogoDeEspera(opciones.loading);
        }
        var banderaMostrarBusqueda=false;
        if(opciones.ocultarBusqueda==undefined){
            banderaMostrarBusqueda=true;
        }
        var order=[[ 0, "asc" ]];
        var dom='Bfrtip';

        if(opciones.funcionDeColor!=undefined){
            dom='<"toolbar">Bfrtip';
            if(opciones.funcionDeColor['Posicion']!=undefined){
                order= [[ opciones.funcionDeColor['Posicion'], "desc" ]]
            }
        }
        return $(opciones.DT).DataTable({
            dom: dom,
            "bDestroy": true,
            "order": order,
            "language": Funcion.setearLenguaje(),
            "bFilter": banderaMostrarBusqueda,
            "bPaginate":banderaMostrarBusqueda,
            "bInfo":banderaMostrarBusqueda,
            "bStateSave": true,
            'createdRow': function( nRow, aData) {
                if(opciones.funcionDeColor==undefined){
                    return nRow;
                }else if(opciones.funcionDeColor['Posicion']!=undefined){
                    if(aData.bandera!=undefined){
                        $('td', nRow).eq(opciones.funcionDeColor['Posicion'])
                            .css('background-color',
                                Funcion.obtenerColorPorPorcentaje(aData.bandera));
                    }
                }
                return nRow;
            },
            columnDefs: opciones.columnDefs,
            "rowCallback":  opciones.rowCallBack,
            "select":opciones.select,
            ajax: {
                'url': API_SYS_PATH + opciones.RestUrl,
                'type': "POST",
                dataType: 'json',
                'beforeSend': function (request) {
                    request.setRequestHeader("Auth", API_TOKEN);
                },
                data: function () {
                    console.log(JSON.stringify(opciones.datos));
                    return JSON.stringify(opciones.datos);
                },
                /**
                 * @param {{estado:string}} json
                 * @param {{success:string}} json
                 * @param {{data:array}} json
                 */
                'dataSrc': function (json) {
                    console.log(json);
                    console.log(json.data);
                    if ((opciones.loading) != undefined) {
                        BootstrapDialog.closeAll();
                    }
                    if (json.estado == "warning") {
                        Funcion.notificacionWarning(json.success);
                        return json.data;
                    }
                    else {
                        if(opciones.success) {
                            opciones.success(json.success);
                        }else{
                            Funcion.notificacionSuccess(json.success);
                        }
                        console.log(json.data);
                        return json.data;
                    }
                }
                /**
                 * @param {{responseText:string}} jqXHR
                 * @param {{responseJSON:string}} jqXHR
                 */
                , error: (function (jqXHR) {
                    if ((opciones.loading) != undefined) {
                        BootstrapDialog.closeAll();
                    }
                    console.log(jqXHR.responseText);
                    var resulta = jqXHR.responseJSON;
                    if (resulta != undefined) {
                        console.log(resulta);
                        if (resulta['error']) {
                            Funcion.notificacionError(resulta['error']);
                        } else {
                            Funcion.notificacionError(resulta['mensaje']);
                        }
                    } else {
                        Funcion.notificacionError('Error de conexión al servicio API');
                    }
                })
            },
            columns: opciones.arregloColumnas,
            buttons: Funcion.setearBotones()
        });
    }//peticionAjaxDT
    static setearBotones(){
        return [
            {
                extend: 'collection',
                text: 'Exportar tabla',
                buttons: [
                    {
                        extend: 'pdfHtml5',
                        exportOptions:{
                            columns:':visible'
                        }
                    }
                    , 'csvHtml5', 'copyHtml5', 'excelHtml5'
                ]
            },'colvis'
        ]
    }

    static obtenerColorPorPorcentaje(pct) {
        var colores = [
            { pct: 0.0, color: { r: 133, g: 34, b: 38 } },
            { pct: 0.5, color: { r: 250, g: 133, b: 38 } },/*204,219,38*/
            { pct: 1.0, color: { r: 34, g: 133, b: 38 } } ];
        for (var i = 1; i < colores.length - 1; i++) {
            if (pct < colores[i].pct) {
                break;
            }
        }
        var limiteInferior = colores[i - 1];
        var limiteSuperior = colores[i];
        var rango = limiteSuperior.pct - limiteInferior.pct;
        var rangoPorcentaje = (pct - limiteInferior.pct) / rango;
        var pctLower = 1 - rangoPorcentaje;
        var pctUpper = rangoPorcentaje;
        var color = {
            r: Math.floor(limiteInferior.color.r * pctLower + limiteSuperior.color.r * pctUpper),
            g: Math.floor(limiteInferior.color.g * pctLower + limiteSuperior.color.g * pctUpper),
            b: Math.floor(limiteInferior.color.b * pctLower + limiteSuperior.color.b * pctUpper)
        };
        return 'rgb(' + [color.r, color.g, color.b].join(',') + ')';
    }

    /***
     * @param opciones.Url  string
     * @param opciones.datos array
     * @param opciones.success function
     * @param opciones.error function
     * @param opciones.mensajeDeEspera string
     * URL,datos,successCallBack,errorCallBack,loading
     */
    static peticionAjax (opciones) {
        console.log(JSON.stringify(opciones));
        console.log(URL);
        opciones =  opciones || {};
        if ((opciones.mensajeDeEspera) != undefined) {
            Funcion.mostrarDialogoDeEspera(opciones.mensajeDeEspera);
        }
        $.ajax({
                type: "POST",
                url: opciones.Url,
                data: JSON.stringify(opciones.datos),
                dataType: 'json',
                beforeSend: function (request){
                    request.setRequestHeader("Auth", API_TOKEN);
                }
            })
            .done(function (resultado) {
                if (!(resultado != undefined && resultado['estado'] != undefined && resultado['estado'] == "nomessage")) {
                    if (opciones.success) {
                        opciones.success(resultado);
                    }
                    if ((opciones.mensajeDeEspera) != undefined) {
                        BootstrapDialog.closeAll();
                    }
                }
            })
            .fail(function (jqXHR) {
                var resulta = jqXHR.responseJSON;
                if ((opciones.mensajeDeEspera) != undefined) {
                    BootstrapDialog.closeAll();
                }
                if (resulta != undefined) {
                    console.log(resulta);
                    Funcion.notificacionError(resulta['error'] ?
                        resulta['error']    : resulta['mensaje']?
                        resulta['mensaje']  : resulta['message']);
                    if(resulta['estado']!=undefined&&resulta['estado']=='-1'){
                        Funcion.logout();
                    }
                } else {
                    console.log(jqXHR.responseText);
                    Funcion.notificacionError('Error de conexión al servicio API');
                }
                if (opciones.error) {
                    opciones.error(resulta);
                }
            });
    }//peticionAjax
    static logout() {
        var exitoso = function () {
            window.location.reload();
        };
        var fallo = function (datos) {};
        Funcion.peticionAjax({Url:'/data/logout.php', datos:'', success:exitoso, error:fallo});
    }

    static notificacionError(mensaje) {
        $.notify({
            icon: 'fa fa-exclamation-circle',
            title: '<strong>Error</strong><br>',
            message: mensaje
        }, {
            element: 'body'     ,position: null,
            type: "danger"      ,allow_dismiss: true,
            newest_on_top: true ,showProgressbar: false,
            placement: {
                from: "top"     ,align: "right"
            },
            z_index: 2000       ,delay: 8000,
            timer: 1000         ,animate: {
                enter: 'animated fadeInDown',
                exit: 'animated fadeOutUp'
            }
        });
    }//notificacionError

    static notificacionWarning(mensaje) {
        $.notify({
            icon: 'fa fa-exclamation-triangle',
            title: '<strong>Advertencia</strong><br>',
            message: mensaje
        }, {
            element: 'body'     ,position: null,
            type: "warning"     ,allow_dismiss: true,
            newest_on_top: true ,showProgressbar: false,
            placement: {
                from: "top"     ,align: "right"
            },
            z_index: 2000       ,delay: 8000,
            timer: 1000         ,animate: {
                enter: 'animated fadeInDown',
                exit: 'animated fadeOutUp'
            }
        });
    }

    static notificacionSuccess(mensaje) {
        $.notify({
            // options
            icon: 'fa fa-thumbs-o-up',
            title: '<strong>Correcto</strong><br>',
            message: mensaje
        }, {
            // settings
            element: 'body'     ,position: null,
            type: "success"     ,allow_dismiss: true,
            newest_on_top: true ,showProgressbar: false,
            placement: {
                from: "top"     ,align: "right"
            },
            z_index: 2000       ,delay: 5000,
            timer: 1000         ,animate: {
                enter: 'animated fadeInDown',
                exit: 'animated fadeOutUp'
            }
        });
    }
    static cargarDropDownListJson(json){
        Funcion.cargarDropDownList(json.objectoJquery,json.id,json.descripcion,json.rest,json.idGenerico,json.cargarTodos,json.mensaje,json.items,json.valorDefault);
    }


    static cargarDropDownList(nombreJquery, idSql, descripcionSql, rutaRest, idGenerico, cargarTodos,mensaje,itemS,valorDefault) {
        var arreglo = {};
        if(idGenerico!=undefined){
            arreglo['idGenerico'] = idGenerico;
        }
        //arreglo['idTransaccion'] = rutaRest;
        /**
         * @param {{estado:string}} result
         * @param {{success:string}} result
         */
        var exitoso = function (result) {
            if (result.estado!="warning"){
                var resultados;
                resultados = idSql == 'idSucursal' || idSql == 'idConcepto' ? result.data : result.data[0];
                if(itemS!=null){
                    $(nombreJquery).append($("<option></option>", {value: '', text: itemS}));
                }
                for (var i = 0; i < resultados.length; i++) {
                    if(valorDefault!=undefined&&valorDefault==resultados[i][idSql]){
                        $(nombreJquery).append($("<option></option>", {value: resultados[i][idSql],
                            text: resultados[i][descripcionSql],selected:'selected'}));
                    }else{
                        $(nombreJquery).append($("<option></option>", {value: resultados[i][idSql],
                            text: resultados[i][descripcionSql]}));
                    }

                }
                if (cargarTodos != undefined && cargarTodos == true) {
                    $(nombreJquery).append($("<option></option>", {value: '%', text: 'MOSTRAR TODOS'}));
                }
            }
            else if(result.estado=='warning'){
                Funcion.notificacionWarning("Error al traer el listado");
            }
        };
        var fallo = function (datos) {
            console.log(datos);
        };
        console.log(arreglo);
        Funcion.peticionAjax({Url:rutaRest, datos:arreglo, success:exitoso, error:fallo,mensajeDeEspera:mensaje});
    }

    static cambiarContrasena(){
        var $contenido = $("<form></form>", {name: 'formSucursal'});
        var $form_group = $("<div></div>", {class: 'form-inline'});
        var label = $("<label></label>", {for: 'passwordActual',text: 'Contraseña actual:\u00a0'});
        var nombre = $("<input>", {
            id: 'passwordActual'    ,name: 'passwordActual',
            value: ''               ,type: 'password',
            class: 'form-control'   ,required: 'required'
        });
        var salto = $("<br><br>");
        $form_group.append(label);
        $form_group.append(nombre);
        $form_group.append(salto);

        label = $("<label></label>", {
            for: 'passwordNueva1'   ,text: 'Contraseña nueva:\u00a0'
        });
        nombre = $("<input>", {
            id: 'passwordNueva1'    ,name: 'passwordNueva1',
            value: ''               ,type: 'password',
            class: 'form-control'   ,required: 'required'
        });
        salto = $("<br><br>");
        $form_group.append(label);
        $form_group.append(nombre);
        $form_group.append(salto);

        label = $("<label></label>", {
            for: 'passwordNueva2'   ,text: 'Repetir Contraseña nueva:\u00a0'
        });
        nombre = $("<input>", {
            id: 'passwordNueva2'    ,name: 'passwordNueva2',
            value: ''               ,type: 'password',
            class: 'form-control'   ,required: 'required'
        });
        salto = $("<br><br>");
        $form_group.append(label);
        $form_group.append(nombre);
        $form_group.append(salto);

        var generarModalPopUp = $("<button></button>", {
            id: "guardar"           ,name: "guardar",
            type: 'button'          ,class: 'btn btn-outline btn-success',
            text: 'Guardar'
        });
        $form_group.append(generarModalPopUp);
        $contenido.append($form_group);
        $(generarModalPopUp).click(function() {
            //inicializarTablaModalPopuUp();
            var arregloConInputs={};
            var passwordNueva1=$('#passwordNueva1').val();
            var passwordNueva2=$('#passwordNueva2').val();
            var passwordActual=$('#passwordActual').val();
            if(passwordNueva1!=passwordNueva2||(passwordNueva1==''||passwordNueva2==''||passwordActual=='')) {
                Funcion.notificacionWarning("Falta algún campo de llenar o las contraseñas no coinciden, favor de verificar los datos ");
                return false;
            }else{
                /**
                 * @param {{estado:string}} result
                 * @param {{success:string}} result
                 * @param {{mensaje:string}} result
                 */
                var exitoso = function(result) {
                    if (typeof(result.estado)!='undefined') {
                        if (result.estado == 'warning') {
                            Funcion.notificacionWarning(result.mensaje);
                            //logout();
                            return;
                        }
                        if (result.estado == 'success') {
                            Funcion.notificacionSuccess(result.success);
                            window.setInterval(Funcion.logout, 3000);
                        }
                    }
                };
                var fallo = function(datos) {};
                arregloConInputs['passwordActual']=passwordActual;
                arregloConInputs['passwordNueva']=passwordActual;
                arregloConInputs['usuario']=$('#usuario').val();
                Funcion.peticionAjax({Url:API_SYS_PATH + 'usuario/actualizarContrasena', datos:arregloConInputs, success:exitoso, error:fallo});
            }
        });
        BootstrapDialog.show({
            title: "Cambiar Contraseña",
            message: function(/*dialog*/) {
                return $contenido;
            },
            style: 'width:85%;',
            closable: false,
            type: BootstrapDialog.TYPE_WARNING,
            onshown: function() {},
            buttons: [{
                id: 'btn-1',
                label: 'Regresar',
                cssClass: 'btn-primary',
                action: function(dialog) {
                    dialog.close();
                }
            }]
        });
        return false;
    }//cambiar contraseña
    static agregarTDaTR(tr, element, cssClass){
        var td= cssClass ? $("<td></td>", {class: cssClass}) : $("<td></td>");
        $(td).append(element);$(tr).append(td);
    }
    static agregarTHaTR(tr, element, cssClass){
        var th = cssClass ? $("<th></th>", {class: cssClass}) : $("<th></th>");
        $(th).append(element);
        $(tr).append(th);
    }
}//Class funcion
$.fn.enterKey = function (fnc) {
    return this.each(function () {
        $(this).keypress(function (ev) {
            var keycode = (ev.keyCode ? ev.keyCode : ev.which);
            if (keycode == '13') {
                fnc.call(this, ev);
            }
        });
    });
};



/*
 function cargarDropDownListDescripcion(nameattr, tipo) {
 cargarDropDownList(nameattr, 'id_descripcion', 'descripcion', 1, tipo);
 }*/

