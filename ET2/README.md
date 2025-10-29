# SEMANA 7: Implementación 

## Objetivo

Inclusión de los botones de test y modificación de las clases de test para su ejecución desde el index.html principal.
Modificación de la clase persona para adaptarla a la ejecución de los test y sacar métodos no exclusivos de la entidad y llevarlos a clases accesorias


## Inclusión de funcionalidad de test desde el index.html principal

Se quieren incluir dos botones para invocar el test de unidad y el test de datos. Intentaremos mantener el funcionamiento de las clases de test en lo posible.

Se incluyen las clases de test y el fichero de pruebas en el index.html principal.
Se incluye también los elementos div para la presentación de los test. No se han hecho modificaciones de css y se aplicaran en las dos clases de prácticas dedicadas a CSS

``` html
<!-- clases de test -->
	<script type="text/javascript" src="./Test/Unit/Unit_Test_Class.js"></script>
	<script type="text/javascript" src="./Test/Data/Data_Test_Class.js"></script>
	<!-- ficheros de testing-->
	<script type="text/javascript" src="./app/ET2_persona_infotest.js"></script>
```

```html
    <section id="Div_IU_Test" class='div_IU_form bordeado'>
		<div class = "contenidoForm" id="contenidoForm">
			
			<div id="contenedor_IU_Test">
				
			</div>
			<br>
			<img src="./iconos/BACK.png" onclick="entidad.dom.hide_element('Div_IU_Test');" />
		</div>
	</section>

	<section id="IU_Test_result" class='bordeado contenidoTest'>
	
		<section id="IU_Test_result_nofile" class="'bordeado ">

		</section>
		<section id="IU_Test_result_file" class="'bordeado">
			
		</section>
	</section>
```

Se incluyen los dos botones con su invocación correspondiente para las clases de test.
En la invocación del test de unidad le pasabamos el string del nombre de la clase y en el test de datos le pasabamos la clase como tal.

```html
<img id="botonTEST_UNIT" src="./iconos/TEST_UNIT.png" onclick="test = new Unit_Test(entidad.nombreentidad)"/>
<img id="botonTEST_DATA" src="./iconos/TEST.png" onclick="test = new Data_Test(eval(entidad.nombreentidad))"/>
```
## Sacar métodos no particulares de la clase persona

Se han trasladado los métodos que estaban indicados en la clase persona como candidatos a dom a la clase dom_table. Por lo tanto en persona se han tenido que modificar las llamadas a los mismos de this.nombremetodo a this.dom.nombremetodo. Esto se aprecia sobre todo en los métodos createForm cuando se invoca a colocarboton, rellenarvaloresform, colocarvalidaciones, colocartodosreadonly y crearSeleccionablecolumnas.

```js
        // rellenar valores
		this.dom.rellenarvaloresform(fila);
		
		// poner las validaciones
		this.dom.colocarvalidaciones('form_iu','EDIT');
```

Se ha creado una clase EntidadAbstracta para que contenga todos los métodos comunes a las entidades que se puedan necesitar y que las clases de estas entidades se extiendan de EntidadAbstracta. Al colocar los métodos comunes en ella no se modifica su invocación tal y como la teniamos pero si eliminamos complejidad y repeticiones en las clases de entidades dejando solo métodos que son especificos para esas clases.
Entre estos métodos están crearTablaDatos, mostrarocultarcolumnas, modificarcolumnasamostrar y todas las acciones contra back. 
Esto tiene una segunda ventaja y es que si se quiere hacer una personalización de los datos a mostrar se puede refactorizar el crearTablaDatos y crear e invocar su pintado en otro método personalizado en la clase entidad.

Tambien se ha incluido en EntidadAbstracta un método que aún no se ha utilizado pero si será util para la ET3 que es cargar_formulario. Este método se utilizará para crear rellenar en formulario en el div correspondiente. Primero comprueba si existe el método manual de crear formulario y si no existe llama a un método que lo crea automaticamente.

```js
    /**
     * metodo a utilizar cuando se implementen generacion dinamica de formulario en vez de la manual
     */
	cargar_formulario(){

		if (eval(this.manual_form_creation)){
			fillform(this.manual_form_creation(),'form_iu');
		}
		else{
			if (eval(this.cargar_formulario_dinamico)){
				fillform(this.cargar_formulario_dinamico(),'form_iu');
			}
			else{
				alert('no existe formulario');
			}
		}

	}
```
## Inclusión de funcionalidades que no estaban implementadas

# mostrarcambiaratributo()

Se ha implementado el cambio de formato en la muestra de valores que vienen del back. Como se habia indicado en Semanas anteriores existe una propiedad de la entidad llamada mostrarespecial que contiene un array con los atributos que son susceptibles de modificar su valor para hacerlo de forma automatica en el método que dibuja las tablas de datos resultado de SEARCH. El método para cambiar formato se denomina mostrarcambioatributo(atributo, valordelatributo)

