class dom_table {

	constructor(){
		
	}

	/**
	 * Recibe datos en un objeto con clave asociativa lo recorre para construir las columnas de la fila
	 * recibe un parametro tag para saber si utilizar un th o un td en el tr
	 * @param {object} datosfila
	 * @param {string} tag 
	 */
	construyefila(datosfila, tag){

		var trelement = document.createElement('tr');
		
		for (var i=0;i<datosfila.length;i++){
			var colelement = document.createElement(tag);
			colelement.style.border = '1px solid black';
			colelement.innerText = datosfila[i];
			trelement.append(colelement);
		}

		return trelement;
	}

	/**
	 * 
	 * @param {string} idcomponente id where the table is placed
	 * @param {object} datatoshow iterable object with object with associatives keys and data
	 * @param {object} marked [to implement] iterable object with information for changing the aspect of a column 
	 */

	showData(idcomponente, datatoshow, marked=null){
		
		document.getElementById(idcomponente).innerHTML = '';
		switch_display_mode(idcomponente,'block','on');
		
		var mitabla = document.createElement('table');
		mitabla.id = 'tablaresultadostest';

		document.getElementById(idcomponente).append(mitabla);
		
		var micabeceratabla = document.createElement('thead');
		//micabeceratabla.id = 'micabeceratabla';
		mitabla.append(micabeceratabla);
		
		var micuerpotabla = document.createElement('tbody');
		mitabla.append(micuerpotabla);
		
		/**
		 * Recibe datos en un objeto con clave asociativa lo recorre para construir las columnas de la fila
		 * recibe un parametro tag para saber si utilizar un th o un td en el tr
		 * @param {object} datosfila
		 * @param {string} tag 
		 */
		const filadatos = (datosfila,tag, marked) => {


			var trelement = document.createElement('tr');
			
			

			for (let clave in datosfila) {
				var colelement = document.createElement(tag);
				colelement.name = 'columna_'+clave;
				colelement.classList.add('tabla-'+tag+'-'+clave);
				
				if (tag == 'td'){
					colelement.innerHTML = datosfila[clave];
				}
				else{
					colelement.innerHTML = clave;
					colelement.classList.add(clave);
				}
				if (!(marked === null)){
					var marcados = Object.keys(marked);
					if (marcados.includes(clave)){
						if (marked[clave].value == datosfila[clave])
						{
							colelement.setAttribute('style',marked[clave].style);
						}
					}
				} 
				trelement.append(colelement); 
			};	

			return trelement;
			
		};

		const misdatos = (datos) => {
		
			// incluyo fila cabecera
			micabeceratabla.append(filadatos(datos[0], 'th', {}));
			
			// incluyo filas datos
			for (var i=0;i<datos.length;i++){
				micuerpotabla.append(filadatos(datos[i],'td', marked));
			}
			
		}

		misdatos(datatoshow);


	}

	/**
	 * Construye un boton de submit con el icono correspondiente 
	 * 
	 * @param {String} accion accion a realizar
	 */
	colocarboton(accion){

		let divboton = document.createElement('div');
		divboton.id = 'div_boton';
		//divboton.stype.display = 'block';
		document.getElementById('form_iu').append(divboton);
		let boton = document.createElement('button');
		boton.id = 'submit_button';
		boton.type = 'submit';
		let img = document.createElement('img');
		img.src = './iconos/'+accion+'.png';
		boton.append(img);
		document.getElementById('div_boton').append(boton);

	}



	/**
	 * rellena cada elemento del formulario con el valor que viene en la fila
	 * 
	 * @param {Object} parametros el objeto con la información de la fila
	 * trae por cada atributo su id y su valor
	 */
	rellenarvaloresform(parametros){
		
		//obtener campos del formulario
        	let campos = document.forms['form_iu'].elements;
        	//recorrer todos los campos
        	for (let i=0;i<campos.length;i++) {
				switch (campos[i].tagName){
					case 'INPUT':
							switch (campos[i].type){
								case 'file':
									break;
								case 'submit':
									break;
								case 'checkbox':
									this.rellenarvalorcheckbox(campos[i].name, parametros[campos[i].name]);
									break;
								case 'radio':
									this.rellenarvalorradio(campos[i].name, parametros[campos[i].name]);
									break;
								default:
									document.getElementById(campos[i].id).value = parametros[campos[i].id];
									break;
							}
						
						break;
					case 'TEXTAREA':
						document.getElementById(campos[i].id).innerHTML = parametros[campos[i].id];
						break;
					case 'SELECT':
						this.rellenarvalorselect(campos[i].id, parametros[campos[i].id]);
						break;
					default:
						break;
				}
        	}
	}

