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

En el método crearTablaDatos que hace el rellenado de valores para enviarlos al método showData que muestra la tabla de datos se ha incluido un bucle en el cual se comprueba si el atributo del cual se esta colocando el valor en la tabla esta en el array de mostrarespecial, si lo esta invoca el método mostrarcambioatributo indicando el atributo y el valor del mismo y pinta el valor tal y como lo devuelve el método mostrarcambioatributo. Este proceso se realiza después del rellenado de los valores de fila en los botones de EDIT, DELETE y SHOWCURRENT, con lo que los valores que se pasan a los formularios son los originales del back. Por ello, se vuelve a utilizar el método mostrarcambioatributo en la construcción de los formularios para modificar el formato de la fecha.

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

