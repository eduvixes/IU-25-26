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

Implementación de la estructura de interfaz para la gestion de información de entidad en el index en un div en el cual se puede invocar ADD, EDIT, DELETE, SEARCH y SHOWCURRENT. Se incluye un boton add y un boton search, cada uno con su icono correspondiente y se le coloca un evento onclick para que se invoque al método createForm_ADD y createForm_SEARCH respectivamente para crear los formularios de add y search. Se muestra la tabla de las tuplas de la entidad y para cada tupla se incorpora un boton de edit, delete y showcurrent que invoca el createForm_accion correspondiente.
Cuando se instancia la clase se inicializa una propiedad con el nombre de la entidad, otro con las columnas visibles y otro con los atributos cuyo valor pueden tener que ser modificados para presentarlo al usuario.
Si la entidad no se instancia para test entonces se realiza una petición de SEARCH al back.
El método de SEARCH invoca un metodo de acceso a back que tiene una promesa, por eso se coloca una indicación de asíncrono y se espera su finalización con un await. La petición a back recibe como parametros un id de formulario (si no viene un id de formulario no se mandan datos de búsqueda), la entidad a la que se accede en el back, la acción que se quiere realizar en el back y si es necesario un array con datos extra a enviar. El metodo peticionBackGeneral() primero crea una variable de tipo FormData para poder enviar al back la información. La rellena con los datos del formulario si se le da un formulario válido, los datos de entidad y de accion y de datos extra si se le proporcionan. Después realiza una petición ajax contra una url, con un método http POST y unos datos. Si hay un error (al hacer la petición) lo muestra en un alert y si no lo hay lo devuelve y es procesado en el .then del método SEARCH.

``` js

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

```

``` js

peticionBackGeneral(formulario, controlador, action, datosextra=null){

        var datos;
        
        if (formulario === ''){
            datos = new FormData();
        }
        else{
            var formulario = document.getElementById(formulario);
            datos = new FormData(formulario);
        }
    
        datos.append('controlador', controlador);
        datos.append('action', action);
    
        if (datosextra==null){}
        else{
            for(var clave in datosextra){
                datos.append(clave, datosextra[clave]);
            }
        }
        
        return new Promise(function(resolve) { 
            $.ajax({
                type :"POST",
                url : "http://193.147.87.202/ET2/index.php",
                data : datos,
                processData : false,
                contentType : false,
            })
            .done(res => {
                resolve(res);
            })
            .fail(res => {
                alert('error : '+res.status);
            })
    
        });
    
    }

```

Se incluye en el index.html en el div donde están los botones de add y searcgh un select que será rellenado con los atributos de la tabla para poder elegir que columnas se muestran o se ocultan de la tabla. Para ello se crea una propiedad de la entidad (columnasamostrar) que tiene el array de atributos cuyas columnas en la tabla de muestra de datos se muestran por defecto. 

Relacionado con el select se crea un método crearSeleccionablecolumnas(columnasamostrar,atributos), el cual a partir de todos los atributos de la entidad y los indicados en la propiedad columnas a mostrar construye los options del select y pone seleccionados los que estan visibles. A todos los options les coloca un onclick que permite cambiar su estado de visible a no visible y viceversa. Lo hace invocando un método modificarcolumnasamostrar(atributo).

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
```

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
```

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
```

Las peticiones al back siempre nos traeran la respuesta mediante un array de tres elementos principales que son:

ok: (true/false) indica si la operación solicita en el back encontró un error o no

code: devuelve un código de error o exito de la operación

resource: en el caso de una acción SEARCH devuelve un array asociativo con las filas de tuplas que coincidan con la búsqueda y cada fila es un array asociativo con los valores de los atributos de la entidad. También se devuelve el número total de filas que coinciden con la búsqueda, la fila en la que empiezan los resultados del total de la búsqueda y cuantas filas se envian en el resource del total del resultado de la búsqueda. En caso de error de SQL en resource se envia el sql que ha dado el error.

En el caso de que la respuesta del search traiga un code 'RECORDSET_DATOS' significa que se envian tuplas desde el back y se llama al método crearTablaDatos() para construir el objeto de datos que posteriormente se enviará al método de mostrar esos datos en una tabla en el navegador. Como parametros se envian los datos a mostrar y la propiedad que indica que datos de la tabla se modificarán en la tabla de muestra al usuario (esto se implementará la semana que viene).

``` js

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
		for (var i=0;i<misdatos.length;i++){
			for (var clave in misdatos[i]){
					if (clave in mostrarespecial){
						//misdatos[i][clave] = this.cambiarmostrarespecial(clave, misdatos[i][clave]);
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

```

Creación de los datos para la tabla de SHOWALL a partir de consulta da la bd, incluyendo los datos de la fila para los EDIT, DELETE y SHOWCURRENT
Creación de oculte muestra de atributos en la tabla de SHOWALL




