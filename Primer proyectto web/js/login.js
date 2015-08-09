/*
tengo que crear otra ventana para que el usuario crea su propia cuenta, y tiene que entrar  como admin siempre
tengo que validar solo si es admin y si tiene la contraseña que es y entra si no no puede entrar
*/

var usuario = [];
var User = JSON.parse(localStorage.getItem("usuarios"));
//var User = usuario;
var validar = null;

// Esta funcion guarda todo el contenido de los input(nombre, apellido y telefono) en el navegador
function iniciar_Sesion()

{
	var nombre_usuario = document.getElementById("user").value;
	var contrasenna = document.getElementById("password").value;
	if(nombre_usuario === "admin" && contrasenna === "$uper4dmin"){
		validar = "Entra como administracion";
	}else{
		validacion();
	}
	if(validar === null){
		alert("Debe crearlo primero antes de iniciar sesion");
	}else if(validar === "Entra como administracion"){

		location.href="tablero-de-instrucciones.html";
	}else if(validar === "Entra como particular"){
		location.href="tablero-de-instrucciones2.html";
	}

}

// Esta funcion muestra todo el contenido de los input(nombre, apellido y telefono) en la consola

function crear_usuario()
{
	validacion();
	if(validar === null){
		usuario = [];
		//usuario.push(jQuery('#user').val()); esto es utilizando jQuery, solo puede servir si tiene la librería
		usuario.push(document.getElementById("user").value,
			document.getElementById("password").value);
		User.push(usuario);
		localStorage['usuarios'] = JSON.stringify(User);
		alert("Usuario creado ya puedes iniciar sesion");
		location.href="index.html"
	}else if(validar === "Entra como administracion"){
		alert("No puedes crear con ese nombre de usuario porque ya existe");
	}else if(validar === "Entra como particular"){
		alert("No puedes crear con ese nombre de usuario porque ya existe");
	}else if(validar === "No_se_pudo_crear"){
		alert("No se pudo crear el usuario");
		validar = null;
	}
} 

function validacion()
{
	debugger;
	//localStorage['usuarios'] = JSON.stringify(User);
	var storedNames =JSON.parse(localStorage.getItem("usuarios"));
	var nombre_usuario = document.getElementById("user").value;
	var contrasenna = document.getElementById("password").value;
	if(nombre_usuario == "" || nombre_usuario == null){
		alert("No puede dejar el espacio del nombre de usuario en blanco.");
		validar = "No_se_pudo_crear";
	}else if(contrasenna == "" || contrasenna == null){
		alert("No puede dejar el espacio de la contraseña en blanco");
		validar = "No_se_pudo_crear";
	}else {
		if(storedNames == null){
			validar = null;
			User = usuario;
		}else{
			validar = null;
			for(i = 0; i < storedNames.length; i++){
				for (j = 0; j < storedNames[i].length; j++){
					if(storedNames[i][j] === nombre_usuario){
						if(storedNames[i][j+1] === contrasenna){
							validar = "Entra como particular";
							break;
						}
					}
					if(validar === "Entra como particular"){

					}else{
						validar = null;
						break;
					}
				}
			}
		}
	}
}



/* esto es para recorrer el arreglo
for(i = 0; i < storedNames.length; i++){
				for (j = 0; j < storedNames[i].length; j++){
					if(storedNames[i][j] === nombre_usuario){
						if(storedNames[i][j+1] === contrasenna){
							validar = "Entra como particular";
							break;
						}
					}
				}
				*/
				function usuario(){
					var nombreDelUsuario = document.getElementById("user");
					asignarNombre(nombreDelUsuario);
				}

				function asignarNombre(nombreUsuario){
					var nombreU = nombreUsuario;
					var elemento = document.getElementById("Hi_user");
					elemento.innerHTML = nombreU;
				}