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

Al extender la clase EntidadAbstracta en cada entidad se ha dejado Validations como una clase que se instancia dentro de la entidad persona y solo se invocan sus métodos sin integrarla.

```js
class persona extends EntidadAbstracta{
```

También se ha incluido en el constructor de la entidad una propiedad this.nombreentidad para almacenar el nombre de la entidad que está manejando la clase. Podriamos extraerlo directamente del nombre de la clase que instancia el objeto también.

```js
this.nombreentidad = 'persona';
```
## Modificación de la clase de test de datos para permitir la inclusion de pruebas

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
