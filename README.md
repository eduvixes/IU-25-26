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

## Semana 5 ##

Esta semana se van a crear los formularios para cada accion a realizar. El código de la semana pasada dejaba una tabla con las tuplas de la entidad resultado de un SEARCH. Para cada tupla existe un icono que al hacer click sobre el llama al método createForm_accion correspondiente pasandole la fila de datos a la cual pertenece. 

También crea un icono para las acciones de ADD y SEARCH que llaman a sus métodos correspondientes de createForm_accion pero sin datos como parámetros.

Se ha modificado el método manual_form_creation(), para que sea una representación simplificada y sin parámetros del formulario que queremos crear acerca de la entidad. Este formulario servirá para poder añadir todos los atributos en particular. En el mismo se ha eliminado el boton de submit para sustituirlo por una imagen acorde a la acción.

``` js

/**
	 * replace the content of section element with a particular entity menu
	 * @returns 
	 */
	manual_form_creation(){
		var form_content = `
			<form id = 'form_iu' action="" method="POST" enctype="multipart/form-data" onsubmit="" class='formulario'>

				<label class="label_dni">dni</label>
				<input type='text' id='dni' name='dni'></input>
				<span id="span_error_dni"><a id="error_dni"></a></span>
				<br>
				
				<label class="label_nombre_persona">Nombre de pila</label>
				<input type='text' id='nombre_persona' name='nombre_persona' ></input>
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

			</form>
		`;
		return form_content;
		
	}


```

El Create Form Edit recibe como parámetro la fila de datos correspondiente a la dupla, en la cual hacemos la acción de editar. 

Lo primero que hacemos en este método, es poner la versión limpia del formulario de la entidad en su div correspondiente y ponerlo visible. 

A continuación, rellenamos los atributos action y onsubmit. Para no tener que estar accediendo al documento en la entidad, he creado un método (assign_property_value()). En él, indicándole el elemento HTML, la propiedad y el valor se le asigna fuera de la clase entidad con este método.

Después, dado que es una acción Edit, y por lo tanto lleva tanto el elemento HTML de foto_persona como el elemento HTML de nuevo_foto_persona, tenemos que asignar un valor de hiperenlace al elemento HTML, que representa el link al fichero de foto_persona. Para ello, construimos el hiperenlace que tiene la base de la URL (http://193.147.87.202/ET2/filesuploaded/files_foto_persona/) y le concatenamos el contenido de foto_persona que viene en la fila de la tupla y con lo cual hemos creado un hiperenlace al fichero asociado a esta dupla.

Después de ello modificamos la presentación de fechaNacimiento_persona. El atributo fechaNacimiento_persona viene de la base de datos en formato año-mes-día separado por guiones y queremos mostrarlo como día/mes/año separado por barras. Por eso antes de introducirlo en el formulario modificamos el objeto fila en su propiedad fechaNacimiento_persona por su valor cambiado de formato para hecho. Para eso se ha hecho un método (cambiarformatoFecha()) que estará en la propia clase, porque es dependiente de la entidad.




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

A continuación vamos a rellenar los elementos del formulario que permiten recoger información en cada uno de ellos. Le asignaremos el valor que tiene el atributo en la dupla a su correspondiente elemento HTML de introducción de información, en vez de poner los todos los valores de los elementos del formulario en el método createForm_EDIT, hemos creado un método (rellenarvaloresform()) que recorre todos los elementos del formulario que recogen valores y dependiendo de su Tag y de su tipo, introduce su valor dentro del elemento.

``` js
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
				switch (document.getElementById(campos[i].id).type){
					case 'file':
						break;
					case 'submit':
						break;
					case 'textarea':
						document.getElementById(campos[i].id).innerHTML = parametros[campos[i].id];
					default:
						document.getElementById(campos[i].id).value = parametros[campos[i].id];
				}
        	}
	}

```

A continuación, colocamos las validaciones correspondientes al Edit. Para ello también hemos creado un método (colocarvalidaciones()) que recorre todos los elementos que tiene el formulario. Dependiendo de su Tag le asigna un evento u otro y asocia al evento la función de validación de ese atributo para esa acción.

``` js
/**
	 * Coloca en el formulario para cada elemento de entrada un evento (dependiente
	 * del tipo de elemento) al cual enlaza la validacion de ese campo para la accion
	 * que se le indica
	 * 
	 * @param {String} accion  accion a realizar en el formulario
	 */
	colocarvalidaciones(idform, accion){
		
		let evento;
		//obtener campos del formulario
        	let campos = document.forms[idform].elements;
        	//recorrer todos los campos
        	for (let i=0;i<campos.length;i++) {
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

``` 

Después tenemos que colocar los elementos que no son editables en el formulario para la acción que estamos tratando. En este caso como es un Edit la clave primaria no puede modificarse por el usuario y además como tenemos un campo fichero el nombre del campo en el input text contiene el nombre del campo que está almacenando en la tupla tampoco es modificable. Si el usuario quiere modificar el fichero tiene que subir un fichero nuevo por eso se ponen las propiedades readonly a true en ambos campos.

A continuación colocamos el boton de submit con la imagen adecuada para la acción del formulario. Para ello creamos un metodo (colocarboton()) que crea un botón, se coloca una imagen, y se pone de tipo submit.

``` js

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


```


delete y showcurrent

``` js
	/**
	 * 
	 * @param {String} idform id del formulario en donde se van a colocar todos sus elementos a readlonly true
	 */
	colocartodosreadonly(idform){
		let campos = document.forms[idform].elements;
        //recorrer todos los campos
        for (let i=0;i<campos.length;i++) {
			document.getElementById(campos[i].id).setAttribute('readonly',true);
		}
	}

```


Se han creado metodos de dom para poder modificar el dom y abstraer de la clase

ver los métodos



