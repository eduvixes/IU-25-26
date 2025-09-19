class dom_table {

	constructor(){
		
	}

	show_element(id){
		document.getElementById(id).style.display = 'block';
	}

	mostrar_error_campo(id, codigoerror){
		document.getElementById('span_error_'+id).style.display = 'inline';
		document.getElementById('error_'+id).innerHTML = codigoerror;
		document.getElementById(id).style.borderBlockColor = 'red';
		document.getElementById('submit_button').focus();
	}

	mostrar_exito_campo(id){
		document.getElementById('span_error_'+id).style.display = 'none';
		document.getElementById('error_'+id).innerHTML = '';
		document.getElementById(id).style.borderBlockColor = 'green';
	}

	fillform(formdata, idform){
		document.getElementById(idform).innerHTML = formdata;
		document.getElementById(idform).style.display = 'block';
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
			colelement.innerText = datosfila[i];
			trelement.append(colelement);
		}

		return trelement;
	}

	/**
	 * 
	 * @param {string} idcomponente id where the table is placed
	 * @param {object} test_result iterable object with object with associatives keys and data
	 * @param {*} datosbotones [to implement] iterable object with information for creating a column with a image, event and function invokation if is necessary
	 */

	showtestresult(idcomponente, test_result, datosbotones=null){
				
		switch_display_mode(idcomponente,'block','on');

		var mitabla = document.createElement('table');
		
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
		const filadatos = (datosfila,tag, datosbotones=null) => {

			var trelement = document.createElement('tr');
			
			for (let clave in datosfila) {
				var colelement = document.createElement(tag);
				colelement.innerHTML = datosfila[clave];
				trelement.append(colelement); 
			};	

			return trelement;
			
		};

		const misdatos = (datos) => {
		
			// obtengo los titulos
			var datostitulo = datos[0];
			var titulos = Object.keys(datostitulo);

			// incluyo fila cabecera
			micabeceratabla.append(filadatos(titulos, 'th'));
			
			// incluyo filas datos
			for (var i=0;i<datos.length;i++){
				micuerpotabla.append(filadatos(datos[i],'td'));
			}
			
		}

		misdatos(test_result);


	}


}

/**
 * if id and mode switch the state of display of html element(id) to 'none' or 'block'/'inline'
 * if 'on'/'off' force html element (id) to show or hide
 * 
 * 
 * @param {string} id  id of html element to show/hide
 * @param {string} mode 'block'/'inline'
 * @param {string} ponerestado 'on'/'off'
 */

function switch_display_mode(id,mode, ponerestado=null){

	if (ponerestado == 'on'){
		document.getElementById(id).style.display = mode;
	}
	else{
		if (ponerestado == 'off'){
		document.getElementById(id).style.display = 'none';
		}
		else{ 
			if (document.getElementById(id).style.display == 'none'){
				document.getElementById(id).style.display = mode;
			}
			else{
				document.getElementById(id).style.display = 'none';
			}
		}
	}
}