	/**
	 * Coloca en el formulario para cada elemento de entrada (con id unico) un evento (dependiente
	 * del tipo de elemento) al cual enlaza la validacion de ese campo para la accion
	 * que se le indica
	 * 
	 * el id único no tiene significación en los elementos de formulario de tipo elección como checkbox y radio
	 * Esto es debido a que 
	 * 	en el caso de un radio es una elección excluyente (un único valor) de entre varios valores y todos tienen el mismo name
	 * 	en el caso de un checkbox es una elección que puede ser multiple pero tambien tienen todos el mismo name 
	 * 
	 * En el caso de elementos del form que no tiene id se asume que son checkbox o radio y se coloca la validación de los mismos en cada
	 * uno de los elementos con un evento onchange.
	 * 
	 * @param {String} accion  accion a realizar en el formulario
	 */
	colocarvalidaciones(idform, accion){
		
		let evento;
		//obtener campos del formulario
        let campos = document.forms[idform].elements;
        	//recorrer todos los campos
        for (let i=0;i<campos.length;i++) {
			if (campos[i].id !== ''){
				if ((document.getElementById(campos[i].id).tagName == 'INPUT') && 
					(document.getElementById(campos[i].id).type !== 'file')){
							evento = 'onblur';
				}
				else{
					evento = 'onChange';
				}
				

				if (document.getElementById(campos[i].id).type == 'submit'){}
				else{
					document.getElementById(campos[i].id).setAttribute (evento,'entidad.'+accion+'_'+campos[i].id+'_validation'+'();');
				}
			}
			else{
				evento = 'onChange';
				campos[i].setAttribute(evento,'entidad.'+accion+'_'+campos[i].name+'_validation'+'();')
			}
					        
		}
	}


	/**
	 * recorre todos los elementos del formulario colocandolos a readonly
	 * 
	 * Si es un select se identifica el elemento option seleccionado y se borran todos los demas elementos option
	 * @param {String} idform id del formulario
	 */
	colocartodosreadonly(idform){
		
		this.dejarsoloenumchecked(this.getNameCheck(idform,'checkbox'));
		this.dejarsoloenumchecked(this.getNameCheck(idform,'radio'));

		let campos = document.forms[idform].elements;

        //recorrer todos los campos
        for (let i=0;i<campos.length;i++) {
			
			if (campos[i].id !== ''){

				if (campos[i].tagName !== 'SELECT'){
					document.getElementById(campos[i].id).setAttribute('readonly',true);
				}
				else{
					this.replaceSelectXReadOnlyText(campos[i]);
				}
			}
			else{
				if (campos[i].checked == true){
					this.replaceEnumCheckedXReadOnlyText(campos[i]);
					
				}
				else{
					this.deleteEnumItem(campos[i]);
				}
			}
		}
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
		setLang();

	}

	/**
	 * DEBUG: ESTA TAMBIEN EN LA CLASE TEST, DEBERIA ESTAR EN UNA CLASE EXTERIOR A LAS DOS Y POSIBLEMENTE INVOCADO ESTATICAMENTE.
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
            opciones.selectedIndex = opciones.length;
        }

    }

	/**
	 * le llega un nombre de variable checkbox y asigna checked a true al elemento que tenga el valor del segundo parametro
	 * @param {String} name valor de la propiedad name del elemento checkbox
	 * @param {String} valor valor con el que asignar el checked true al elemento que lo contenga
	 */
	rellenarvalorcheckbox(name,valor){
		var elementoscheckbox = document.getElementsByName(name);
		for (var i=0;i<elementoscheckbox.length;i++){
			if (elementoscheckbox[i].value == valor){
				elementoscheckbox[i].checked = true;
			}
			else{
				elementoscheckbox[i].checked = false;
			}
		}
	}

	/**
	 * le llega un nombre de variable radio y asigna checked a true al elemento que tenga el valor del segundo parametro
	 * @param {String} name valor de la propiedad name del elemento radio
	 * @param {String} valor valor con el que asignar el checked true al elemento que lo contenga
	 */
	rellenarvalorradio(name,valor){
		var elementosradio = document.getElementsByName(name);
		for (var i=0;i<elementosradio.length;i++){
			if (elementosradio[i].value == valor){
				elementosradio[i].checked = true;
			}
		}
	}

