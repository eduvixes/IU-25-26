# Contenido #

## Semana 1 ##

* practica1.html 

html con un elemento de lista ordenada lo,

donde cada elemento de lista li contine un elemento a con atributo href de hiperenlace llamando a otro fichero html y como contenido del elemento a se encuentra un string.

* practica1-1.html

html con el mismo contenido que el fichero practica1.html. Se ha incorporado ademas un elemento form con sus atributos
action
method 
enctype

y una lista de elementos de formulario:

label
input (type: text, number, email, date)
input (type: file)
fielset
legend
input (type: submit)

practica1-2.html

Colocación de html semantico


practica1-3.html

Colocacion de estilos y acciones de eventos





## Semana 2 ##

Creación de una clase para la gestion de la entidad persona
Creación de una clase para el manejo de elementos del dom
Creacion de una clase para realizar las validaciones de mas bajo nivel
Creacion de un fichero de css


## Semana 3 ##

Creación de una clase para hacer test de unidad de una entidad
Creación de una clase para hacer test de valores de formulario de una clase

## Semana 4 ##

Implementación de la estructura de interfaz para la gestion de información de entidad en el index en un div en el cual se puede invocar ADD, EDIT, DELETE, SEARCH y SHOWCURRENT. Se incluye un boton add y un boton search, cada uno con su icono correspondiente y se le coloca un evento onclick para que se invoque al método createForm_ADD y createForm_SEARCH respectivamente para crear los formularios de add y search. Se incluye tambien un select que será rellenado con los atributos de la tabla para poder elegir que columnas se muestran o se ocultan de la tabla. Para ello se crea una propiedad de la entidad (columnasamostrar) que tiene el array de atributos cuyas columnas en la tabla de muestra de datos se muestran por defecto. 

Se crea un método crearSeleccionablecolumnas(columnasamostrar,atributos), el cual a partir de todos los atributos de la entidad y los indicados en la propiedad columnas a mostrar construye los options del select y pone seleccionados los que estan visibles. A todos los options les coloca un onclick que permite cambiar su estado de visible a no visible y viceversa. Lo hace invocando un método modificarcolumnasamostrar(atributo).

``` js

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

El método modificarcolumasamostar lo que hace es modificar la propiedad columnas a mostrar incluyendo o excluyendo de la misma el atributo proporcionado. Si el atributo ya estaba en la propiedad es que era visible y se elimina pues de la propiedad. Si no estaba significa que no era visible y se incluye para que lo sea ahora.

``` js

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

El método mostrarocultarcolumnas() busca los elementos de la columna de un atributo a través de un class que se le coloca cuando se crea la tabla, que tiene la forma tabla-(tr/td)-atributo. Selecciona los elementos de la columna que son th y que son td para ocultarlo modificando su propiedad style.display.

```js

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


Creación de los datos para la tabla de SHOWALL a partir de consulta da la bd, incluyendo los datos de la fila para los EDIT, DELETE y SHOWCURRENT
Creación de oculte muestra de atributos en la tabla de SHOWALL




