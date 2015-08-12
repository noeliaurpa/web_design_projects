/*
tengo que crear otra ventana para que el usuario crea su propia cuenta, y tiene que entrar  como admin siempre
tengo que validar solo si es admin y si tiene la contraseña que es y entra si no no puede entrar
*/

var usuario = [];
var User = JSON.parse(localStorage.getItem("usuarios"));
var user_actual;
//var User = usuario;
var validar = null;

// Esta funcion guarda todo el contenido de los input(nombre, apellido y telefono) en el navegador
function iniciar_Sesion()

{
	var nombre_usuario = document.getElementById("user").value;
	var contrasenna = document.getElementById("password").value;
	if(nombre_usuario === "admin" && contrasenna === "$uper4dmin"){
		validar = "Entra como administracion";
		user_actual = 'Admin';
		localStorage.setItem("Usuario_Actual",user_actual);
	}else{
		validacion();
	}

	if(validar === null){

		alert("Debe crearlo primero antes de iniciar sesion");
	}else if(validar === "Entra como administracion"){
		location.href="tablero-de-instrucciones.html";

	}else if(validar === "Entra como particular"){
		user_actual = document.getElementById("user").value;
		localStorage.setItem("Usuario_Actual", user_actual);
		location.href="tablero-de-instrucciones.html";
	}

}

// Esta funcion muestra todo el contenido de los input(nombre, apellido y telefono) en la consola

