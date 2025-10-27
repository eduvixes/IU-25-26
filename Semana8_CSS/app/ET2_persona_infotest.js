let persona_def_tests = Array(
    //campos no ficheros
    Array('persona','nombre_persona','input',1,'cumple tamaño minimo','ADD','nombre_persona_min_size_KO','Tamaño muy corto. Debe estar entre 4 y 20 caracteres'),
    Array('persona','nombre_persona','input',2,'cumple tamaño maximo','ADD','nombre_persona_max_size_KO','Tamaño muy grande. Debe estar entre 4 y 20 caracteres'),
    Array('persona','nombre_persona','input',3,'cumple formato','ADD','nombre_persona_format_KO','Formato inválido. Debe estar entre 4 y 20 caracteres alfabéticos'),
    Array('persona','nombre_persona','input',4,'es correcto','ADD',true,'Nombre persona correcto'),
    ['persona','nombre_persona','input',5,'cumple tamaño minimo','EDIT','nombre_persona_min_size_KO','Tamaño muy corto. Debe estar entre 4 y 20 caracteres'],
    ['persona','nombre_persona','input',6,'cumple tamaño maximo','EDIT','nombre_persona_max_size_KO','Tamaño muy grande. Debe estar entre 4 y 20 caracteres'],
    ['persona','nombre_persona','input',7,'cumple formato','EDIT','nombre_persona_format_KO','Formato inválido. Debe estar entre 4 y 20 caracteres alfabéticos'],
    ['persona','nombre_persona','input',8,'es correcto','EDIT',true,'Nombre persona correcto'],
    ['persona','titulacion_persona','select',25,'no es correcto','ADD','titulacion_persona_valor_KO','Titulación persona incorrecto'],
    ['persona','titulacion_persona','select',26,'es correcto','ADD',true,'Titulación persona correcto'],
    ['persona','menu_persona','checkbox',27,'no es correcto','ADD','menu_persona_valor_KO','menu persona incorrecto'],
    ['persona','menu_persona','checkbox',28,'es correcto','ADD',true,'menu persona correcto'],
    ['persona','genero_persona','radio',29,'no es correcto','ADD','genero_persona_valor_KO','genero persona no correcto, debe ser Masculino, Femenino u Otro'],
    ['persona','genero_persona','radio',30,'es correcto','ADD',true,'genero persona correcto'],
    // ficheros
    Array('persona','nuevo_foto_persona','inputfile',11,'existe fichero','ADD','nuevo_foto_persona_not_exist_file_KO','El fichero no existe. Debe subir una foto'),
    Array('persona','nuevo_foto_persona','inputfile',12,'cumple nombre fichero','ADD','nuevo_foto_persona_format_name_file_KO','el nombre de fichero no cumple formato.'),
    Array('persona','nuevo_foto_persona','inputfile',13,'cumple tipo fichero','ADD','nuevo_foto_persona_type_file_KO','el tipo de fichero no esta permitido'),
    Array('persona','nuevo_foto_persona','inputfile',14,'cumple tamaño maximo fichero','ADD','nuevo_foto_persona_max_size_file_KO','el tamaño del fichero es muy grande.'),
    Array('persona','nuevo_foto_persona','inputfile',15,'cumple tamaño minimo nombre fichero','ADD','nuevo_foto_persona_min_size_name_KO','el tamaño del nombre de fichero es muy pequeño'),
    Array('persona','nuevo_foto_persona','inputfile',16,'cumple tamaño maximo nombre fichero','ADD','nuevo_foto_persona_max_size_name_KO','el tamaño del nombre de fichero es muy grande.'),
    Array('persona','nuevo_foto_persona','inputfile',17,'fichero ok','ADD',true,'ok'),
    Array('persona','nuevo_foto_persona','inputfile',18,'no existe fichero','EDIT',true,'ok'),
    Array('persona','nuevo_foto_persona','inputfile',19,'cumple nombre fichero','EDIT','nuevo_foto_persona_format_name_file_KO','el nombre de fichero no cumple formato.'),
    Array('persona','nuevo_foto_persona','inputfile',20,'cumple tipo fichero','EDIT','nuevo_foto_persona_type_file_KO','el tipo de fichero no esta permitido'),
    Array('persona','nuevo_foto_persona','inputfile',21,'cumple tamaño maximo fichero','EDIT','nuevo_foto_persona_max_size_file_KO','el tamaño del fichero es muy grande.'),
    Array('persona','nuevo_foto_persona','inputfile',22,'cumple tamaño minimo nombre fichero','EDIT','nuevo_foto_persona_min_size_name_KO','el tamaño del nombre de fichero es muy pequeño'),
    Array('persona','nuevo_foto_persona','inputfile',23,'cumple tamaño maximo nombre fichero','EDIT','nuevo_foto_persona_max_size_name_KO','el tamaño del nombre de fichero es muy grande.'),
    Array('persona','nuevo_foto_persona','inputfile',24,'fichero ok','EDIT',true,'ok'),
   
    

);

