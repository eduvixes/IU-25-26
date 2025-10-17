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


}



