class persona extends Validations{

	constructor(esTest){
		super();
		
		this.dom = new dom();
		this.validations = new Validations();
		this.access_functions = new ExternalAccess();

		this.columnasamostrar = ['dni','nombre_persona', 'foto_persona'];
		this.mostrarespecial = ['foto_persona'];
		this.nombreentidad = 'persona';

		//init
		if (esTest == 'test'){}
		else{
			//visualizar seccion tabla y botones
			document.getElementById('IU_manage_entity').style.display = 'block';
			
			//crear el formulario vacio
			document.getElementById('IU_form').innerHTML = this.manual_form_creation();

			//invocar busqueda en back con el formulario vacio
			this.SEARCH();
		}

	}	

	/**
	 * replace the content of section element with a particular entity menu
	 * @returns 
	 */
	manual_form_creation(){
		var form_content = `
			<form id = 'form_iu' action="http://193.147.87.202/procesaform.php" method="POST" enctype="multipart/form-data" onsubmit="return entidad.ADD_submit_persona();">

			<label class="label_dni">dni</label>
			<input type='text' id='dni' name='dni' onblur=" return entidad.ADD_dni_validation();"></input>
			<span id="span_error_dni"><a id="error_dni"></a></span>
			<br>
			
			<label class="label_nombre_persona">Nombre de pila</label>
			<input type='text' id='nombre_persona' name='nombre_persona' onblur=" return entidad.ADD_nombre_persona_validation();"></input>
			<span id="span_error_nombre_persona" ><a id="error_nombre_persona"></a></span>
			<br>
			
			<label class="label_apellidos_persona">apellidos</label>
			<input type='text' id='apellidos_persona' name='apellidos_persona'></input>
			<span id="span_error_apellidos_persona" ><a id="error_apellidos_persona"></a></span>
			<br>
			
			<label class="label_fechaNacimiento_persona">Fecha de Nacimiento</label>
			<input type='text' id='fechaNacimiento_persona' name='fechaNacimiento_persona'></input>
			<span id="span_error_fechaNacimiento_persona" ><a id="error_fechaNacimiento_persona"></a></span>
			
			<br>
			<label class="label_direccion_persona">Dirección Postal</label>
			<textarea rows="5" cols="33" type='text' id='direccion_persona' name='direccion_persona'></textarea>
			<span id="span_error_direccion_persona" ><a id="error_direccion_persona"></a></span>
			<br>

			<label class="label_telefono_persona">Teléfono Persona</label>
			<input type='text' id='telefono_persona' name='telefono_persona'></input>
			<span id="span_error_telefono_persona" ><a id="error_telefono_persona"></a></span>
			
			<br>
			<label class="label_email_persona">Correo Electronico</label>
			<input type='text' id='email_persona' name='email_persona'></input>
			<span id="span_error_email_persona" ><a id="error_email_persona"></a></span>

			<br>
			<label id="label_foto_persona" class="label_foto_persona">Foto Persona</label>
			<input type='text' id='foto_persona' name='foto_persona'></input>
			<span id="span_error_foto_persona"><a id="error_foto_persona"></a></span>
			<a id="link_foto_persona" href="http://193.147.87.202/ET2/filesuploaded/files_foto_persona/"><img src="./iconos/FILE.png" /></a>
			
			<label id="label_nuevo_foto_persona" class="label_nuevo_foto_persona">Nueva Foto Persona</label>
			<input type='file' id='nuevo_foto_persona' name='nuevo_foto_persona'></input>
			<span id="span_error_nuevo_foto_persona"><a id="error_nuevo_foto_persona"></a></span>
			<br>

			<input id="submit_button" type="submit" value="Submit">

		</form>
		`;
		return form_content;
		
	}

	/**********************************************************************************************
		fields validations for ADD
	***********************************************************************************************/

	/** 
		
		@param 
		@return
			{string} Error code of field value (fieldname_validationfunction_KO) 
			or
			{bool} true due the field value is correct

	*/
	ADD_dni_validation(){
		
		if (!(this.validations.min_size('dni',9))){
			this.dom.mostrar_error_campo('dni','dni_min_size_KO');
			return "dni_min_size_KO";
		}
		if (!(this.validations.max_size('dni',9))){
			this.dom.mostrar_error_campo('dni','dni_max_size_KO');
			return "dni_max_size_KO";
		}
				
		var resp = this.personalize_dni_nie();
		if (!(resp === true)){
			this.dom.mostrar_error_campo('dni',resp);
			return resp;
		}
		
		this.dom.mostrar_exito_campo('dni');
		return true;

	}