let persona_tests_fields = Array(
    Array('persona','nombre_persona',1,1,'ADD',[{nombre_persona:'aa'}],'nombre_persona_min_size_KO'),
    Array('persona','nombre_persona',2,2,'ADD',[{nombre_persona:'a'.repeat(20)}],'nombre_persona_max_size_KO'),
    Array('persona','nombre_persona',3,3,'ADD',[{nombre_persona:'aaaaaa1'}],'nombre_persona_format_KO'),
    Array('persona','nombre_persona',4,4,'ADD',[{nombre_persona:'javi1'}],true),
    ['persona','nombre_persona',5,5,'EDIT',[{nombre_persona:'aa'}],'nombre_persona_min_size_KO'],
    ['persona','nombre_persona',6,6,'EDIT',[{nombre_persona:'aaaaaaaaaaaaaaaaaaaaa'}],'nombre_persona_max_size_KO'],
    ['persona','nombre_persona',7,7,'EDIT',[{nombre_persona:'aaaaaa1'}],'nombre_persona_format_KO'],
    ['persona','nombre_persona',8,8,'EDIT',[{nombre_persona:'javi'}],true],
    ['persona','titulacion_persona',26,9,'ADD',[{titulacion_persona:'PCEO'}],true],
    ['persona','titulacion_persona',25,10,'ADD',[{titulacion_persona:'lolo'}],'titulacion_persona_valor_KO'],
    ['persona','menu_persona',28,11,'ADD',[{menu_persona:'primero'}],true],
    ['persona','menu_persona',27,12,'ADD',[{menu_persona:'cuarto'}],'menu_persona_valor_KO'],
    ['persona','genero_persona',30,13,'ADD',[{genero_persona:'Masculino'}],true],
    ['persona','genero_persona',29,14,'ADD',[{genero_persona:'Angelical'}],'genero_persona_valor_KO'],
    ['persona','genero_persona',29,14,'ADD',[{genero_persona:''}],'genero_persona_valor_KO'],

);
/*
la entidad, 
el campo, 
el número de definición de test, 
el número de prueba (secuencial desde 1 hasta el final)
la acción a realizar
el parámetro a probar (max_size_file, type_file, format_name_file)
el valor de parámetro a probar
el codigo asociado de error/valor true de exito
*/
let persona_tests_files = Array(
   Array('persona','nuevo_foto_persona',11,5,'ADD','existe',[],'nuevo_foto_persona_not_exist_file_KO'),
 /*   Array('persona','nuevo_foto_persona',6,6,'ADD','cumple nombre fichero',Array('1111','image/jpeg',20000),'nuevo_foto_persona_format_name_file_KO'),
    Array('persona','nuevo_foto_persona',7,6,'ADD','type_file',Array('nombrejpg','img/pdf',20000),'nuevo_foto_persona_type_file_KO'),
 */   ['persona','nuevo_foto_persona',14,8,'ADD','max_size_name',Array({format_name_file:'nombrejpg.jpg'},{type_file:'image/jpeg'},{max_size_file:2000000000}),'nuevo_foto_persona_max_size_file_KO'],
 Array('persona','nuevo_foto_persona',17,9,'ADD','empty_file',Array({format_name_file:'nombrejpg.jpg'},{type_file:'image/jpeg'},{max_size_file:200}),true),
 /*   Array('persona','nuevo_foto_persona',9,9,'ADD','min_size_name',Array('g','image/jpeg',20000),'nuevo_foto_persona_min_size_name_KO'),
    Array('persona','nuevo_foto_persona',10,10,'ADD','max_size_name',Array('a'.repeat(101),'image/jpeg',20000),'nuevo_foto_persona_max_size_name_KO'),
    Array('persona','nuevo_foto_persona',11,11,'ADD','fichero ok',Array('nombrejpg','image/jpeg',20000),true),
    Array('persona','nuevo_foto_persona',12,12,'EDIT','noexiste',Array(),true),
    Array('persona','nuevo_foto_persona',13,13,'EDIT','cumple nombre fichero',Array('1111','image/jpeg',20000),'nuevo_foto_persona_format_name_file_KO'),
    Array('persona','nuevo_foto_persona',14,14,'EDIT','type_file',Array('nombrejpg','img/pdf',20000),'nuevo_foto_persona_type_file_KO'),
    Array('persona','nuevo_foto_persona',15,15,'EDIT','max_size_file',Array('nombrejpg','image/jpeg',200000000),'nuevo_foto_persona_max_size_file_KO'),
    Array('persona','nuevo_foto_persona',16,16,'EDIT','min_size_name',Array('g','image/jpeg',20000),'nuevo_foto_persona_min_size_name_KO'),
    Array('persona','nuevo_foto_persona',17,17,'EDIT','max_size_name',Array('a'.repeat(101),'image/jpeg',20000),'nuevo_foto_persona_max_size_name_KO'),
    Array('persona','nuevo_foto_persona',18,18,'EDIT','fichero ok',Array('nombrejpg','image/jpeg',20000),true),
  */  
    



);