```js
/**
	 * modifica el formato de visualización de un atributo concreto y se devuelve el valor modificado
	 * en el caso de solicitar cambio de formato para un atributo no implementado se lanza una alerta
	 * 
	 * @param {String} atributo string con el nombre del atributo a modificar su valor
	 * @param {String} valorentrada string con el valor de entrada a modificar
	 * @returns 
	 */
	mostrarcambioatributo(atributo, valorentrada){
		
		switch (atributo){
			case 'fechaNacimiento_persona':
				var elementos = valorentrada.split('-');

				var day = elementos[2];
				var month = elementos[1];
				var year = elementos[0];
				
				return day+'/'+month+'/'+year;
				break;
			case 'foto_persona':
				var link = 'error';
				if (valorentrada !== ''){
					link = valorentrada+`  <a id="link_foto_persona" href="http://193.147.87.202/ET2/filesuploaded/files_foto_persona/`+valorentrada+`"><img src="./iconos/FILE.png" /></a>`;
				}
				return link;
				break;
			case 'default':
				alert('no existe mostrar especial para ese atributo');
				break;
		}

	}
```

En el método crearTablaDatos que hace el rellenado de valores para enviarlos al método showData que muestra la tabla de datos se ha incluido un bucle en el cual se comprueba si el atributo del cual se esta colocando el valor en la tabla esta en el array de mostrarespecial, si lo esta invoca el método mostrarcambioatributo indicando el atributo y el valor del mismo y pinta el valor tal y como lo devuelve el método mostrarcambioatributo. 

Este proceso se realiza después del rellenado de los valores de fila en los botones de EDIT, DELETE y SHOWCURRENT, con lo que los valores que se pasan a los formularios son los originales del back. Por ello, se vuelve a utilizar el método mostrarcambioatributo en la construcción de los formularios para modificar el formato de la fecha.

```js
if (mostrarespeciales.length > 0){
		
			for (var i=0;i<misdatos.length;i++){
				for (var clave in misdatos[i]){
					for (var posicion in mostrarespeciales){
						if (clave == mostrarespeciales[posicion]){
							misdatos[i][clave] = this.mostrarcambioatributo(clave, misdatos[i][clave]);
						}
					}
				}
			}
		}
```

```js
// modificar presentacion (en este caso concreto para fecha)
		fila.fechaNacimiento_persona = this.mostrarcambioatributo('fechaNacimiento_persona',fila.fechaNacimiento_persona);
```

# EntidadAbstracta como superclase de entidades

Al extender la clase EntidadAbstracta en cada entidad se ha dejado Validations como una clase que se instancia dentro de la entidad persona y solo se invocan sus métodos sin integrarla.

```js
class persona extends EntidadAbstracta{
```

Se ha pasado a EntidadAbstracta toda la información de inicialización de entidad que es común a todas las entidades.
Se ha incorporado una propiedad para guardar el nombre de la entidad que se obtiene directamente del objeto creado.

```js
Class EntidadAbstracta{

	constructor(esTest){
		
		this.dom = new dom();
		this.validations = new Validations();
		this.access_functions = new ExternalAccess();
		this.nombreentidad = this.constructor.name;

		// si se instancia para test no se muestra el componente de gestion de entidad ni se inicializa el formulario
		// 
		if (esTest == 'test'){}
		else{
			//visualizar seccion tabla y botones
			//document.getElementById('IU_manage_entity').style.display = 'block';
			document.getElementById('text_title_page').classList.add('text_titulo_page_'+this.nombreentidad);
			document.getElementById('text_title_page').setAttribute('onclick','entidad = new persona();');

			this.dom.show_element('IU_manage_entity', 'block');
			
			//crear el formulario vacio
			//document.getElementById('contenedor_IU_form').innerHTML = this.manual_form_creation();

			//invocar busqueda en back con el formulario vacio
			this.SEARCH();
		}
	}
	
```

 Por lo tanto en el constructor de una entidad solo tenemos que definir la información especifica de la entidad

 ```js
class persona extends EntidadAbstracta{

	constructor(esTest){
		super();
		

		//definicion de atributos a mostrarn en la tabla de muestra de tuplas al entrar en la gestion de la entidad
		this.columnasamostrar = ['dni','titulacion_persona', 'menu_persona','genero_persona'];
		//definicion de atributos a cambiar su visualización
		this.mostrarespecial = ['fechaNacimiento_persona','foto_persona'];
		
		// definicion de los atributos del formulario (Necesario para test de unidad)
		this.attributes = [  'dni',
                                'nombre_persona',
                                'apellidos_persona',
                                'fechaNacimiento_persona',
                                'direccion_persona',
                                'telefono_persona',
                                'email_persona',
                                'foto_persona',
                                'nuevo_foto_persona'
                            ];

	}	
 ```

