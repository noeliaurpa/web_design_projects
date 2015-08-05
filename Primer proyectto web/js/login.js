var usuario = ["admin", "$uper4dmin"];
var User = [usuario];
var validar = null;

// Esta funcion guarda todo el contenido de los input(nombre, apellido y telefono) en el navegador
function iniciar_Sesion()

{
	validacion();
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
		usuario.push(document.getElementById("user").value,
			document.getElementById("password").value);
		User.push(usuario);
		localStorage['password'] = JSON.stringify(User);
		alert("Usuario creado ya puedes iniciar sesion");
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
	localStorage['password'] = JSON.stringify(User);
	var storedNames =JSON.parse(localStorage.getItem("password"));
	var nombre_usuario = document.getElementById("user").value;
	var contrasenna = document.getElementById("password").value;
	if(nombre_usuario == "" || nombre_usuario == null){
		alert("No puede dejar el espacio del nombre de usuario en blanco.");
		validar = "No_se_pudo_crear";
	}else if(contrasenna == "" || contrasenna == null){
		alert("No puede dejar el espacio de la contraseña en blanco");
		validar = "No_se_pudo_crear";
	}else {
		for(i = 0; i < storedNames.length; i++){
			for (j = 0; j < storedNames[i].length; j++){
				if(storedNames[i][j] === nombre_usuario && storedNames[i][j+1] === "$uper4dmin"){
					validar = "Entra como administracion";
					break;
				}else{
					if(storedNames[i][j] === nombre_usuario){
						if(storedNames[i][j+1] === contrasenna){
							validar = "Entra como particular";
							break;
						}
					}
				}
			}
		}
	}
	
}