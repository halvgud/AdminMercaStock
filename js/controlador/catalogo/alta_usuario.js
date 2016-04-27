        var contador = 0;
        $("#guardarUsuario").submit(function(){
            var form1 = $("#guardarUsuario").find("select,input").serializeArray();
            var datosTabla1 = {};
            form1.forEach(function(input) {
                datosTabla1[input.name] = input.value;
            });
            datosTabla1['fecha_alta'] = moment().format("YYYY/MM/DD HH:mm:ss");
            exitoso = function(datos){
                notificacionSuccess(datos.success);
                $("#guardarUsuario")[0].reset();
                contador = 0;
            };
            fallo = function(datos){
                notificacionError(datos.error);
            };
            peticionAjax('data/testinsert.php',datosTabla1,exitoso,fallo);

            return false;
        });

        $(function() {
            $.datetimepicker.setLocale('es');
            $("#inicio").datetimepicker({
                timepicker:false,
                format:'Y/m/d'
            });
            $("#fin").datetimepicker({
                timepicker:false,
                format:'Y/m/d'
            });
            $("#id_empleado").focusout(function(){
                cargatDatosEmpleado();
            });
            $("#id_empleado").enterKey(function(e){
                e.preventDefault();
                cargatDatosEmpleado();
            });
            function cargatDatosEmpleado(){
                $('input[data-empleado]').val('');
                var form1 = $("#tabl1_visita").find('input[data-empleado]').serializeArray();
                var datosTabla1 = {};
                form1.forEach(function(input) {
                    datosTabla1[input.name] = input.value;
                });
                console.warn(datosTabla1);
                cargarInputs(datosTabla1,5,$("#id_empleado").val())
            }
            cargarDropDownList(("#rol"),'id_rol','descripcion',12);
        });