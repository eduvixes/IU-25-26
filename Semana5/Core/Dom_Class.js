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
	 * abrir el modal de error de accion indicando el codigo de error
	 * @param {*} errorMsg 
	 */
	abrirModalError(errorMsg) {
        document.getElementById('error_action_modal').style.display = 'block';
        document.getElementById('modal_action_overlay').style.display = 'block';
        document.getElementById('error_action_msg').className = errorMsg;
        //setLang();
    }

		
	/**
	 * cerrar el modal de error de accion
	 */
    cerrarModalError(){
        document.getElementById('error_action_modal').style.display = 'none';
        document.getElementById('modal_action_overlay').style.display = 'none';
        //document.getElementById('error_action_msg').removeAttribute('class');
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
