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
								case 'text':
									document.getElementById(campos[i].id).value = parametros[campos[i].id];
									break;
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
									break;
							}
						
						break;
					case 'TEXTAREA':
						document.getElementById(campos[i].id).innerHTML = parametros[campos[i].id];
						break;
					case 'SELECT':
						this.rellenarvalorselect(campos[i].id, parametros[campos[i].id]);
						break;
					case 'RADIO':
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
	 * 	en el caso de un checkbox es una elección que puede ser multiple pero tambien tienen todos el mismo name (en cuyo caso se utiliza un tipo array 
	 * para su envio pero no para su uso en el front para la validación)
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
					evento = 'onchange';
				}
				

				if (document.getElementById(campos[i].id).type == 'submit'){}
				else{
					document.getElementById(campos[i].id).setAttribute (evento,'entidad.'+accion+'_'+campos[i].id+'_validation'+'();');
				}
			}
					        
		}
	}


	/**
	 * recorre todos los elementos del formulario colocandolos a readonly
	 * UPDATE: identificar el tipo de elemento porque no todos se desactivan con readonly y tenemos que usar un metodo que los mande al back
	 * @param {String} idform id del formulario
	 */
	colocartodosreadonly(idform){
		let campos = document.forms[idform].elements;
        //recorrer todos los campos
        for (let i=0;i<campos.length;i++) {
			document.getElementById(campos[i].id).setAttribute('readonly',true);
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
		//setLang();

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
	 * 
	 * @param {String} name 
	 * @param {String} valor 
	 */
	rellenarvalorcheckbox(name,valor){
		var elementoscheckbox = document.getElementsByName(name);
		for (var i=0;i<elementoscheckbox.length;i++){
			if (elementoscheckbox[i].value == valor){
				elementoscheckbox[i].checked = true;
			}
		}
	}

	/**
	 * 
	 * @param {String} name 
	 * @param {String} valor 
	 */
	rellenarvalorradio(name,valor){
		var elementosradio = document.getElementsByName(name);
		for (var i=0;i<elementosradio.length;i++){
			if (elementosradio[i].value == valor){
				elementosradio[i].checked = true;
			}
		}
	}

}