	/**
		
		@param 
		@return
			{string} Error code of field value (fieldname_validationfunction_KO) 
			or
			{bool} true due the field value is correct

	*/

	ADD_nombre_persona_validation(){
		
		if (!(this.validations.min_size('nombre_persona',4))){
			this.dom.mostrar_error_campo('nombre_persona','nombre_persona_min_size_KO');
			return "nombre_persona_min_size_KO";
		}
		if (!(this.validations.max_size('nombre_persona',15))){
			this.dom.mostrar_error_campo('nombre_persona','nombre_persona_max_size_KO');
			return "nombre_persona_max_size_KO";
		}
		// allowed format aA to zZ letter
		if (!(this.validations.format('nombre_persona', '^[A-Za-z]*$'))){
			this.dom.mostrar_error_campo('nombre_persona','nombre_persona_format_KO');
			return "nombre_persona_format_KO";
		}
		this.dom.mostrar_exito_campo('nombre_persona');
		return true;
	}

	ADD_nuevo_foto_persona_validation(){

		if (!(this.validations.not_exist_file('nuevo_foto_persona'))){
			this.dom.mostrar_error_campo('nuevo_foto_persona','nuevo_foto_persona_empty_file_KO');
			return "nuevo_foto_persona_not_exist_file_KO";
		}
		if (!(this.validations.max_size_file('nuevo_foto_persona',2000))){
			this.dom.mostrar_error_campo('nuevo_foto_persona','nuevo_foto_persona_max_size_file_KO');
			return "nuevo_foto_persona_max_size_file_KO";
		}
		if (!(this.validations.type_file('nuevo_foto_persona',['image/jpeg']))){
			this.dom.mostrar_error_campo('nuevo_foto_persona','nuevo_foto_persona_type_file_KO');
			return "nuevo_foto_persona_type_file_KO";
		}
		if (!(this.validations.format_name_file('nuevo_foto_persona','[a-zA-Z.]'))){
			this.dom.mostrar_error_campo('nuevo_foto_persona','nuevo_foto_persona_format_name_file_KO');
			return "nuevo_foto_persona_format_name_file_KO";
		}
		this.dom.mostrar_exito_campo('nuevo_foto_persona');
		return true;


	}

	/**
		
		@param 
		@return
			{bool} true if all field validations are correct or false if any field validation is false

	*/
	ADD_submit_persona(){

		let result = (
					(this.ADD_dni_validation()) &
					(this.ADD_nombre_persona_validation())
					(this.ADD_nuevo_foto_persona_validation())
					)
		
		result = Boolean(result);
		
		return result;	


	}

	EDIT_nombre_persona_validation(){

		return this.ADD_nombre_persona_validation();

	}

	EDIT_nuevo_foto_persona_validation(){

		if (!(this.validations.not_exist_file('nuevo_foto_persona'))){
			this.dom.mostrar_exito_campo('nuevo_foto_persona');
			return true;
		}
		if (!(this.validations.max_size_file('nuevo_foto_persona',2000))){
			this.dom.mostrar_error_campo('nuevo_foto_persona','nuevo_foto_persona_max_size_file_KO');
			return "nuevo_foto_persona_max_size_file_KO";
		}
		if (!(this.validations.type_file('nuevo_foto_persona',['image/jpeg']))){
			this.dom.mostrar_error_campo('nuevo_foto_persona','nuevo_foto_persona_type_file_KO');
			return "nuevo_foto_persona_type_file_KO";
		}
		if (!(this.validations.format_name_file('nuevo_foto_persona','[a-zA-Z.]'))){
			this.dom.mostrar_error_campo('nuevo_foto_persona','nuevo_foto_persona_format_name_file_KO');
			return "nuevo_foto_persona_format_name_file_KO";
		}
		this.dom.mostrar_exito_campo('nuevo_foto_persona');
		return true;


	}

	/**
	 * 
	 * test dni format in the regular expression
	 * @param {string} 
	 * @return {bool} true is regular expression is satified false otherwise  
	 * */ 