	getNameCheck(idform, type){
		
		var checks = document.querySelectorAll("input[type='"+type+"']");
		var nombres = [];
		for (var i=0;i<checks.length;i++){
			if (nombres.includes(checks[i].name)){}
			else{
				nombres.push(checks[i].name);
			}
		}
		return nombres;
	}

	/**
	 * recibe un array de elemento checkbox o radio.
	 * Si el elemento no esta seleccionado borrar su label y despues a si mismo.
	 * 
	 * @param {Array} listachecks array de elementos checkbox o radio del formulario 
	 */
	dejarsoloenumchecked(listachecks){
		listachecks.forEach(element => {
			var itemsnamecheck = document.getElementsByName(element);
			var longitud = itemsnamecheck.length;
			for (var i=longitud-1; i>=0; i--){
				if (itemsnamecheck[i].checked !== true){	
					document.getElementById('label_'+itemsnamecheck[i].value).remove();
					itemsnamecheck[i].remove();
				}
			}

		}); 
	}

	/**
	 * Se recibe un elemento del formulario y se sustituye con un replaceWith por un input text readonly
	 * con el valor del elemento recibido para que ocupe el mismo sitio en el formulario
	 * se elimina tambien su label de valor del formulario
	 * 
	 * @param {Objet} itemenumerado el elemento checkbox o radio a colocar como un input text readonly
	 */
	replaceEnumCheckedXReadOnlyText(itemenumerado){
		var nuevoinput = document.createElement('input');
		nuevoinput.name = itemenumerado.name;
		nuevoinput.value = itemenumerado.value;
		nuevoinput.readOnly = true; 
		document.getElementById('label_'+itemenumerado.value).remove();
		itemenumerado.replaceWith(nuevoinput);
	}

	/**
	 * recibe un objeto de tipo checkbox o radio y lo elimina del formulario junto con su label
	 * @param {Object} itemenumerado elemento formulario de tipo checkbox o radio
	 */
	deleteEnumItem(itemenumerado){
		document.getElementById('label_'+campos[i].value).remove();
		campos[i].remove();
	}

	/**
	 * Recibe el nombre de un atributo, elimina todos sus valores excepto el primero y lo transforma en un input vacio 
	 * Se usa para el SEARCH
	 * @param {String} name del atributo enumerado que se quiere sustituir por un input text
	 */
	replaceEnumNameXEmptyInput(name){
		// todos los items del multiple con un nombre
		var itemsName = document.getElementsByName(name);

		// recorrer y borrar todos los item enum y sus labels excepto el primero por si hubiera
		for (var i=itemsName.length-1;i>0;i--){
			document.getElementById("label_"+itemsName[i].value).remove();
			itemsName[i].remove();
		}
		
		// crear input, colocar id y name
		var nuevoinput = document.createElement('input');
		nuevoinput.name = name;
		nuevoinput.id = name;

		// quitar el label del valor del enum y sustituir item de enum por input
		document.getElementById("label_"+itemsName[0].value).remove();
		itemsName[0].replaceWith(nuevoinput);

	}

	/**
	 * recibe el nombre de un elemento select, crea un input text con el mismo nombre e id y reemplaza el elemento select con el input
	 * text vacio
	 * se usa en el SEARCH
	 * @param {String} name Recibe el nombre (que coincide con el id) de un elemento select
	 */
	replaceSelectXEmptyInput(name){

		// crear input, colocar id y name
		var nuevoinput = document.createElement('input');
		nuevoinput.name = name;
		nuevoinput.id = name;

		// reemplazar el select por el input
		document.getElementById(name).replaceWith(nuevoinput);
	}

	/**
	 * Se recibe un elemento select del formulario y se sustituye con un replaceWith por un input text readonly
	 * con el valor elegido del select recibido para que ocupe el mismo sitio en el formulario
	 * 
	 * @param {Objet} opcionseleccionada el elemento select como un input text readonly
	 */
	replaceSelectXReadOnlyText(opcionseleccionada){

		// crear el input
		// crear input, colocar id y name
		var nuevoinput = document.createElement('input');
		nuevoinput.name = opcionseleccionada.name;
		nuevoinput.id = opcionseleccionada.id;
		nuevoinput.value = opcionseleccionada.value;
		nuevoinput.readOnly = true;

		// reemplazar el select por el input
		document.getElementById(opcionseleccionada.id).replaceWith(nuevoinput);
	}

	

}