# Modificación de la clase de test de datos para permitir la inclusion de pruebas

No se ha modificado la parte de pruebas de file porque la estructura de las pruebas no es la misma que las de field. En un futuro posiblemente se unifique la estructura de pruebas al estar ya definido que se esta probando en la parte de definición de test.

Se ha incluido una modificación sobre la clase de test de datos debido a la colocación de un nuevo elemento de datos en la definición de pruebas (tipo de elemento html del campo).
Debido a este cambio se ha modificado la clase de test de datos por la modificación de posición de los elementos de la definición de test. Ademas se ha incluido para la realización de las pruebas de fields los métodos necesarios para poder colocar el valor de prueba en el elemento del formulario que se indica en la prueba en función del tipo de elemento que se ha definido para ello en la definicion de test para ese campo.

```js
//meto valor en objeto (esto depende del tipo de elemento de formulario)
            for (var j=0;j<pruebas[i][5].length;j++){

                for (var clave in pruebas[i][5][j]){
                
                    var nombrecampo = clave;
                    var valorcampo = pruebas[i][5][j][nombrecampo];

                    switch (tipoelemento){
                        case 'textarea':
                            document.getElementById(nombrecampo).innerText = valorcampo;
                            break;
                        case 'input':
                            document.getElementById(nombrecampo).value = valorcampo;
                            break;
                        case 'select':
                            this.rellenarvalorselect(nombrecampo, valorcampo);
                            break;
                        case 'checkbox':
                            this.rellenarvalorcheckbox(nombrecampo, valorcampo)
                            break;
                        case 'radio':
                            this.rellenarvalorradio(nombrecampo, valorcampo);
                            break;
                        default:
                            alert('no hay tipo de elemento definido en el test '+resultadopruebas.NumDef);

                    }
                    
                }

            }
```

Esto nos permitiría una ampliación de los elementos de formulario si fuere necesario.

Para el rellenado de los elementos de formulario de enumerados se considera por el momento elección única. En el select no hay nada que modificar. Sin embargo, 
en el checkbox y radio (donde hay un elemento html por cada opcion) se utiliza el mismo name (el del atributo) para todos los elementos de selección y no se coloca id porque según nuestro procedimiento estarian todos repetidos y no deberia haber id repetidos.
En todos ellos, se comprueba si el valor para la prueba ya existe en los elementos de seleccion y si es asi se coloca como seleccionado ese valor. En el caso del valor que se indica para la prueba no exista se crea un nuevo elemento, se le coloca ese valor y se indica como seleccionado.

``` js
/**
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
```

```js
/**
     * se recorren todos los elementos checkbox con el mismo nombre
     * si el valor esta en uno de los elementos se coloca como seleccionado
     * si no esta el valor se crea un elemento con ese valor y se coloca como seleccionado
     * UPDATE: pendiente realizar modificacion para admitir eleccion multiple
     * @param {String} name valor del parametro name que deben tener todos los elementos del checkbox 
     * @param {String} valor a comprobar en el checkbox
     */
    rellenarvalorcheckbox(name, valor){

        // se obtiene el elemento de check si existe en el formulario cargado
        var opcionescheck = document.getElementsByName(name);
        // si hay un solo elemento con ese nombre
        if (opcionescheck.length == 1){
            opcionescheck.value = valor;
            opcionescheck.checked = true;
        }
        // si hay mas de un elemento con ese nombre
        // comprobamos si el valor esta y si esta lo ponemos como checked
        // si no esta lo creamos y lo ponemos checked
        else{
            var encontrado = false;
            for (var i=0;i<opcionescheck.length;i++){
                // si recibiesemos un array de valores deberiamos comprobarlos todos 
                // posiblemente con un (opcionescheck.includes(valor))
                if (opcionescheck[i].value == valor){
                    opcionescheck[i].checked = true;
                    encontrado = true;
                }
                else{
                    opcionescheck[i].checked = false;
                }
            }
            if (!encontrado){
                var micheck = document.createElement('input');
                micheck.type = 'checkbox';
                micheck.name = name;
                micheck.value = valor;
                micheck.checked = true;
                document.getElementById('form_iu').append(micheck);
            }

        }
    }
```

