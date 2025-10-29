class dom extends dom_table {

	constructor(){
		super()
	}

	/**
	 * Pone la propiedad style.display a mode
	 * @param {String} id 
	 * @param {String} mode
	 */
	show_element(id, mode){
		document.getElementById(id).style.display = mode;
	}

	/**
	 * pone la propiedad style.display del elemento id a none
	 * @param {String} id 
	 */
	hide_element(id){
		document.getElementById(id).style.display = 'none';
	}
	
	/**
	 * 
	 * Oculta el id y el label_id elementos de un formulario relacionado con un atributo
	 * 
	 * 
	 * @param {String} id 
	 * 
	 */
	hide_element_form(id){
		this.hide_element('label_'+id);
		this.hide_element(id);
	}

	mostrar_error_campo(id, codigoerror){

		document.getElementById('span_error_'+id).style.display = 'inline';
		document.getElementById('error_'+id).className = codigoerror;
		if (document.getElementById(id) == null){
			document.getElementById('label_'+id).style.border = 'solid red 2px';
		}
		else{
			document.getElementById(id).style.border = 'solid red 2px';
		}
		document.getElementById('submit_button').focus();
		setLang();
	}

	

	mostrar_exito_campo(id){
		document.getElementById('span_error_'+id).style.display = 'none';
		document.getElementById('error_'+id).className = '';
		if (document.getElementById(id) == null){
			document.getElementById('label_'+id).style.border = 'solid green 2px';
		}
		else{
			document.getElementById(id).style.border = 'solid green 2px';

		}
		setLang();
	}

	fillform(formdata, idform){
		document.getElementById(idform).innerHTML = formdata;
		document.getElementById(idform).style.display = 'block';
	}

	/**
	 * se indica el id de un elemento, se pasa un atributo a modificar y el 
	 * valor que quiere que tenga
	 * 
	 * @param {String} id 
	 * @param {String} propiedad 
	 * @param {String} valor 
	 */
	assign_property_value(id, propiedad, valor){
		document.getElementById(id).setAttribute(propiedad, valor);
	}

	/**
	 * dado un id del un elemento html y un valor a incluir en el atributo clase
	 * se añade con un classlist.add para no eliminar los que ya tenga.
	 * 
	 * @param {String} id Id del elemento html al que se añadira una clase
	 * @param {String} classvalue valor de clase a añadir
	 */
	assign_class_value(id, classvalue){
		document.getElementById(id).classList.add(classvalue);
	}

	remove_class_value(id, partialclassvalue){

		var elemento = document.getElementById(id);
		var clases = elemento.classList;
		var regularexpresion = new RegExp(partialclassvalue+'.+?');
		if (clases.length > 0){
			for (var i=0;i<clases.length;i++){
				if (regularexpresion.test(clases[i])){
					elemento.classList.remove(clases[i]);
				}
			}
		}
		
	}


	/**
	 * abrir el modal de error de accion indicando el codigo de error
	 * @param {*} errorMsg 
	 */
	abrirModalError(errorMsg) {
        document.getElementById('error_action_modal').style.display = 'block';
        document.getElementById('modal_action_overlay').style.display = 'block';
        document.getElementById('error_action_msg').className = errorMsg;
        setLang();
    }

		
	/**
	 * cerrar el modal de error de accion
	 */
    cerrarModalError(){
        document.getElementById('error_action_modal').style.display = 'none';
        document.getElementById('modal_action_overlay').style.display = 'none';
        document.getElementById('error_action_msg').className = '';
    }

	/**
	 * crea un elemento de formulario y lo coloca dentro del formulario con el id indicado
	 * @param {String} idform  id del formulario
	 * @param {String} idelement  id del elemento
	 * @param {String} tag tag html del documento
	 * @param {String} tipo tipo de elemento si es un input
	 */
	createElement(idform, idelement, tag, tipo){
		var elemento = document.createElement(tag);
		elemento.id = idelement;
		elemento.type = tipo;
		document.getElementById(idform).append(elemento);
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
