var textos_EN = {

	// textos titulos generales
	'text_titulo_app': 'IU ET2 Interface',
	'text_titulo_menu': 'Menu Options',
	'text_titulo_pie': 'Footer',
    'label_seleccioncolumnas': 'Select columns ',
    
    // textos de test
    /*'res_estructura_tests':'Tabla verificacion estructura de test',
	'resultadodef':'formato correcto estructura definicion tests',
	'res_estructura_pruebas':'Tabla verificacion estructura de pruebas',
	'resultadoprueba':'formato correcto estructura pruebas',
	'res_pruebas':'Tabla ejecución de pruebas',
	'resultadotest':'Resultado ejecucion pruebas',
    */

    // textos menu
	'text_menu_persona': 'Person Management',

    // textos entidad persona
	'text_titulo_page_persona' : 'Personal Data Management',
    'text_contenido_titulo_form_persona_ADD': 'Personal Data ADD Form',
	'text_contenido_titulo_form_persona_EDIT': 'Personal Data EDIT Form',
	'text_contenido_titulo_form_persona_DELETE': 'Personal Data DELETE Form',
	'text_contenido_titulo_form_persona_SHOWCURRENT': 'Personal Data SHOWCURRENT Form',
    'text_contenido_titulo_form_persona_SEARCH': 'Personal Data SEARCH Form',

	// atributos
	'dni': 'Identification',
    'nombre_persona': 'First Name',
    'apellidos_persona': 'Last Name',
    'fechaNacimiento_persona': 'Date of Birth',
    'direccion_persona': 'Address',
    'telefono_persona': 'Phone',
    'email_persona': 'Email',
	'titulacion_persona' : 'Degree',
	'menu_persona' : 'Menu',
	'genero_persona' :'Gender',
    'foto_persona': 'Photo',

	// labels
	'label_dni': 'Identification',
	'label_nombre_persona': 'First Name',
	'label_apellidos_persona': 'Last Name',
	'label_fechaNacimiento_persona': 'Date of Birth',
	'label_direccion_persona': 'Address',
	'label_telefono_persona': 'Phone',
	'label_email_persona': 'Email',
	'label_foto_persona': 'Photo',
	'label_titulacion_persona' : 'Degree',
	'label_menu_persona' : 'Menu',
	'label_genero_persona' : 'Gender',
	'label_nuevo_foto_persona': 'New Photo',

	// labels valores enum

	'label_Vegano' : 'Vegan',
	'label_Celiaco' : 'Coeliac',
	'label_AlergiaMarisco' : 'shellfishAllergic',
	'label_Masculino' : 'Masculine',
	'label_Femenino' : 'Feminine',
	'label_Otro' : 'Other',

	// errores validaciones formulario
	// ADD/EDIT

	// dni
	'dni_min_size_KO':'ID number too short. Must have 8 numbers and 1 alphabetical character',
    'dni_max_size_KO':'ID number too long. Must have 8 numbers and 1 alphabetical character',
    'dni_format_KO':'Incorrect ID/foreign ID format. ID number 8 digits 1 letter, foreign ID number 1 letter 7 digits 1 letter',
    // nombre_persona
    'nombre_persona_min_size_KO':'Name too short. Must have more than 4 alphabetical characters',
    'nombre_persona_max_size_KO':'Name too long. Must have less than 15 alphabetic characters',
    'nombre_persona_format_KO':'Incorrect name. Only alphabetic characters are allowed',

    // apellidos_persona
    'apellidos_persona_min_size_KO': 'Last name too short. Must have more than 4 alphabetic characters or spaces',
    'apellidos_persona_max_size_KO': 'Last name too long. Must have less than 20 alphabetic characters or spaces',
    'apellidos_persona_format_KO': 'Last name incorrect. Only alphabetic characters and spaces are allowed',

    //fechaNacimiento_persona
    'fechaNacimiento_persona_format_KO': 'Date is incorrect. Must be in dd/mm/yyyy format',
    'fechaNacimiento_persona_valid_KO': 'Date is invalid. The date must exist',


	// email persona
	'email_persona_min_size_KO': '',
	'email_persona_max_size_KO':'',
	'email_persona_format_KO':'',

	// titulacion persona

	'titulacion_persona_format_KO' : 'Value not allowed. Must be one of  : (GREI, GRIA, MEI, MIA, PCEO)',

	// menu_persona
	'menu_persona_empty_KO': 'Menu can not be empty. Select one of the menu options',
	'menu_persona_max_size_KO': 'Can not be selected more than one menu option',

	// genero_persona
	'genero_persona_empty_KO': 'Gender can not be empty. Select one of the gender options',

	// nuevo foto persona	
	'nuevo_foto_persona_not_exist_file_KO':'The file does not exist. A photo in jpg format must be uploaded.',
	'nuevo_foto_persona_max_size_file_KO':'',
	'nuevo_foto_persona_type_file_KO':'',
	'nuevo_foto_persona_format_name_file_KO':'',
	'nuevo_foto_persona_min_size_KO':'',
	'nuevo_foto_persona_max_size_KO':'',

	//SEARCH
	// foto persona
	'foto_persona_max_size_KO':'',
	'foto_persona_format_KO':'',
	

	//errores acciones
	'RECORDSET_VACIO' : 'There are not results for your search',
	'dni_es_nulo_KO':'DNI can not be empty',

	'admin_no_se_puede_modificar_KO':'El admin no se puede modificar',

}