```js
/**
     * se recorren todos los elementos radio con el mismo nombre
     * si el valor esta en uno de los elementos se coloca como seleccionado
     * si no esta el valor se crea un elemento con ese valor y se coloca como seleccionado
     * @param {String} name valor del parametro name que deben tener todos los elementos del radio 
     * @param {String} valor a comprobar en el radio
     */
    rellenarvalorradio(name, valor){

        // se obtiene el elemento de check si existe en el formulario cargado
        var opcionesradio = document.getElementsByName(name);
        // si hay un solo elemento con ese nombre
        if (opcionesradio.length == 1){
            opcionesradio[0].value = valor;
            opcionesradio[0].checked = true;
        }
        // si hay mas de un elemento con ese nombre
        // comprobamos si el valor esta y si esta lo ponemos como checked
        // si no esta lo creamos y lo ponemos checked
        else{
            var encontrado = false;
            for (var i=0;i<opcionesradio.length;i++){
                // si recibiesemos un array de valores deberiamos comprobarlos todos 
                // posiblemente con un (opcionesradio.includes(valor))
                if (opcionesradio[i].value == valor){
                    opcionesradio[i].checked = true;
                    encontrado = true;
                }
                else{
                    opcionesradio[i].checked = false;
                }
            }
            if (!encontrado){
                var micheck = document.createElement('input');
                micheck.type = 'radio';
                micheck.name = name;
                micheck.value = valor;
                micheck.checked = true;
                document.getElementById('form_iu').append(micheck);
            }

        }
    }
```

# Modificaciones en dom para adecuar a la posibilidad de select, checkbox y radio

Se ha tenido que modificar el método colocarvalidaciones para poder incluir en los formularios los elementos de form checkbox y radio, debido a que no utilizamos ids adhoc por cada elemento elegible en estos seleccionables. Asi pues su validación debe hacer mediante el name y no mediante id porque no tiene sentido colocarselo a menos que establezcamos algun estandar para nombres como colocar como id el nombreatributo_valor de elección.
La modificación se basa en que aquellos elementos que no tienen id de los elementos del formulario se les coloca la validacion utilizando el nombre y un evento onchange para que se compruebe la validación ante cada cambio en los enumerados.

```js
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


```

Se ha modificado el colocartodosreadonly para que no se puedan modificar los datos de seleccionables. Como no se puede poner un elemento seleccionable a readonly y si se coloca disabled no se envia en el formulario se ha optado por sustituir todos por un input text readonly. 
Podriamos ponerlos disabled pq en delete solo hace falta el id para la accion pero por si otros back precisan el envio de todos los componentes de información se dejan colocados en un input text con el mismo name que el enumerado.

Primero se dejan solo aquellos elementos de checkbox o radio que estan seleccionados y despues se coloca su valor en un input text que se crea dinamicamente y se eliminan del formulario los enumerados y sus labels.

```js
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
```

Para dejar solo los checkbox y radio que estan elegidos se crea el método dejarsoloenumchecked() al cual se pasa la lista de objetos checkbox en o bien la lista de objetos radio del formulario. Este método recorre todos los elementos y borra el elemento y su input si no estan seleccionados.

```js
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
```

Una vez que solo existen en el formulario checkbox y radio seleccionados, se sustituyen por un elemento input text readonly con el mismo name y con su valor. No se incluye un label nuevo porque ya tiene el del atributo. Recordemos que cada checkbox o radio tienen un label de su valor.

```js
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
```

Tambien se hacel lo mismo con el Select

```js
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
```

Se ha modificado rellenarvaloresform() para permitir rellenar dinamicamente select, checkbox y radio.
Se han creado métodos para cada uno de ellos.

```js
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
					default:
						break;
				}
        	}
	}
```
Para rellenar valores select se utiliza el mismo que para el test (no es valido para selects multiples).

Se han creado métodos especificos para rellenar los valores de checkbox y radio.

```js
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
```

```js
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
```

Para el manejo de los select, checkbox y radio en el SEARCH se han creado dos métodos para sustituirlos. Estos deben ser invocados en el createForm del SEARCH.

```js
// reemplazar enumerados por texto
		// titulacion_persona que es un select
		this.dom.replaceSelectXEmptyInput('titulacion_persona');
		// menu_persona que es un checkbox
		this.dom.replaceEnumNameXEmptyInput('menu_persona');
		// genero_persona que es un radio
		this.dom.replaceEnumNameXEmptyInput('genero_persona');
```

Para el select se cambia el select por un input text vacio con el mismo nombre e id que el select.

```js
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
```

Para los elementos checkbox y radio se recibe el nombre de los elementos, se eliminan todos menos uno y se sustituye ese por un input text vacio con el mismo nombre e id que tenian los checkbox y radio.

```js
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
```

## Resumen

Se han incluido métodos en las clases accesorias para el manejo en formularios de elementos select, checkbox y radio.

Se ha incluido una superclase para colocar todos los métodos comunes a las entidades a manejar.

Se ha modificado la clase test data para soportar el nuevo formato de definiciones de test en los que se incluyen el tipo de elemento html para poder rellenar en la clase test data los elementos del formulario y poder invocar los test automaticos.

En el submit tienen que estar las validaciones de todos los campos y tiene que existir para ser invocada y que compruebe que los valores son correctos o existan si es el caso.