	personalize_dni_nie(){
		
		dni = document.getElementById('dni').value;
		if (this.personalize_dni_format() == true){
			if (!(this.personalize_validate_dni(dni))){
				return "dni_validate_KO";
			}
		}
		else{
			if (this.personalize_nie_format() === true){
					if (!(this.personalize_validate_nie(dni))){
						return "nie_validate_KO";
					}
			}
			else{
				return "dni_nie_format_KO";
			}
		}

		return true;

	}
	/**
	 * get dni as parameter, split letter and numbers, calculate
	 * %23 from number to obtain corresponding letter and compares with letter in dni value
	 * 
	 * @param dni value
	 * @returns true if dni is valid false otherwise
	 */
	personalize_dni_format(){
		
		if (!(this.validations.format('dni', '[0-9]{8}[A-Z]'))){
			this.dom.mostrar_error_campo('dni','dni_format_KO');
			return "dni_format_KO";
		}
		return true;

	}

	personalize_nie_format(){
		if (!(this.validations.format('dni', '[XYZ][0-9]{7}[A-Z]'))){
			this.dom.mostrar_error_campo('dni','nie_format_KO');
			return "nie_format_KO";
		}
		return true;
	}
	personalize_validate_dni(dni){
		
		//var dni = document.getElementById('dni').value;
		var dni_letters = "TRWAGMYFPDXBNJZSQVHLCKE";
    	var letter = dni_letters.charAt( parseInt( dni, 10 ) % 23 );
		
    	return letter == dni.charAt(8);
	}

	/**
	 * get nie as parameter, split firts letter, calculate
	 * the number from this letter and create dni for validating in 
	 * personalizate method
	 * 
	 * @param nie value
	 * @returns true if nie is valid false otherwise
	 */
	personalize_validate_nie(nie){
		
		//var nie = document.getElementById('dni').value;
		// Change the initial letter for the corresponding number and validate as DNI
		var nie_prefix = nie.charAt( 0 );

		switch (nie_prefix) {
		case 'X': nie_prefix = 0; break;
		case 'Y': nie_prefix = 1; break;
		case 'Z': nie_prefix = 2; break;
		}

		return this.personalize_validate_dni( nie_prefix + nie.substr(1) );
	
	}

	createForm_EDIT(fila){

		alert('crear formulario EDIT '+fila.dni);
	}

	createForm_DELETE(){
		alert('crear formulario DELETE');
	}

	createForm_SHOWCURRENT(){
		alert('crear formulario DETALLE');
	}

	createForm_ADD(){
		alert('crear formulario ADD');
	}

	createForm_SEARCH(){
		alert('crear formulario SEARCH');
	}


// candidatas dom


	/**
	 * Recibe la información a mostrar en columnas y el array de columnas a las cuales se modificara su contenido para mostrarsele al usuario
	 * Se le incluyen tres columnas mas a cada fila para poder tener un icono con la accion a realizar para esa fila y se le coloca un evento onclick
	 * para poder llamar a los metodos createForm_accion pasando como parametros de esos metodos la información de la fila de datos
	 * 
	 * @param {Objeto} datos 
	 * @param {Array} mostrarespecial 
	 */
	crearTablaDatos(datos, mostrarespecial){
		
		var misdatos = datos;
		/*
		recorrer todas las filas de datos y cada atributo para si tiene una funcion de transformación de valor modificarlo en el momento
		*/
		if (mostrarespecial > 0){
			for (var i=0;i<misdatos.length;i++){
				for (var clave in misdatos[i]){
						if (clave in mostrarespecial){
							//misdatos[i][clave] = this.cambiarmostrarespecial(clave, misdatos[i][clave]);
						}
				}
			}
		}
		// proceso los datos de la tabla para incluir en cada fila los tres botones conectados a createForm_ACCION()
		for (var i=0;i<misdatos.length;i++){
			
			var linedit = `<img id='botonEDIT' src='./iconos/EDIT.png' onclick='entidad.createForm_EDIT(`+JSON.stringify(misdatos[i])+`);'>`;
			var lindelete = `<img id='botonDELETE' src='./iconos/DELETE.png' onclick='entidad.createForm_DELETE(`+JSON.stringify(misdatos[i])+`);'>`;
			var linshowcurrent = `<img id='botonSHOWCURRENT' src='./iconos/SHOWCURRENT.png' onclick='entidad.createForm_SHOWCURRENT(`+JSON.stringify(misdatos[i])+`);'>`;
			misdatos[i]['EDIT'] = linedit;
			misdatos[i]['DELETE'] = lindelete;
			misdatos[i]['SHOWCURRENT'] = linshowcurrent;

		}
		
		//muestro datos en tabla
		this.dom.showData('IU_manage_table', misdatos);
		this.mostrarocultarcolumnas();
		this.crearSeleccionablecolumnas(this.columnasamostrar, this.atributos);
		

	}



