class Data_Test {
    
    /**
     * 
     * @param {declaracion de la entidad} entidad 
     */
    constructor(entidad){

        
        this.actions = ["ADD","EDIT","SEARCH"]

        // se crea la entidad indicada en modo test
        this.entidad = new entidad('test');
        this.dom = new dom;

        // se crea el formulario oculto
        document.getElementById('form').innerHTML = this.entidad.manual_form_creation();


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
            pruebastatus:''      
        };

        var contadorpruebas = 0;

        // recorro todas las pruebas definidas
        
        for (let i=0;i<pruebas.length;i++){

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
            resultadopruebas.descripcion = def[3];

            // creo objeto html sino tengo cargado el formulario (para crear cada elemento dinamicamente dentro del form)           
            
            //meto valor en objeto (esto depende del tipo de elemento de formulario)
            for (var j=0;j<pruebas[i][5].length;j++){

                for (var clave in pruebas[i][5][j]){
                
                    var nombrecampo = clave;
                    var valorcampo = pruebas[i][5][j][nombrecampo];
                    document.getElementById(nombrecampo).value = valorcampo;

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
                    pruebastatus:''      
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
            pruebastatus:''      
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
                    pruebastatus:''      
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
        
        this.dom.showData('IU_Test_result_nofile', salidapruebasnofile, marcados);
       
        var salidapruebasfile = this.data_test_data_file();
       
        // se invoca la muestra del resultado de las pruebas
        this.dom.showData('IU_Test_result_file', salidapruebasfile, marcados);

        return true;

    }

    devolver_def(num_def){

        for (let i=0;i<this.array_def_tests.length;i++){
            if (this.array_def_tests[i][2] == num_def){
                return this.array_def_tests[i];
            }
        }
    }
    

    

    
    
}