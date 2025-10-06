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

Se modifica el index.html para incluir una tabla de muestra de filas de la entidad en el back junto con los botones de add, search y para cada fila edit, delete y showcurrent. 

Se incorpora tambien un seleccionable para elegir que columnas quieren que se muestren en la tabla, pudiendo poner visibles o invisibles en función de la elección en el seleccionable.

Se introduce un div para poder colocar el nombre de la entidad a gestionar con el id text_title_page

``` html

<body>

	<header id='header_page' class='bordeado'>texto titulo aplicación</header>
	<nav class='bordeado'><span onclick="menu_work();">Opciones de ménu</span>
	</nav>
	<aside id='div-menu'>
		<ol>
		    <li class="opcionmenu"><span onclick="entidad = new persona();">Gestionar persona</span></li>
		    <li class="opcionmenu"><span onclick="entidad = new entidad();">Gestionar otra entidad</span></li>
	  	</ol>
	</aside>
	<section id="IU_manage_entity">
		<section id="IU_manage_head">
			<div id='title_page' class='bordeado'><span id = "text_title_page" class="">titulo de pagina de entidad</span>
			</div>
			<div id="add_search_columns">
        		<img id="botonADD" src="./iconos/ADD.png" onclick="entidad.createForm_ADD();" />
        		<img id="botonSEARCH" src="./iconos/SEARCH.png" onclick="entidad.createForm_SEARCH();"/>
				
				<label id="label_seleccioncolumnas">Columnas</label>
				<select id="seleccioncolumnas" multiple>
				</select>
				
        	</div>
		</section>

		<section id="IU_manage_table">

		</section>

	</section>
	<section id="IU_form" class='bordeado'>
		
	</section>

	<article class='bordeado'>Sección article</article>

	<footer class='bordeado'>Pie de página</footer>


```

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
		if (mostrarespecial.length > 0){
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

```
En el método crearTablaDatos primero se recorren todas las filas y dentro de las filas todos los atributos para comprobar si alguno de ellos esta en la propiedad mostrarespecial. Si es asi, (se implementara mas adelante) se invoca un método de la clase que tendrá el nombre cambiarmostrarespecial() al cual se le pasan dos parametros (el atributo y el valor del atributo). Este método devolverá el valor modificado para su muestra en la tabla de datos.

A continuación, se recorren todas las filas para incluir al final de las mismas tres elementos mas correspondientes a la información que quiere que se muestre al final de cada fila en la tabla sobre las acciones a realizar para esa fila. Para cada acción se incluye una imagen (img ) con lo siguiente:

un id correspondiente a boton+ACCION

un src correspondiente a un icono de la accion

un evento onclick que invoca el metodo createForm_ACCION en donde se pasan los valores de las columnas de esa fila. Como estamos construyendo un string no podemos concatenar el objeto y por lo tanto serializamos el objeto para convertirlo en un string y poder concatenarlo en el evento.

Se han construido los métodos createForm_ACCION	para verificar que se llega a los mismos y en el caso de las acciones de fila se invoca una propiedad de la fila (se muestra el dni) para verificar que tenemos el objeto de información de los atributos de fila.

## Semana 4 ##

Esta semana se van a crear los formularios para cada accion a realizar. El código de la semana pasada dejaba una tabla con las tuplas de la entidad resultado de un SEARCH. Para cada tupla existe un icono que al hacer click sobre el llama al método createForm_accion correspondiente pasandole la fila de datos a la cual pertenece. 

También crea un icono para las acciones de ADD y SEARCH que llaman a sus métodos correspondientes de createForm_accion pero sin datos como parámetros.

``` js

	createForm_EDIT(fila){

		// limpiar y poner visible el formulario
		document.getElementById('contenedor_IU_form').innerHTML = this.manual_form_creation();
		this.dom.show_element('Div_IU_form','block');

		// rellenar onsubmit y action
		this.dom.assign_property_value('form_iu','onsubmit','return entidad.EDIT_submit_'+this.nombreentidad);
		this.dom.assign_property_value('form_iu', 'action', 'javascript:entidad.EDIT();');

		//activar el link al fichero
		this.dom.assign_property_value('link_foto_persona', 'href', 'http://193.147.87.202/ET2/filesuploaded/files_foto_persona/'+fila.foto_persona);
		
		// modificar presentacion (en este caso concreto para fecha)
		fila.fechaNacimiento_persona = this.cambiarformatoFecha(fila.fechaNacimiento_persona);

		// rellenar valores
		this.rellenarvaloresform(fila);
		
		// poner las validaciones
		this.colocarvalidaciones('EDIT');

		// poner inactivos los campos correspondientes
		this.dom.assign_property_value('dni','readonly','true');
		this.dom.assign_property_value('foto_persona','readonly','true');

		// colocar boton de submit
		this.colocarboton('EDIT');

	}

```

Proceso general y aplicado al EDIT

limpiar
(se ha dejado canonico y quitado el boton de submit)

atributos del submit

poner/quitar/modificar elementos del form

modificar valores de presentacion si es necesario

rellenar valores

colocar validaciones

poner inactivos

poner boton de submit



Se han creado metodos de dom para poder modificar el dom y abstraer de la clase

ver los métodos