function crear_usuario()
{
	validacion();
	debugger;
	if(validar === null){
		usuario = [];
		var contrasenna = document.getElementById("password").value;
		var contrasenna_repeat = document.getElementById("password_repeat").value;
		if(contrasenna === contrasenna_repeat){
			usuario.push(document.getElementById("fullName").value, document.getElementById("user").value,
				document.getElementById("password").value, document.getElementById("password_repeat").value);
			User.push(usuario);
			localStorage['usuarios'] = JSON.stringify(User);
			alert("Usuario creado ya puedes iniciar sesion");
			location.href="tablero-de-instrucciones.html"
		}else{
			alert("No puedes crear el usuario porque las contraseñas son diferentes, asegurese que sea las mismas");
		}
		//usuario.push(jQuery('#user').val()); esto es utilizando jQuery, solo puede servir si tiene la librería

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
	//debugger;
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
			debugger;
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

function validarNewUser(){
	//debugger;
	if(localStorage.getItem("Usuario_Actual") !== "Admin"){
		$("#Hi_user").append(localStorage.getItem("Usuario_Actual"));
	}else{
		$("#New_usuario").css("display:","block;");
		$("#Hi_user").append('Admin');
	}
}



var chambas = [];

function agregarChambas(){
	var usuario_nombre = (localStorage.getItem("Usuario_Actual")) + "chambas";
	var arreglo = JSON.parse(localStorage.getItem(usuario_nombre));
	debugger;
	var cliente = document.getElementById("cliente").value;
	var description = document.getElementById("description").value;
	var fecha = document.getElementById("fecha").value;
	var notas = document.getElementById("notas").value;
	var modify;
	var dilete;
	chambas = [];
	if(arreglo == null){
		arreglo = [];
		chambas.push(document.getElementById("cliente").value,document.getElementById("description").value,
			document.getElementById("fecha").value,document.getElementById("notas").value);
		arreglo.push(chambas);
		localStorage[usuario_nombre] = JSON.stringify(arreglo);
	}else{
		arreglo.push(chambas);
		chambas.push(document.getElementById("cliente").value,document.getElementById("description").value,
			document.getElementById("fecha").value,document.getElementById("notas").value);
		localStorage[usuario_nombre] = JSON.stringify(arreglo);
		alert("Se guardó correctamente");
	}
}

function cargarTablaChambas(){
	var usuario_nombre = (localStorage.getItem("Usuario_Actual")) + "chambas";
	var listcliente =JSON.parse(localStorage.getItem(usuario_nombre));
	for (var i = 0; i < listcliente.length; i++) {
		var table = document.getElementById("regtable");
		var row = table.insertRow();
		var clienteCell = row.insertCell(0);
		var descriptionCell = row.insertCell(1);
		var fechaCell = row.insertCell(2);
		var notasCell = row.insertCell(3);
		var modify = row.insertCell(4);
		var dilete = row.insertCell(5);

		clienteCell.innerHTML  = listcliente[i][0];
		descriptionCell.innerHTML  = listcliente[i][1];
		fechaCell.innerHTML  = listcliente[i][2];
		notasCell.innerHTML  = listcliente[i][3];
		modify.innerHTML = "modify" + i;
		dilete.innerHTML = "delete" + i;
	};
}


var clientes = [];

function agregarClientes(){
	var usuario_nombre = (localStorage.getItem("Usuario_Actual")) + "clientes";
	var arreglo = JSON.parse(localStorage.getItem(usuario_nombre));
	debugger;
	var id = document.getElementById("id").value;
	var full_name = document.getElementById("full_name").value;
	var telephone = document.getElementById("tell").value;
	var modify;
	var dilete;
	clientes = [];
	if(arreglo == null){
		arreglo = [];
		clientes.push(document.getElementById("id").value,
			document.getElementById("full_name").value,document.getElementById("tell").value);
		arreglo.push(clientes);
		localStorage[usuario_nombre] = JSON.stringify(arreglo);
	}else{
		arreglo.push(clientes);
		clientes.push(document.getElementById("id").value,
			document.getElementById("full_name").value,document.getElementById("tell").value);
		localStorage[usuario_nombre] = JSON.stringify(arreglo);
		alert("Se guardó correctamente");
	}
}

function cargarTablaClientes(){
	var usuario_nombre = (localStorage.getItem("Usuario_Actual")) + "clientes";
	var listcliente =JSON.parse(localStorage.getItem(usuario_nombre));
	for (var i = 0; i < listcliente.length; i++) {
		var table = document.getElementById("regtable");
		var row = table.insertRow();
		var idCell = row.insertCell(0);
		var full_nameCell = row.insertCell(1);
		var telephoneCell = row.insertCell(2);
		var modify = row.insertCell(3);
		var dilete = row.insertCell(4);

		idCell.innerHTML  = listcliente[i][0];
		full_nameCell.innerHTML  = listcliente[i][1];
		telephoneCell.innerHTML  = listcliente[i][2];
		modify.innerHTML = "modify" + i;
		dilete.innerHTML = "delete" + i;
	};
}


var chambas = [];
function agregarInvoices(){
	var usuario_nombre = (localStorage.getItem("Usuario_Actual")) + "invoices";
	var arreglo = JSON.parse(localStorage.getItem(usuario_nombre));
	debugger;

	var numeroInvoice ;
	var cliente = document.getElementById("cliente").value;
	var description = document.getElementById("description").value;
	var fecha = document.getElementById("fecha").value;
	var monto = document.getElementById("monto").value;
	var modify;
	var dilete;
	chambas = [];
	if(arreglo == null){
		arreglo = [];
		chambas.push(document.getElementById("cliente").value,document.getElementById("description").value,
			document.getElementById("fecha").value,document.getElementById("monto").value);
		arreglo.push(chambas);
		localStorage[usuario_nombre] = JSON.stringify(arreglo);
		alert("Se guardó correctamente");
	}else{
		arreglo.push(chambas);
		chambas.push(document.getElementById("cliente").value,document.getElementById("description").value,
			document.getElementById("fecha").value,document.getElementById("monto").value);
		localStorage[usuario_nombre] = JSON.stringify(arreglo);
		alert("Se guardó correctamente");
	}
}

function cargarTablaInvoices(){
	var usuario_nombre = (localStorage.getItem("Usuario_Actual")) + "invoices";
	var listcliente =JSON.parse(localStorage.getItem(usuario_nombre));
	for (var i = 0; i < listcliente.length; i++) {
		var table = document.getElementById("regtable");
		var row = table.insertRow();
		var numeroInvoice = row.insertCell(0);
		var clienteCell = row.insertCell(1);
		var descriptionCell = row.insertCell(2);
		var fechaCell = row.insertCell(3);
		var montoCell = row.insertCell(4);
		var modify = row.insertCell(5);
		var dilete = row.insertCell(6);

		numeroInvoice.innerHTML = i;
		clienteCell.innerHTML  = listcliente[i][0];
		descriptionCell.innerHTML  = listcliente[i][1];
		fechaCell.innerHTML  = listcliente[i][2];
		montoCell.innerHTML  = listcliente[i][3];
		modify.innerHTML = "modify" + i;
		dilete.innerHTML = "delete" + i;
	};
}

function cargarTablaUsers(){
	var listcliente =JSON.parse(localStorage.getItem("usuarios"));
	for (var i = 0; i < listcliente.length; i++) {
		var table = document.getElementById("regtable");
		var row = table.insertRow();
		var nombreusCell = row.insertCell(0);
		var username_iusCell = row.insertCell(1);
		var password_iusCell = row.insertCell(2);
		var passwordrepetCell = row.insertCell(3);

		nombreusCell.innerHTML = listcliente[i][0];
		username_iusCell.innerHTML  = listcliente[i][1];
		password_iusCell.innerHTML  = "********************";
		passwordrepetCell.innerHTML = "********************";
	};
}