	/**
	 * Redibuja el select en funcion del contenido de columnasamostrar
	 * 
	 * @param {*} columnasamostrar 
	 * @param {*} atributos 
	 */
	crearSeleccionablecolumnas(columnasamostrar,atributos){

		document.getElementById("seleccioncolumnas").innerHTML = '';
		
		for (let atributo of atributos){

			var optionselect = document.createElement('option');
			optionselect.className = atributo;
			optionselect.innerHTML = atributo;
			var textofuncion = "entidad.modificarcolumnasamostrar('"+atributo+"');";
			optionselect.setAttribute("onclick",textofuncion);
			if (columnasamostrar.includes(atributo)){
				optionselect.selected = true;
			}
			document.getElementById("seleccioncolumnas").append(optionselect);
		}
		//setLang();

	}

// candidatas abstract

	/**
	 * muestra o no las columnas de la tabla segun indique columnasamostrar
	 */
	mostrarocultarcolumnas(){

		var estadodisplay = '';
		// recorro todos los atributos de la tabla
		for (let columna of this.atributos){
			// si el atributo esta en columnas a mostrar 
			// lo dejo como esta
			if (this.columnasamostrar.includes(columna)){
				estadodisplay = '';
			}
			// si el atributo no esta en columnas a mostrar lo oculto
			else{
				estadodisplay = 'none';
			}
			document.querySelector("th[class='tabla-th-"+columna+"']").style.display = estadodisplay;
			let arraytds = document.querySelectorAll("td[class='tabla-td-"+columna+"']");
			for (let i=0;i<arraytds.length;i++){
				arraytds[i].style.display = estadodisplay;
			}
		}


	}

	/**
	 * Modifica el array de columnas a mostrar al hacer click sobre el atributo en el select poniendolo como oculto o como visible
	 * @param {string} atributo 
	 */
	modificarcolumnasamostrar(atributo){

		if (this.columnasamostrar.includes(atributo)){
			// borrar ese atributo
			this.columnasamostrar = this.columnasamostrar.filter(columna => columna != atributo);
		}
		else{
			// añadir
			this.columnasamostrar.push(atributo);
		}
		
		this.mostrarocultarcolumnas();
		this.crearSeleccionablecolumnas(this.columnasamostrar, this.atributos);

	}

	/**
	 * el método realiza una petición de search al back pudiendo enviar un formulario con datos, enviando 
	 * el nombre de la entidad del back y la acción a realizar sobre la misma.
	 * los datos respondidos se usan para indicar o bien que no hay datos o mostrandolos en una tabla.
	 */
	async SEARCH(){
    
        await this.access_functions.peticionBackGeneral('form_iu', this.nombreentidad, 'SEARCH')
        .then((respuesta) => {
            
            //limpiar el formulario
			document.getElementById('IU_form').innerHTML = this.manual_form_creation();

            if (respuesta['code'] == 'RECORDSET_DATOS'){
				this.datos = respuesta['resource'];
				this.atributos = Object.keys(this.datos[0]);
				//crear la tabla de datos de la entidad del back
            	this.crearTablaDatos(this.datos, this.mostrarespecial);
				//rellenar el select de columnas a mostrar
				//this.crearSeleccionablecolumnas(this.columnasamostrar, this.atributos);
				//this.mostrarocultarcolumnas();
            }
            else{
				document.getElementById("IU_manage_table").style.display = 'block';
				document.getElementById('IU_manage_table').innerHTML = 'No se han encontrado elementos que coincidan con la búsqueda';
                document.getElementById('IU_manage_table').className = 'RECORDSET_VACIO';
            }

			//setLang();

        });
    
    }

	
}


