/*
tengo que crear otra ventana para que el usuario crea su propia cuenta, y tiene que entrar  como admin siempre
tengo que validar solo si es admin y si tiene la contraseña que es y entra si no no puede entrar
*/
var modificar = 0;
var eliminar = 0;
var usuario = [];
var User = JSON.parse(localStorage.getItem("usuarios"));
var user_actual;
//var User = usuario;
var validar = null;
var da1;
var da2;
var da3;
var da4;
var da5;
var da6;
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
	//debugger;
	if(validar === null){
		usuario = [];
		var contrasenna = document.getElementById("password").value;
		var contrasenna_repeat = document.getElementById("password_repeat").value;
		if(contrasenna === contrasenna_repeat){
			usuario.push(document.getElementById("numero").value, document.getElementById("fullName").value, document.getElementById("user").value,
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
			//debugger;
			for(i = 0; i < storedNames.length; i++){
				for (j = 0; j < storedNames[i].length; j++){
					if(storedNames[i][j+2] === nombre_usuario){
						if(storedNames[i][j+3] === contrasenna){
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
	if(localStorage.getItem("Usuario_Actual") === "Admin"){
		$("#Hi_user").append('Admin');
	}else{
		$("#New_usuario").hide();
		$("#Users").hide();
		$("#Hi_user").append(localStorage.getItem("Usuario_Actual"));
	}
}



var chambas = [];

function agregarChambas(){
	var usuario_nombre = (localStorage.getItem("Usuario_Actual")) + "chambas";
	var arreglo = JSON.parse(localStorage.getItem(usuario_nombre));
	//debugger;
	var numeroChambas = document.getElementById("numero").value;
	var cliente = document.getElementById("cliente").value;
	var description = document.getElementById("description").value;
	var fecha = document.getElementById("fecha").value;
	var notas = document.getElementById("notas").value;
	var modify;
	var dilete;
	chambas = [];
	if(arreglo == null){
		arreglo = [];
		chambas.push(document.getElementById("numero").value,document.getElementById("cliente").value,document.getElementById("description").value,
			document.getElementById("fecha").value,document.getElementById("notas").value);
		arreglo.push(chambas);
		localStorage[usuario_nombre] = JSON.stringify(arreglo);
		$("#mensaje").show();
		alert("Se guardó correctamente");
		location.reload();
	}else{
		arreglo.push(chambas);
		chambas.push(document.getElementById("numero").value,document.getElementById("cliente").value,document.getElementById("description").value,
			document.getElementById("fecha").value,document.getElementById("notas").value);
		localStorage[usuario_nombre] = JSON.stringify(arreglo);
		$("#mensaje").show();
		alert("Se guardó correctamente");
		location.reload();
	}
}

function cargarTablaChambas(){
	debugger
	var usuario_nombre = (localStorage.getItem("Usuario_Actual")) + "chambas";
	var listcliente =JSON.parse(localStorage.getItem(usuario_nombre));
	var idEdit;
	var idDelete;
	for (var i = 0; i < listcliente.length; i++) {
		for (var j = 0; j <listcliente[i].length; j++) {
			var table = document.getElementById("regtable");
			var row = table.insertRow();
			var numeroChambas = row.insertCell(0);
			var clienteCell = row.insertCell(1);
			var descriptionCell = row.insertCell(2);
			var fechaCell = row.insertCell(3);
			var notasCell = row.insertCell(4);
			var modify = row.insertCell(5);
			var dilete = row.insertCell(6);

			numeroChambas.innerHTML = i;
			clienteCell.innerHTML  = listcliente[i][j+1];
			descriptionCell.innerHTML  = listcliente[i][j+2];
			fechaCell.innerHTML  = listcliente[i][j+3];
			notasCell.innerHTML  = listcliente[i][j+4];
			modify.innerHTML = "";
			dilete.innerHTML = "";
			idEdit = listcliente[i][j];
			idDelete = listcliente[i][j];
    //debugger;
		// crea un elemento "a" que va a ser el q encapsule a la imagen
		var link = document.createElement("A");
		link.setAttribute("href", "Edit Chambas.html");
		link.setAttribute("id" , idEdit);
		link.setAttribute("onclick", "modif(this)");
  		// crea el elemento imagen
  		var x = document.createElement("IMG");
  		x.setAttribute("src", "imagenes/modificar.png");

    	// se lo agrega al elemento link que creo antes
    	link.appendChild(x);
    	// agrega el elmento al body o a quién sea donde se va a agregar, podria ser un div
    	modify.appendChild(link, x);


    	var link2 = document.createElement("A");
    	link2.setAttribute("href","Delete Chambas.html");
    	link2.setAttribute("id" , idDelete);
    	link2.setAttribute("onclick", "elim(this)");

    	var x2 = document.createElement("IMG");
    	x2.setAttribute("src", "imagenes/basurero.png");

    	link2.appendChild(x2);

    	dilete.appendChild(link2,x2);
    	break;
    };

};
}


var clientes = [];

function agregarClientes(){
	var usuario_nombre = (localStorage.getItem("Usuario_Actual")) + "clientes";
	var arreglo = JSON.parse(localStorage.getItem(usuario_nombre));
	//debugger;
	var numeroClientes = document.getElementById("numero").value;
	var id = document.getElementById("id").value;
	var full_name = document.getElementById("full_name").value;
	var telephone = document.getElementById("tell").value;
	var modify;
	var dilete;
	clientes = [];
	if(arreglo == null){
		arreglo = [];
		clientes.push(document.getElementById("numero").value,document.getElementById("id").value,
			document.getElementById("full_name").value,document.getElementById("tell").value);
		arreglo.push(clientes);
		localStorage[usuario_nombre] = JSON.stringify(arreglo);
		$("#mensaje").show();
		alert("Se guardó correctamente");
		location.reload();
	}else{
		arreglo.push(clientes);
		clientes.push(document.getElementById("numero").value,document.getElementById("id").value,
			document.getElementById("full_name").value,document.getElementById("tell").value);
		localStorage[usuario_nombre] = JSON.stringify(arreglo);
		$("#mensaje").show();
		alert("Se guardó correctamente");
		location.reload();
	}
}

function cargarTablaClientes(){
	var usuario_nombre = (localStorage.getItem("Usuario_Actual")) + "clientes";
	var listcliente =JSON.parse(localStorage.getItem(usuario_nombre));
	var idEdit;
	var idDelete;
	for (var i = 0; i < listcliente.length; i++) {
		for (var j = 0; j < listcliente[i].length; j++) {
			var table = document.getElementById("regtable");
			var row = table.insertRow();
			var numeroClientes = row.insertCell(0);
			var idCell = row.insertCell(1);
			var full_nameCell = row.insertCell(2);
			var telephoneCell = row.insertCell(3);
			var modify = row.insertCell(4);
			var dilete = row.insertCell(5);

			numeroClientes.innerHTML = i;
			idCell.innerHTML  = listcliente[i][1];
			full_nameCell.innerHTML  = listcliente[i][2];
			telephoneCell.innerHTML  = listcliente[i][3];
			modify.innerHTML = "";
			dilete.innerHTML = "";
			idEdit = listcliente[i][j];
			idDelete = listcliente[i][j];

			var link = document.createElement("A");
			link.setAttribute("href", "Edit Client.html");
			link.setAttribute("id" , idEdit);
			link.setAttribute("onclick", "modif(this)");

  		// crea el elemento imagen
  		var x = document.createElement("IMG");
  		x.setAttribute("src", "imagenes/modificar.png");
    	// se lo agrega al elemento link que creo antes
    	link.appendChild(x);

    	// agrega el elmento al body o a quién sea donde se va a agregar, podria ser un div
    	modify.appendChild(link, x);


    	var link2 = document.createElement("A");
    	link2.setAttribute("href","Delete clients.html");
    	link2.setAttribute("id" , idDelete);
    	link2.setAttribute("onclick", "elim(this)");

    	var x2 = document.createElement("IMG");
    	x2.setAttribute("src", "imagenes/basurero.png");

    	link2.appendChild(x2);
    	
    	dilete.appendChild(link2,x2);
    	break;
    };
};
}


var invoices = [];
function agregarInvoices(){
	debugger;
	var usuario_nombre = (localStorage.getItem("Usuario_Actual")) + "invoices";
	var arreglo = JSON.parse(localStorage.getItem(usuario_nombre));
	var numeroInvoice = document.getElementById("numero").value;
	var cliente = document.getElementById("cliente").value;
	var description = document.getElementById("description").value;
	var fecha = document.getElementById("fecha").value;
	var monto = document.getElementById("monto").value;
	var modify;
	var dilete;
	invoices = [];
	if(arreglo == null){
		arreglo = [];
		invoices.push(document.getElementById("numero").value,document.getElementById("cliente").value,document.getElementById("description").value,
			document.getElementById("fecha").value,document.getElementById("monto").value);
		arreglo.push(invoices);
		localStorage[usuario_nombre] = JSON.stringify(arreglo);
		$("#mensaje").show();
		alert("Se guardó correctamente");
		location.reload();
	}else{
		arreglo.push(invoices);
		invoices.push(document.getElementById("numero").value,document.getElementById("cliente").value,document.getElementById("description").value,
			document.getElementById("fecha").value,document.getElementById("monto").value);
		localStorage[usuario_nombre] = JSON.stringify(arreglo);
		$("#mensaje").show();
		alert("Se guardó correctamente");
		location.reload();
	}
}

function cargarTablaInvoices(){
	var usuario_nombre = (localStorage.getItem("Usuario_Actual")) + "invoices";
	var listcliente =JSON.parse(localStorage.getItem(usuario_nombre));
	var idEdit;
	var idDelete;
	for (var i = 0; i < listcliente.length; i++) {
		for (var j = 0; j < listcliente[i].length; j++) {
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
			clienteCell.innerHTML  = listcliente[i][1];
			descriptionCell.innerHTML  = listcliente[i][2];
			fechaCell.innerHTML  = listcliente[i][3];
			montoCell.innerHTML  = listcliente[i][4];
			modify.innerHTML = "";
			dilete.innerHTML = "";
			idEdit = listcliente[i][j];
			idDelete = listcliente[i][j];

			var link = document.createElement("A");
			link.setAttribute("href", "Edit Invoice.html");
			link.setAttribute("id" , idEdit);
			link.setAttribute("onclick", "modif(this)");

  		// crea el elemento imagen
  		var x = document.createElement("IMG");
  		x.setAttribute("src", "imagenes/modificar.png");
    	// se lo agrega al elemento link que creo antes
    	link.appendChild(x);

    	// agrega el elmento al body o a quién sea donde se va a agregar, podria ser un div
    	modify.appendChild(link, x);


    	var link2 = document.createElement("A");
    	link2.setAttribute("href","Delete Invoice.html");
    	link2.setAttribute("id" , idDelete);
    	link2.setAttribute("onclick", "elim(this)");


    	var x2 = document.createElement("IMG");
    	x2.setAttribute("src", "imagenes/basurero.png");

    	link2.appendChild(x2);
    	
    	dilete.appendChild(link2,x2);
    	break;
    };
};
}

function cargarTablaUsers(){
	var idEdit;
	var idDelete;
	var listcliente =JSON.parse(localStorage.getItem("usuarios"));
	for (var i = 0; i < listcliente.length; i++) {
		for (var j = 0; j < listcliente[i].length; j++) {
			var table = document.getElementById("regtable");
			var row = table.insertRow();
			var numeroUsr = row.insertCell(0);
			var nombreusCell = row.insertCell(1);
			var username_iusCell = row.insertCell(2);
			var password_iusCell = row.insertCell(3);
			var passwordrepetCell = row.insertCell(4);
			var modify = row.insertCell(5);
			var dilete = row.insertCell(6);

			numeroUsr.innerHTML = listcliente[i][0];
			nombreusCell.innerHTML = listcliente[i][1];
			username_iusCell.innerHTML  = listcliente[i][2];
			password_iusCell.innerHTML  = "********************";
			passwordrepetCell.innerHTML = "********************";
			modify.innerHTML = "";
			dilete.innerHTML = "";
			idEdit = listcliente[i][j];
			idDelete = listcliente[i][j];

			var link = document.createElement("A");
			link.setAttribute("href", "Edit User.html");
			link.setAttribute("id" , idEdit);
			link.setAttribute("onclick", "modif(this)");

  		// crea el elemento imagen
  		var x = document.createElement("IMG");
  		x.setAttribute("src", "imagenes/modificar.png");
    	// se lo agrega al elemento link que creo antes
    	link.appendChild(x);

    	// agrega el elmento al body o a quién sea donde se va a agregar, podria ser un div
    	modify.appendChild(link, x);


    	var link2 = document.createElement("A");
    	link2.setAttribute("href","Delete User.html");
    	link2.setAttribute("id" , idDelete);
    	link2.setAttribute("onclick", "elim(this)");


    	var x2 = document.createElement("IMG");
    	x2.setAttribute("src", "imagenes/basurero.png");

    	link2.appendChild(x2);
    	
    	dilete.appendChild(link2,x2);
    	break;
    };
};
}

function cargarNumeroI(){
	debugger;
	var usuario_nombre = (localStorage.getItem("Usuario_Actual")) + "invoices";
	var listInvoices =JSON.parse(localStorage.getItem(usuario_nombre));
	if(listInvoices == null){
		var numeroInv = 0;
		document.getElementById("numero").setAttribute("value", numeroInv);
	}else{
		var numeroInv = listInvoices.length;
		document.getElementById("numero").setAttribute("value", numeroInv);
	}
	
}

function cargarNumeroCH(){
	debugger;
	var usuario_nombre = (localStorage.getItem("Usuario_Actual")) + "chambas";
	var listClient =JSON.parse(localStorage.getItem(usuario_nombre));
	if(listClient == null){
		var numeroCha = 0;
		document.getElementById("numero").setAttribute("value", numeroCha);
	}else{
		var numeroCha = listClient.length;
		document.getElementById("numero").setAttribute("value", numeroCha);
	}
	
}

function cargarNumeroCL(){
	debugger;
	var usuario_nombre = (localStorage.getItem("Usuario_Actual")) + "clientes";
	var listChamba =JSON.parse(localStorage.getItem(usuario_nombre));
	if(listChamba == null){
		var numeroCli = 0;
		document.getElementById("numero").setAttribute("value", numeroCli);
	}else{
		var numeroCli = listChamba.length;
		document.getElementById("numero").setAttribute("value", numeroCli);
	}
	
}


function cargarNumeroUS(){
	debugger;
	var listUser =JSON.parse(localStorage.getItem("usuarios"));
	if(listUser == null){
		var numeroUsr = 0;
		document.getElementById("numero").setAttribute("value", numeroUsr);
	}else{
		var numeroUsr = listUser.length;
		document.getElementById("numero").setAttribute("value", numeroUsr);
	}
	
}
function modif(elemento){
	var id = elemento.id;
	modificar = parseInt(id);
	localStorage.setItem("id",modificar);
}

function cargarEditCha(){
	debugger;
	var usuario_nombre = (localStorage.getItem("Usuario_Actual")) + "chambas";
	var listChamba =JSON.parse(localStorage.getItem(usuario_nombre));
	modificar = JSON.parse(localStorage.getItem("id"));
	for (var i = 0; i < listChamba.length; i++) {
		for (var j = 0; j < listChamba[i].length; j++) {
			if(modificar == listChamba[i][j]){
				da1 =  listChamba[i][j];
				da2 = listChamba[i][j+1];
				da3 = listChamba[i][j+2];
				da4 = listChamba[i][j+3];
				da5 = listChamba[i][j+4];
				document.getElementById("numero").value =  da1;
				document.getElementById("cliente").value = da2;
				document.getElementById("description").value = da3;
				document.getElementById("fecha").value = da4;
				document.getElementById("notas").value = da5;
			}
		};
	};
	
}

function cargarEditClie(){
	var usuario_nombre = (localStorage.getItem("Usuario_Actual")) + "clientes";
	var listChamba =JSON.parse(localStorage.getItem(usuario_nombre));
	modificar = JSON.parse(localStorage.getItem("id"));
	for (var i = 0; i < listChamba.length; i++) {
		for (var j = 0; j < listChamba[i].length; j++) {
			if(modificar == listChamba[i][j]){
				da1 =  listChamba[i][j];
				da2 = listChamba[i][j+1];
				da3 = listChamba[i][j+2];
				da4 = listChamba[i][j+3];
				document.getElementById("numero").value =  da1;
				document.getElementById("id").value = da2;
				document.getElementById("full_name").value = da3;
				document.getElementById("tell").value = da4;
			}
		};
	};
	
}

function cargarEditInv(){
	var usuario_nombre = (localStorage.getItem("Usuario_Actual")) + "invoices";
	var listChamba =JSON.parse(localStorage.getItem(usuario_nombre));
	modificar = JSON.parse(localStorage.getItem("id"));
	for (var i = 0; i < listChamba.length; i++) {
		for (var j = 0; j < listChamba[i].length; j++) {
			if(modificar == listChamba[i][j]){
				da1 =  listChamba[i][j];
				da2 = listChamba[i][j+1];
				da3 = listChamba[i][j+2];
				da4 = listChamba[i][j+3];
				da5 = listChamba[i][j+4];
				document.getElementById("numero").value =  da1;
				document.getElementById("cliente").value = da2;
				document.getElementById("description").value = da3;
				document.getElementById("fecha").value = da4;
				document.getElementById("monto").value = da5;
			}
		};
	};
	
}

function cargarEditUsr(){
	debugger;
	var usuario_nombre = JSON.parse(localStorage.getItem("usuarios"));
	modificar = JSON.parse(localStorage.getItem("id"));
	for (var i = 0; i < usuario_nombre.length; i++) {
		for (var j = 0; j < usuario_nombre[i].length; j++) {
			if(modificar == usuario_nombre[i][j]){
				da1 =  usuario_nombre[i][j];
				da2 = usuario_nombre[i][j+1];
				da3 = usuario_nombre[i][j+2];
				da4 = usuario_nombre[i][j+3];
				da5 = usuario_nombre[i][j+4];
				document.getElementById("numero").value =  da1;
				document.getElementById("fullName").value = da2;
				document.getElementById("user").value = da3;
				document.getElementById("password").value = da4;
				document.getElementById("password_repeat").value = da5;
			}
		};

	}
}

function editarChamba(){
	debugger;
	var usuario_nombre = (localStorage.getItem("Usuario_Actual")) + "chambas";
	var listChamba =JSON.parse(localStorage.getItem(usuario_nombre));
	modificar = JSON.parse(localStorage.getItem("id"));
	for (var i = 0; i < listChamba.length; i++) {
		for (var j = 0; j < listChamba[i].length; j++) {
			if(modificar == listChamba[i][j]){
				//obtener id
				var nn = document.getElementById("numero").value;
			// obtener el cliente
			var c = document.getElementById("cliente").value;
			// obtener la descripcion
			var d = document.getElementById("description").value;
			// obtener la fecha
			var f = document.getElementById("fecha").value;
			// obtener las notas
			var n = document.getElementById("notas").value;
			listChamba[i][j] = nn;
			listChamba[i][j+1] = c;
			listChamba[i][j+2] = d;
			listChamba[i][j+3] = f;
			listChamba[i][j+4] = n;
			localStorage[usuario_nombre] = JSON.stringify(listChamba);
			alert("Se Modificó correctamente");
			location.href = "Chambas Administration.html";
		}
	};
};
}

function editarCliente(){
	debugger;
	var usuario_nombre = (localStorage.getItem("Usuario_Actual")) + "clientes";
	var listCliente =JSON.parse(localStorage.getItem(usuario_nombre));
	modificar = JSON.parse(localStorage.getItem("id"));
	for (var i = 0; i < listCliente.length; i++) {
		for (var j = 0; j < listCliente[i].length; j++) {
			if(modificar == listCliente[i][j]){
				//obtener id
				var n = document.getElementById("numero").value;
				// obtener el numero de cedula
				var c = document.getElementById("id").value;
				// obtener el nombre completo
				var fn = document.getElementById("full_name").value;
				// obtener el numero de telefono
				var t = document.getElementById("tell").value;
				listCliente[i][j] = n;
				listCliente[i][j+1] = c;
				listCliente[i][j+2] = fn;
				listCliente[i][j+3] = t;
				localStorage[usuario_nombre] = JSON.stringify(listCliente);
				alert("Se Modificó correctamente");
				location.href = "Clients Administration.html";
			}
		};
	};
}

function editarInvoice(){
	debugger;
	var usuario_nombre = (localStorage.getItem("Usuario_Actual")) + "invoices";
	var listInvoice =JSON.parse(localStorage.getItem(usuario_nombre));
	modificar = JSON.parse(localStorage.getItem("id"));
	for (var i = 0; i < listInvoice.length; i++) {
		for (var j = 0; j < listInvoice[i].length; j++) {
			if(modificar == listInvoice[i][j]){
				//obtener id
				var n = document.getElementById("numero").value;
			// obtener el cliente
			var c = document.getElementById("cliente").value;
			// obtener la descripcion
			var d = document.getElementById("description").value;
			// obtener la fecha
			var f = document.getElementById("fecha").value;
			// obtener las monto
			var m = document.getElementById("monto").value;
			listInvoice[i][j] = n;
			listInvoice[i][j+1] = c;
			listInvoice[i][j+2] = d;
			listInvoice[i][j+3] = f;
			listInvoice[i][j+4] = m;
			localStorage[usuario_nombre] = JSON.stringify(listInvoice);
			alert("Se Modificó correctamente");
			location.href = "Invoices Administration.html";
		}
	};
};
}

function editarUsers(){
	debugger;
	var listChamba = JSON.parse(localStorage.getItem("usuarios"));
	modificar = JSON.parse(localStorage.getItem("id"));
	for (var i = 0; i < listChamba.length; i++) {
		for (var j = 0; j < listChamba[i].length; j++) {
			if(modificar == listChamba[i][j]){
				//obtener id
				var n = document.getElementById("numero").value;
			// obtener el cliente
			var fn = document.getElementById("fullName").value;
			// obtener la descripcion
			var u = document.getElementById("user").value;
			// obtener la fecha
			var p = document.getElementById("password").value;
			// obtener las notas
			var pr = document.getElementById("password_repeat").value;
			listChamba[i][j] = n;
			listChamba[i][j+1] = fn;
			listChamba[i][j+2] = u;
			listChamba[i][j+3] = p;
			listChamba[i][j+4] = pr;
			localStorage['usuarios'] = JSON.stringify(listChamba);
			alert("Se Modificó correctamente");
			location.href = "ver_usuarios.html";
		}
	};
};
}
function elim(elemento){
	debugger;
	var id = elemento.id;
	eliminar = parseInt(id);
	localStorage.setItem("id",eliminar);
}

function EliminarInvoiceIndicado()
{
	debugger;
	var acumulador = localStorage.getItem("Usuario_Actual") + "invoices";
	var invoices = JSON.parse(localStorage.getItem(acumulador));
	for (i=0; i< invoices.length; i++){
		for (j=0; j< invoices[i].length; j++){
			eliminar = JSON.parse(localStorage.getItem("id"));
			if(eliminar == invoices[i][j]){
				invoices.splice(i, 1);
				localStorage[acumulador] = JSON.stringify(invoices);
				alert("Se Eliminó correctamente");
			}
		}
	}
}

function EliminarChambaIndicada()
{
	debugger;
	var acumulador = localStorage.getItem("Usuario_Actual") + "chambas";
	var chambas=JSON.parse(localStorage.getItem(acumulador));
	for (i=0; i< chambas.length; i++){
		for (j=0; j< chambas[i].length; j++){
			eliminar = JSON.parse(localStorage.getItem("id"));
			if(eliminar == chambas[i][j]){
				chambas.splice(i, 1);
				localStorage[acumulador] = JSON.stringify(chambas);
				alert("Se Eliminó correctamente");
			}
		}
	}
}

function EliminarClientIndicado()
{
	debugger;
	var acumulador = localStorage.getItem("Usuario_Actual") + "clientes";
	var clientes=JSON.parse(localStorage.getItem(acumulador));
	for (i=0; i< clientes.length; i++){
		for (j=0; j< clientes[i].length; j++){
			eliminar = JSON.parse(localStorage.getItem("id"));
			if(eliminar == clientes[i][j]){
				clientes.splice(i, 1);
				localStorage[acumulador] = JSON.stringify(clientes);
				alert("Se Eliminó correctamente");
			}
		}
	}
}

function EliminarUsuarioIndicado()
{
	debugger;
	var chambas = JSON.parse(localStorage.getItem("usuarios"));
	for (i=0; i< chambas.length; i++){
		for (j=0; j< chambas[i].length; j++){
			eliminar = JSON.parse(localStorage.getItem("id"));
			if(eliminar == chambas[i][j]){
				chambas.splice(i, 1);
				localStorage['usuarios'] = JSON.stringify(chambas);
				alert("Se Eliminó correctamente");
			}
		}
	}
}

function cargarListaClientesChambas(){
	debugger;
	var listcliente = (localStorage.getItem("Usuario_Actual")) + "clientes";
	var lista =JSON.parse(localStorage.getItem(listcliente));

	var datalist = document.createElement("datalist");
	datalist.setAttribute("id", "chambass");
	for (var i = 0; i < lista.length; i++) {
		for (var j = 0; j < lista[i].length; j++) {
  			// crea el elemento imagen
  			var opcion = document.createElement("option");
  			opcion.setAttribute("value", lista[i][2]);
    		// se lo agrega al elemento link que creo antes
    		datalist.appendChild(opcion);
    		break;
    	};
    };
    var input = document.getElementById("cliente");
    // agrega el elmento al body o a quién sea donde se va a agregar, podria ser un div
    input.appendChild(datalist);
}

function cargarListaClientesInvoices(){
	debugger;
	var listcliente = (localStorage.getItem("Usuario_Actual")) + "clientes";
	var lista =JSON.parse(localStorage.getItem(listcliente));

	var datalist = document.createElement("datalist");
	datalist.setAttribute("id", "invoicess");
	for (var i = 0; i < lista.length; i++) {
		for (var j = 0; j < lista[i].length; j++) {
  			// crea el elemento imagen
  			var opcion = document.createElement("option");
  			opcion.setAttribute("value", lista[i][2]);
    		// se lo agrega al elemento link que creo antes
    		datalist.appendChild(opcion);
    		break;
    	};
    };
    var input = document.getElementById("cliente");
    // agrega el elmento al body o a quién sea donde se va a agregar, podria ser un div
    input.appendChild(datalist);
}