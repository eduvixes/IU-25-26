class Data_Test {
    
    /**
     * 
     * @param {declaracion de la entidad} entidad 
     */
    constructor(entidad){

        
        this.actions = ["ADD","EDIT","SEARCH"];

        // se crea la entidad indicada en modo test
        this.entidad = new entidad('test');
        this.dom = new dom;

        // se crea el formulario oculto
        document.getElementById('contenedor_IU_form').innerHTML = this.entidad.manual_form_creation();
        this.dom.createElement('form_iu','submit_button','input','submit');


        // se almacena la variable de definicion de test, pruebas no file y pruebas file
        this.array_def_tests = eval(this.entidad.nombreentidad+'_def_tests');
        this.array_pruebas_nofile = eval(this.entidad.nombreentidad+'_tests_fields');
        this.array_pruebas_file = eval(this.entidad.nombreentidad+'_tests_files');

        // se invoca la realizacion de pruebas
        this.data_test_class();

        
        
         // se invoca la muestra del resultado de las pruebas
        //this.dom.showtestresult('IU_Test_result', test_result);

    }

    data_test_data_nofile(){

        var pruebas = this.array_pruebas_nofile;
       
        var salidapruebas = [];

        var resultadopruebas = {
            entidad: "",
            campo: '',
            NumDef: '',
            NumPrueba: '',
            descripcion: '',
            accion: '',
            valorprueba: '',
            respuestaesperada: '',
            resultadoprueba:'',
            pruebastatus:'',
            textoidiomaerror:''        
        };

        var contadorpruebas = 0;

        // recorro todas las pruebas definidas
        
        for (let i=0;i<pruebas.length;i++){

            // se crea el formulario oculto
        document.getElementById('contenedor_IU_form').innerHTML = this.entidad.manual_form_creation();
        this.dom.createElement('form_iu','submit_button','input','submit');

            resultadopruebas.entidad = pruebas[i][0];
            resultadopruebas.campo = pruebas[i][1];
            resultadopruebas.NumDef = pruebas[i][2];
            resultadopruebas.NumPrueba = pruebas[i][3];
            resultadopruebas.descripcion = '';
            resultadopruebas.accion = pruebas[i][4];
            
            

            for (var j=0;j<pruebas[i][5].length;j++){

                for (var clave in pruebas[i][5][j]){
                
                    var nombrecampo = clave;
                    var valorcampo = pruebas[i][5][j][nombrecampo];
                    resultadopruebas.valorprueba += nombrecampo+'='+valorcampo+'<br>';

                }

            }

            resultadopruebas.respuestaesperada = pruebas[i][6];
        

            // recupero el test correspondiente a la prueba que realizo
            var def = this.devolver_def(resultadopruebas.NumDef);
            resultadopruebas.descripcion = def[4];
            var tipoelemento = def[2];

            // creo objeto html sino tengo cargado el formulario (para crear cada elemento dinamicamente dentro del form)           
            
            //meto valor en objeto (esto depende del tipo de elemento de formulario)
            for (var j=0;j<pruebas[i][5].length;j++){

                for (var clave in pruebas[i][5][j]){
                
                    var nombrecampo = clave;
                    var valorcampo = pruebas[i][5][j][nombrecampo];

                    switch (tipoelemento){
                        case 'textarea':
                            document.getElementById(nombrecampo).innerText = valorcampo;
                            break;
                        case 'input':
                            document.getElementById(nombrecampo).value = valorcampo;
                            break;
                        case 'select':
                            this.rellenarvalorselect(nombrecampo, valorcampo);
                            break;
                        case 'checkbox':
                            this.rellenarvalorcheckbox(nombrecampo, valorcampo)
                            break;
                        case 'radio':
                            this.rellenarvalorradio(nombrecampo, valorcampo);
                            break;
                        default:
                            alert('no hay tipo de elemento definido en el test '+resultadopruebas.NumDef);

                    }
                    
                }

            }
           

            //llamo a la funcion de validacion del campo según su accion
            var resultadoprueba = eval('this.entidad.'+resultadopruebas.accion+'_'+resultadopruebas.campo+'_validation()');
            resultadopruebas.resultadoprueba = resultadoprueba;
           

            // compruebo si el resultado del test y la respuesta esperada es la misma
            if (resultadoprueba == resultadopruebas.respuestaesperada){
                resultadopruebas.pruebastatus = 'CORRECTO';
            }
            else{
                resultadopruebas.pruebastatus = 'INCORRECTO';
            }

            resultadopruebas.textoidiomaerror = this.devolverTraduccionError(resultadopruebas.respuestaesperada);

            salidapruebas[contadorpruebas] = resultadopruebas;
            contadorpruebas++;
            resultadopruebas = 
                {   
                    entidad: '',
                    campo: '',
                    NumDef: '',
                    NumPrueba: '',
                    descripcion: '',
                    accion: '',
                    valorprueba: '',
                    respuestaesperada: '',
                    resultadoprueba:'',
                    pruebastatus:'',
                    textoidiomaerror:''      
                };

        }

        return salidapruebas;
    }

    data_test_data_file(){

        var pruebas = this.array_pruebas_file;
       
        var salidapruebas = [];

        var resultadopruebas = {
            entidad: "",
            campo: '',
            NumDef: '',
            NumPrueba: '',
            descripcion: '',
            accion: '',
            valorprueba: '',
            respuestaesperada: '',
            resultadoprueba:'',
            pruebastatus:'',
            textoidiomaerror:''      
        };

        var contadorpruebas = 0;

        // recorro todas las pruebas definidas
        
        for (let i=0;i<pruebas.length;i++){



            resultadopruebas.entidad = pruebas[i][0];
            resultadopruebas.campo = pruebas[i][1];
            resultadopruebas.NumDef = pruebas[i][2];
            resultadopruebas.NumPrueba = pruebas[i][3];
            resultadopruebas.accion = pruebas[i][4];
            //resultadopruebas.descripcion = pruebas[i][5];
            
            

            for (var j=0;j<pruebas[i][6].length;j++){

                for (var clave in pruebas[i][6][j]){
                
                    var nombrecampo = clave;
                    var valorcampo = pruebas[i][6][j][nombrecampo];
                    resultadopruebas.valorprueba += nombrecampo+':'+valorcampo+'<br>';

                }

            }

            resultadopruebas.respuestaesperada = pruebas[i][7];
        

            // recupero el test correspondiente a la prueba que realizo
            var def = this.devolver_def(resultadopruebas.NumDef);
            resultadopruebas.descripcion = def[3];

            // creo objeto html sino tengo cargado el formulario (para crear cada elemento dinamicamente dentro del form)
             //construyo objeto file y relleno valor para prueba
            if (pruebas[i][6].length != 0){
                              
                var nombrefichero = pruebas[i][6][0].format_name_file;
                var tipomime = pruebas[i][6][1].type_file;
                var maxsize = pruebas[i][6][2].max_size_file;   


                var file = new File([new ArrayBuffer(maxsize)], nombrefichero ,{type:tipomime, webkitRelativePath:"C:\\fakepath\\"+nombrefichero});
                
                // Create a data transfer object. Similar to what you get from a `drop` event as `event.dataTransfer`
                const dataTransfer = new DataTransfer();

                // Add your file to the file list of the object
                dataTransfer.items.add(file);

                // Save the file list to a new variable
                const fileList = dataTransfer.files;

                // Set your input `files` to the file list
                document.getElementById(resultadopruebas.campo).files = fileList;

                
            }
           
                    

            //llamo a la funcion de validacion del campo según su accion
            var resultadoprueba = eval('this.entidad.'+resultadopruebas.accion+'_'+resultadopruebas.campo+'_validation()');
            resultadopruebas.resultadoprueba = resultadoprueba;
           

            // compruebo si el resultado del test y la respuesta esperada es la misma
            if (resultadoprueba == resultadopruebas.respuestaesperada){
                resultadopruebas.pruebastatus = 'CORRECTO';
            }
            else{
                resultadopruebas.pruebastatus = 'INCORRECTO';
            }

            resultadopruebas.textoidiomaerror = this.devolverTraduccionError(resultadopruebas.respuestaesperada);
            
            
            salidapruebas[contadorpruebas] = resultadopruebas;
            contadorpruebas++;
            resultadopruebas = 
                {   
                    entidad: '',
                    campo: '',
                    NumDef: '',
                    NumPrueba: '',
                    descripcion: '',
                    accion: '',
                    valorprueba: '',
                    respuestaesperada: '',
                    resultadoprueba:'',
                    pruebastatus:'',
                    textoidiomaerror:''      
                };

        }

        return salidapruebas;
   
    }


    /**
     *  se comprueban las pruebas definidas contra la clase para la que son definidas.
     * 
     *      @return un objeto con un objeto con clase asociativa para cada prueba
     */

    data_test_class(){


        var salidapruebasnofile = this.data_test_data_nofile();
         // se invoca la muestra del resultado de las pruebas
        let marcados =	{
					pruebastatus: {value:'INCORRECTO', style:'background-color: red'}
        };
        
        
        const newWindow = window.open("", "Nueva Ventana", "width=1100,height=800");
        //newWindow.document.write(salidapruebasnofile);
        
        
        this.dom.showData('IU_Test_result_nofile', salidapruebasnofile, marcados);

        newWindow.document.body.innerHTML = document.getElementById('IU_Test_result_nofile').innerHTML;
        document.getElementById('IU_Test_result_nofile').style.display = 'none';

        
        var salidapruebasfile = this.data_test_data_file();
       
        // se invoca la muestra del resultado de las pruebas
        
        this.dom.showData('IU_Test_result_file', salidapruebasfile, marcados);
        
        newWindow.document.body.innerHTML += document.getElementById('IU_Test_result_file').innerHTML;
        document.getElementById('IU_Test_result_file').style.display = 'none';

        newWindow.document.close();

        return true;

    }

    /**
     * Rellenado de un select de elección única
     * UPDATE: pendiente la modificación para select multiple
     * @param {String} id id del elemento html select
     * @param {String} valor valor con el que inicializar el elemento. Si ya existe se pone como selected, sino existe
     * se crea como option, se pone el valor y se pone como selected.
     */
    rellenarvalorselect(id, valor){

        var opciones = document.getElementById(id).options;

        // comprobar si existe el valor en el select
        // si existe se pone como seleccionado
        var indexvalor = -1;
        for (var i=0;i<opciones.length;i++){
            if (opciones[i].value == valor){
                opciones.selectedIndex = i;
                indexvalor = i;
            }
        }
        
        // si no existe se crea un option con ese valor y se coloca como seleccionado
        if (indexvalor == -1){
            var mioption = document.createElement('option');
            mioption.value = valor;
            opciones[opciones.length] = mioption;
            opciones.selectedIndex = opciones.length-1;
        }

    }

    /**
     * se recorren todos los elementos checkbox con el mismo nombre
     * si el valor esta en uno de los elementos se coloca como seleccionado
     * si no esta el valor se crea un elemento con ese valor y se coloca como seleccionado
     * UPDATE: pendiente realizar modificacion para admitir eleccion multiple
     * @param {String} name valor del parametro name que deben tener todos los elementos del checkbox 
     * @param {String} valor a comprobar en el checkbox
     */
    rellenarvalorcheckbox(name, valor){

        // se obtiene el elemento de check si existe en el formulario cargado
        var opcionescheck = document.getElementsByName(name);
        // si hay un solo elemento con ese nombre
        if (opcionescheck.length == 1){
            opcionescheck.value = valor;
            opcionescheck.checked = true;
        }
        // si hay mas de un elemento con ese nombre
        // comprobamos si el valor esta y si esta lo ponemos como checked
        // si no esta lo creamos y lo ponemos checked
        else{
            var encontrado = false;
            for (var i=0;i<opcionescheck.length;i++){
                // si recibiesemos un array de valores deberiamos comprobarlos todos 
                // posiblemente con un (opcionescheck.includes(valor))
                if (opcionescheck[i].value == valor){
                    opcionescheck[i].checked = true;
                    encontrado = true;
                }
                else{
                    opcionescheck[i].checked = false;
                }
            }
            if (!encontrado){
                var micheck = document.createElement('input');
                micheck.type = 'checkbox';
                micheck.name = name;
                micheck.value = valor;
                micheck.checked = true;
                document.getElementById('form_iu').append(micheck);
            }

        }
    }

    /**
     * se recorren todos los elementos radio con el mismo nombre
     * si el valor esta en uno de los elementos se coloca como seleccionado
     * si no esta el valor se crea un elemento con ese valor y se coloca como seleccionado
     * @param {String} name valor del parametro name que deben tener todos los elementos del radio 
     * @param {String} valor a comprobar en el radio
     */
    rellenarvalorradio(name, valor){

        // se obtiene el elemento de check si existe en el formulario cargado
        var opcionesradio = document.getElementsByName(name);
        // si hay un solo elemento con ese nombre
        if (opcionesradio.length == 1){
            opcionesradio[0].value = valor;
            opcionesradio[0].checked = true;
        }
        // si hay mas de un elemento con ese nombre
        // comprobamos si el valor esta y si esta lo ponemos como checked
        // si no esta lo creamos y lo ponemos checked
        else{
            var encontrado = false;
            for (var i=0;i<opcionesradio.length;i++){
                // si recibiesemos un array de valores deberiamos comprobarlos todos 
                // posiblemente con un (opcionesradio.includes(valor))
                if (opcionesradio[i].value == valor){
                    opcionesradio[i].checked = true;
                    encontrado = true;
                }
                else{
                    opcionesradio[i].checked = false;
                }
            }
            if (!encontrado){
                var micheck = document.createElement('input');
                micheck.type = 'radio';
                micheck.name = name;
                micheck.value = valor;
                micheck.checked = true;
                document.getElementById('form_iu').append(micheck);
            }

        }
    }


    devolver_def(num_def){

        for (let i=0;i<this.array_def_tests.length;i++){
            if (this.array_def_tests[i][3] == num_def){
                return this.array_def_tests[i];
            }
        }
    }
    
    devolverTraduccionError(codigoerror){
        
        var lang = getCookie('lang');
            
        var traduccion;


        switch(lang) {
            case 'ES' : 
                traduccion=textos_ES;
                break;
            case 'EN' :
                traduccion=textos_EN;
                break;
            default:
                traduccion=textos_ES;
                break;
        }

        
        if (codigoerror == true){
            return 'Exito';
        }
        else{
            if (traduccion[codigoerror] == null){
                return 'NO HAY TRADUCCION';
            }
            else{
                return traduccion[codigoerror];
            }
        }

    }
    

    
    
}