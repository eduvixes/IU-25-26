class persona extends Validations{

	constructor(){
		super();
		this.dom = new dom();
	}	

	/*
		fields validations for ADD
	*/

	/**
		
		@param 
		@return
			{string} Error code of field value (fieldname_validationfunction_KO) 
			or
			{bool} true due the field value is correct

	*/

	ADD_dni_validation(){
		
		if (!(this.min_size('dni',9))){
			this.dom.mostrar_error_campo('dni','dni_min_size_KO');
			return "dni_min_size_KO";
		}
		if (!(this.max_size('dni',9))){
			this.dom.mostrar_error_campo('dni','dni_max_size_KO');
			return "dni_max_size_KO";
		}
		if (!(this.format('dni', '[0-9]{8}[A-Z]{1}'))){
			this.dom.mostrar_error_campo('dni','dni_format_KO');
			return "dni_format_KO";
		}
		this.dom.mostrar_exito_campo('dni');
		return true;

	}

	/** 
		
		@param 
		@return
			{string} Error code of field value (fieldname_validationfunction_KO) 
			or
			{bool} true due the field value is correct

	*/

	ADD_nombre_persona_validation(){
		
		if (!(this.min_size('nombre_persona',4))){
			this.dom.mostrar_error_campo('nombre_persona','nombre_persona_min_size_KO');
			return "nombre_persona_min_size_KO";
		}
		if (!(this.max_size('nombre_persona',8))){
			this.dom.mostrar_error_campo('nombre_persona','nombre_persona_max_size_KO');
			return "nombre_persona_max_size_KO";
		}
		// allowed format aA to zZ letter
		if (!(this.format('nombre_persona', '^[a-zA-Z]'))){
			this.dom.mostrar_error_campo('nombre_persona','nombre_persona_format_KO');
			return "nombre_persona_format_KO";
		}
		this.dom.mostrar_exito_campo('nombre_persona');
		return true;
	}

	/**
		
		@param 
		@return
			{bool} true if all field validations are correct or false if any field validation is false

	*/

	ADD_submit_persona(){

		let result = (
					(this.ADD_dni_validation()) &
					(this.ADD_nombre_persona_validation())
					)
		
		result = Boolean(result);
		
		return result;	


	}
	


}
