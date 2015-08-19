// variable para guardar el id de las imagenes para modificar
var modificar = 0;
// variable para guardar el id de las imagenes para eliminar
var eliminar = 0;
// variable que guarda cada uno de los arreglos
var usuario = [];
// variable que guarda todos los arreglos
var User = JSON.parse(localStorage.getItem("usuarios"));
// variable que guarda cual es el usuario actual
var user_actual;
// variable para validar
var validar = null;
// variable para guardar los datos que se van a modificar
var da1;
// variable para guardar los datos que se van a modificar
var da2;
// variable para guardar los datos que se van a modificar
var da3;
// variable para guardar los datos que se van a modificar
var da4;
// variable para guardar los datos que se van a modificar
var da5;
// variable para guardar los datos que se van a modificar
var da6;

// Esta funcion valida cada usuario que se desea logear
function iniciar_Sesion()
{
	// obtiene el nombre del usuario
	var nombre_usuario = document.getElementById("user").value;
	// obtiene la contraseña del usuario
	var contrasenna = document.getElementById("password").value;
	// pregunta si el nombre es admin y la contraseña es $uperadmin para saber si es el administrador
	if(nombre_usuario === "admin" && contrasenna === "$uper4dmin"){
		// si es asi validar va a decir que el que va a iniciar sesion es el administrador
		validar = "Entra como administracion";
		// entonces el usuario actual va a ser admin
		user_actual = 'Admin';
		// se va al localstorage y guarda el usuario actual para saber quien fue el que entró
		localStorage.setItem("Usuario_Actual",user_actual);
		// si no fuera así
	}else{
		// se va a la funcion donde valida si el usuario existe o no y si existe cual es
		validacion();
	}
	// si validar fuera igual a nulo
	if(validar === null){
		// se muestra un mensaje donde le indica que lo debe crear primero entonces no puede iniciar sesion
		alert("Debe crearlo primero antes de iniciar sesion");
		// si validar fuera que entra coo administrador
	}else if(validar === "Entra como administracion"){
		// entonces entra como administrador
		location.href="tablero-de-instrucciones.html";
		// muestra un mensaje de bienvenida
		alert("BIENVENIDO");
		// si validar fuera que entra como particular
	}else if(validar === "Entra como particular"){
		// entonces se valida el nombre de usuario para saber quien es.
		user_actual = document.getElementById("user").value;
		//lo guarda en el localstorage
		localStorage.setItem("Usuario_Actual", user_actual);
		// entra como particular
		location.href="tablero-de-instrucciones.html";
		// muestra un mensaje de bienvenida
		alert("BIENVENIDO");
	}

}

// funcion que crea un usuario
function crear_usuario()
{
	// se va al metodo de validacion
	validacion();
	//debugger;
	// si validar es igual a nulo
	if(validar === null){
		// se va a crear un nuevo usuario
		usuario = [];
		// se obtiene la contraseña
		var contrasenna = document.getElementById("password").value;
		// se optiene la repeticion de la contraseña
		var contrasenna_repeat = document.getElementById("password_repeat").value;
		// si la contraseña es vacia o nula
		if(contrasenna == "" || contrasenna == null){
			// muestra un mensaje de error
			alert("No puede dejar el campo de contraseña vacio");
			// si la repeticion de la contraseña es vacio o nula
		}else if(contrasenna_repeat == "" || contrasenna_repeat == null){
			// muestra un mensaje de error
			alert("No puede dejar el campo de repetir contraseña vacio");
		}else{
			// si la contraseña es igual a la repeticion de la contraseña
			if(contrasenna === contrasenna_repeat){
				// obtiene el nombre de usuario
				var nombreU = document.getElementById("user").value;
				// obtiene el nombre completo
				var nombreFull = document.getElementById("fullName").value;
				// pregunta que si el nombre de usuario es vacio o nulo
				if(nombreU == "" || nombreU == null){
					// si es asi muestra un mensaje de error
					alert("No puede dejar el campo de nombre de usuario vacio");
					// pregunta que si el nombre completo es vacio o nulo
				}else if(nombreFull == "" || nombreFull == null){
					// muestra un mensaje de error
					alert("No puede dejar el campo de nombre completo vacio");
					// si no fuera asi
				}else{

					// crea el usuario
					usuario.push(document.getElementById("numero").value, document.getElementById("fullName").value, document.getElementById("user").value,
						document.getElementById("password").value, document.getElementById("password_repeat").value);
					// lo agrega al arreglo de usuarios
					User.push(usuario);
					// agrega el arreglo de arreglos al localstorage con el usuario nuevo
					localStorage['usuarios'] = JSON.stringify(User);
					// muestra un mensaje que ya puede iniciar sesion
					alert("Usuario creado ya puedes iniciar sesion");
					// se va a la pagina principal
					location.href="tablero-de-instrucciones.html"
				}
				// si no fuera asi
			}else{
				// muestra un mensaje de error donde muestra que las contraseñas son diferentes
				alert("No puedes crear el usuario porque las contraseñas son diferentes, asegurese que sea las mismas");
			}
		}
		// si no es asi pregunta que si es administrador
	}else if(validar === "Entra como administracion"){
		// si es asi no lo puede crear porque ya exite
		alert("No puedes crear con ese nombre de usuario porque ya existe");
		// si no es asi pregunta que si es particular
	}else if(validar === "Entra como particular"){
		// si es asi no lo puede crear porque ya exite
		alert("No puedes crear con ese nombre de usuario porque ya existe");
		// si no es asi pregunta si no se pudo crear
	}else if(validar === "No_se_pudo_crear"){
		// si es asi no lo puede crear
		alert("No se pudo crear el usuario");
		// se le asigna a validar el valor de nulo
		validar = null;
	}
} 

// funcion que valida el login
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

// funcion obtiene el usuario actual y lo envia a la funcion asignarNombre
function usuario(){
	var nombreDelUsuario = document.getElementById("user");
	asignarNombre(nombreDelUsuario);
}

//coloca en el hi user el nombre del usuario actual
function asignarNombre(nombreUsuario){
	var nombreU = nombreUsuario;
	var elemento = document.getElementById("Hi_user");
	elemento.innerHTML = nombreU;
}

//valida si el usuario es administrador o particular
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

// variable donde digo que las chambas es un arreglo vacio
var chambas = [];
// funcion que agrega las chambas
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
	if(cliente == "" || cliente == null){
		alert("No puede dejar el campo de cliente vacio");
	}else if(description == "" || description == null){
		alert("No puede dejar el campo de descripcion vacio");
	}else if(fecha == "" || fecha == null){
		alert("No puede dejar el campo de fecha vacio");
	}else if(notas == "" || notas == null){
		alert("No puede dejar el campo de notas vacio");
	}else{
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
}

// funcion donde cargo las chambas a la tabla de chambas
function cargarTablaChambas(){
	//debugger
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

//variable donde digo que los clientes es un arreglo vacio
var clientes = [];
// funcion que agrega los clientes
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
	if(id == "" || id == null){
		alert("No puede dejar el campo de cedula vacio");
	}else if(full_name == "" || full_name == null){
		alert("No puede dejar el campo de nombre completo vacio");
	}else if(telephone == "" || telephone == null){
		alert("No puede dejar el campo de telefono vacio");
	}else{
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
}

// funcion donde cargo los clientes a la tabla de clientes
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

//variable donde digo que los invoices es un arreglo vacio
var invoices = [];
// funcion que agrega los invoices
function agregarInvoices(){
	//debugger;
	var usuario_nombre = (localStorage.getItem("Usuario_Actual")) + "invoices";
	var arreglo = JSON.parse(localStorage.getItem(usuario_nombre));
	var numeroInvoice = document.getElementById("numero").value;
	var cliente = document.getElementById("cliente").value;
	var description = document.getElementById("description").value;
	var fecha = document.getElementById("fecha").value;
	var monto = document.getElementById("monto").value;
	var modify;
	var dilete;
	if(cliente == "" || cliente == null){
		alert("No puede dejar el campo de cliente vacio");
	}else if(description == "" || description == null){
		alert("No puede dejar el campo de descripcion vacio");
	}else if(fecha == "" || fecha == null){
		alert("No puede dejar el campo de fecha vacio");
	}else if(monto == "" || monto == null){
		alert("No puede dejar el campo de monto vacio");
	}else{
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
}

// funcion donde cargo los invoices a la tabla de invoices
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

// funcion que carga los usuarios en la tabla de usuarios
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

// funcion que carga el id de los invoices
function cargarNumeroI(){
	//debugger;
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

// funcion que carga el id de las chambas
function cargarNumeroCH(){
	//debugger;
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

// funcion que carga el id de los clientes
function cargarNumeroCL(){
	//debugger;
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

// funcion que carga el id de los usuarios
function cargarNumeroUS(){
	//debugger;
	var listUser =JSON.parse(localStorage.getItem("usuarios"));
	if(listUser == null){
		var numeroUsr = 0;
		document.getElementById("numero").setAttribute("value", numeroUsr);
	}else{
		var numeroUsr = listUser.length;
		document.getElementById("numero").setAttribute("value", numeroUsr);
	}
	
}

// funcion donde obtengo el id para asignarselo a la imagen modificar
function modif(elemento){
	// obtengo el id actual
	var id = elemento.id;
	// le digo que la variable modificar es idual a ese id
	modificar = parseInt(id);
	// le coloco el dato del id al localstorage
	localStorage.setItem("id",modificar);
}

// funcion que carga los datos en cada uno de los input 
function cargarEditCha(){
	//debugger;
	// le asigno a la variable el nombre donde se guardan las chambas
	var usuario_nombre = (localStorage.getItem("Usuario_Actual")) + "chambas";
	// parseo la variable para obtener los arreglos
	var listChamba =JSON.parse(localStorage.getItem(usuario_nombre));
	// le asigno a la variable modificar el id que esta actualmente
	modificar = JSON.parse(localStorage.getItem("id"));
	// recorro el arreglo de arreglos
	for (var i = 0; i < listChamba.length; i++) {
		// recorro cada uno de los arreglos
		for (var j = 0; j < listChamba[i].length; j++) {
			// pregunto que si modificar es igual al id actual
			if(modificar == listChamba[i][j]){
				// si es asi, a la variable da1 le asigno el valor de la posicion 0
				da1 =  listChamba[i][j];
				//a la variable da2 le asigno el valor de la posicion 1
				da2 = listChamba[i][j+1];
				//a la variable da3 le asigno el valor de la posicion 2
				da3 = listChamba[i][j+2];
				//a la variable da4 le asigno el valor de la posicion 3
				da4 = listChamba[i][j+3];
				//a la variable da5 le asigno el valor de la posicion 4
				da5 = listChamba[i][j+4];
				// luego obtengo el input respectivo y le asigno el valor correspondiente
				document.getElementById("numero").value =  da1;
				// luego obtengo el input respectivo y le asigno el valor correspondiente
				document.getElementById("cliente").value = da2;
				// luego obtengo el input respectivo y le asigno el valor correspondiente
				document.getElementById("description").value = da3;
				// luego obtengo el input respectivo y le asigno el valor correspondiente
				document.getElementById("fecha").value = da4;
				// luego obtengo el input respectivo y le asigno el valor correspondiente
				document.getElementById("notas").value = da5;
				
			}
		};
	};
	
}

// funcion que carga los datos en cada uno de los input 
function cargarEditClie(){
	// le asigno a la variable el nombre donde se guardan los clientes
	var usuario_nombre = (localStorage.getItem("Usuario_Actual")) + "clientes";
	// parseo la variable para obtener los arreglos
	var listChamba =JSON.parse(localStorage.getItem(usuario_nombre));
	// le asigno a la variable modificar el id que esta actualmente
	modificar = JSON.parse(localStorage.getItem("id"));
	// recorro el arreglo de arreglos
	for (var i = 0; i < listChamba.length; i++) {
		// recorro cada uno de los arreglos
		for (var j = 0; j < listChamba[i].length; j++) {
			// pregunto que si modificar es igual al id actual
			if(modificar == listChamba[i][j]){
				// si es asi, a la variable da1 le asigno el valor de la posicion 0
				da1 =  listChamba[i][j];
				//a la variable da2 le asigno el valor de la posicion 1
				da2 = listChamba[i][j+1];
				//a la variable da3 le asigno el valor de la posicion 2
				da3 = listChamba[i][j+2];
				//a la variable da4 le asigno el valor de la posicion 3
				da4 = listChamba[i][j+3];
				// luego obtengo el input respectivo y le asigno el valor correspondiente
				document.getElementById("numero").value =  da1;
				// luego obtengo el input respectivo y le asigno el valor correspondiente
				document.getElementById("id").value = da2;
				// luego obtengo el input respectivo y le asigno el valor correspondiente
				document.getElementById("full_name").value = da3;
				// luego obtengo el input respectivo y le asigno el valor correspondiente
				document.getElementById("tell").value = da4;
			}
		};
	};
	
}

// funcion que carga los datos en cada uno de los input 
function cargarEditInv(){
	// le asigno a la variable el nombre donde se guardan los invoices
	var usuario_nombre = (localStorage.getItem("Usuario_Actual")) + "invoices";
	// parseo la variable para obtener los arreglos
	var listChamba =JSON.parse(localStorage.getItem(usuario_nombre));
	// le asigno a la variable modificar el id que esta actualmente
	modificar = JSON.parse(localStorage.getItem("id"));
	// recorro el arreglo de arreglos
	for (var i = 0; i < listChamba.length; i++) {
		// recorro cada uno de los arreglos
		for (var j = 0; j < listChamba[i].length; j++) {
			// pregunto que si modificar es igual al id actual
			if(modificar == listChamba[i][j]){
				// si es asi, a la variable da1 le asigno el valor de la posicion 0
				da1 =  listChamba[i][j];
				//a la variable da2 le asigno el valor de la posicion 1
				da2 = listChamba[i][j+1];
				//a la variable da3 le asigno el valor de la posicion 2
				da3 = listChamba[i][j+2];
				//a la variable da4 le asigno el valor de la posicion 3
				da4 = listChamba[i][j+3];
				//a la variable da5 le asigno el valor de la posicion 4
				da5 = listChamba[i][j+4];
				// luego obtengo el input respectivo y le asigno el valor correspondiente
				document.getElementById("numero").value =  da1;
				// luego obtengo el input respectivo y le asigno el valor correspondiente
				document.getElementById("cliente").value = da2;
				// luego obtengo el input respectivo y le asigno el valor correspondiente
				document.getElementById("description").value = da3;
				// luego obtengo el input respectivo y le asigno el valor correspondiente
				document.getElementById("fecha").value = da4;
				// luego obtengo el input respectivo y le asigno el valor correspondiente
				document.getElementById("monto").value = da5;
			}
		};
	};
	
}

// funcion que carga los datos en cada uno de los input 
function cargarEditUsr(){
	//debugger;
	// parseo los usuarios para obtener los arreglos
	var usuario_nombre = JSON.parse(localStorage.getItem("usuarios"));
	// le asigno a la variable modificar el id que esta actualmente
	modificar = JSON.parse(localStorage.getItem("id"));
	// recorro el arreglo de arreglos
	for (var i = 0; i < usuario_nombre.length; i++) {
		// recorro cada uno de los arreglos
		for (var j = 0; j < usuario_nombre[i].length; j++) {
			// pregunto que si modificar es igual al id actual
			if(modificar == usuario_nombre[i][j]){
				// si es asi, a la variable da1 le asigno el valor de la posicion 0
				da1 =  usuario_nombre[i][j];
				//a la variable da2 le asigno el valor de la posicion 1
				da2 = usuario_nombre[i][j+1];
				//a la variable da3 le asigno el valor de la posicion 2
				da3 = usuario_nombre[i][j+2];
				//a la variable da4 le asigno el valor de la posicion 3
				da4 = usuario_nombre[i][j+3];
				//a la variable da5 le asigno el valor de la posicion 4
				da5 = usuario_nombre[i][j+4];
				// luego obtengo el input respectivo y le asigno el valor correspondiente
				document.getElementById("numero").value =  da1;
				// luego obtengo el input respectivo y le asigno el valor correspondiente
				document.getElementById("fullName").value = da2;
				// luego obtengo el input respectivo y le asigno el valor correspondiente
				document.getElementById("user").value = da3;
				// luego obtengo el input respectivo y le asigno el valor correspondiente
				document.getElementById("password").value = da4;
				// luego obtengo el input respectivo y le asigno el valor correspondiente
				document.getElementById("password_repeat").value = da5;
			}
		};

	}
}

// funcion que edita las chambas
function editarChamba(){
	//debugger;
	// le asigno a una variable el nombre con el que estan guardados las chambas
	var usuario_nombre = (localStorage.getItem("Usuario_Actual")) + "chambas";
	// parsea el nombre que se obtuvo para obtener los arreglos 
	var listChamba =JSON.parse(localStorage.getItem(usuario_nombre));
	// busca el id que esta actualmente y se lo asigna a la variable modificar
	modificar = JSON.parse(localStorage.getItem("id"));
	// recorro el arreglo de arreglos
	for (var i = 0; i < listChamba.length; i++) {
		// recorro cada uno de los arreglos
		for (var j = 0; j < listChamba[i].length; j++) {
			// pregunto que si modificar es igual al id actual
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
			// pregunto que si el cliente es vacio o nulo
			if(c == "" || c == null){
				// si es asi muestro un mensaje de error
				alert("No puede dejar el campo de cliente vacio");
				break;
				// si no pregunto que si la descripcion es vacia o nula
			}else if(d == "" || d == null){
				// si es asi muestro un mensaje de error
				alert("No puede dejar el campo de descripcion vacio");
				break;
				// si no pregunto que si la fecha es vacia o nula
			}else if(f == "" || f == null){
				// si es asi muestro un mensaje de error
				alert("No puede dejar el campo de fecha vacio");
				break;
				// si no pregunto que si las notas son vacias o nulas
			}else if(n == "" || n == null){
				// si es asi muestro un mensaje de error
				alert("No puede dejar el campo de notas vacio");
				break;
				// si no es asi
			}else{
				// le digo que el elemento actual en la posicion 0 es igual a el id
				listChamba[i][j] = nn;
				// la posicion 1 es igual al cliente
				listChamba[i][j+1] = c;
				// la posicion 2 es igual a la descripcion
				listChamba[i][j+2] = d;
				// la posicion 3 es igual a la fecha
				listChamba[i][j+3] = f;
				// la posicion 4 es igual a las notas
				listChamba[i][j+4] = n;
				// le vuelvo a insertar los arreglos con el actual modificado
				localStorage[usuario_nombre] = JSON.stringify(listChamba);
				// muestro un mensaje para que el usuario sepa que fue modificado
				alert("Se Modificó correctamente");
				// me voy a la tabla para corroborar que se modificó
				location.href = "Chambas Administration.html";
				break;
			}
		}
	};
};
}

// funcion que edita los clientes
function editarCliente(){
	//debugger;
	// le asigno a una variable el nombre con el que estan guardados los clientes
	var usuario_nombre = (localStorage.getItem("Usuario_Actual")) + "clientes";
	// parsea el nombre que se obtuvo para obtener los arreglos 
	var listCliente =JSON.parse(localStorage.getItem(usuario_nombre));
	// busca el id que esta actualmente y se lo asigna a la variable modificar
	modificar = JSON.parse(localStorage.getItem("id"));
	// recorro el arreglo de arreglos
	for (var i = 0; i < listCliente.length; i++) {
		// recorro cada uno de los arreglos
		for (var j = 0; j < listCliente[i].length; j++) {
			// pregunto que si modificar es isual al id actual
			if(modificar == listCliente[i][j]){
				//obtener id
				var n = document.getElementById("numero").value;
				// obtener el numero de cedula
				var c = document.getElementById("id").value;
				// obtener el nombre completo
				var fn = document.getElementById("full_name").value;
				// obtener el numero de telefono
				var t = document.getElementById("tell").value;
				// pregunto que si la cedula es vacia o nula
				if(c == "" || c == null){
					// si es asi muestro un mensaje de error
					alert("No puede dejar el campo de cedula vacio");
					break;
					// si no pregunto que si el nombre completo es vacio o nulo
				}else if(fn == "" || fn == null){
					// si es asi muestro un mensaje de error
					alert("No puede dejar el campo de nombre completo vacio");
					break;
					// si no pregunto que si el numero de telefono es vacio o nulo
				}else if(t == "" || t == null){
					// si es asi muestro un mensaje de error
					alert("No puede dejar el campo de telefono vacio");
					break;
					// si no es asi
				}else{
					// le digo que el elemento actual en la posicion 0 es igual a el id
					listCliente[i][j] = n;
					// la posicion 1 es igual a la cedula
					listCliente[i][j+1] = c;
					// la posicion 2 es igual al nombre completo
					listCliente[i][j+2] = fn;
					// la posicion 3 es igual a el numero de telefono
					listCliente[i][j+3] = t;
					// le vuelvo a insertar los arreglos con el actual modificado
					localStorage[usuario_nombre] = JSON.stringify(listCliente);
					// muestro un mensaje para que el usuario sepa que fue modificado
					alert("Se Modificó correctamente");
					// me voy a la tabla para corroborar que se modificó
					location.href = "Clients Administration.html";
				}
			}
		};
	};
}

// funcion que edita los invoices
function editarInvoice(){
	//debugger;
	// le asigno a una variable el nombre con el que estan guardados los invoices
	var usuario_nombre = (localStorage.getItem("Usuario_Actual")) + "invoices";
	// parsea el nombre que se obtuvo para obtener los arreglos 
	var listInvoice =JSON.parse(localStorage.getItem(usuario_nombre));
	// busca el id que esta actualmente y se lo asigna a la variable modificar
	modificar = JSON.parse(localStorage.getItem("id"));
	// recorro el arreglo de arreglos
	for (var i = 0; i < listInvoice.length; i++) {
		// recorro cada uno de los arreglos
		for (var j = 0; j < listInvoice[i].length; j++) {
			// pregunto que si modificar es isual al id actual
			if(modificar == listInvoice[i][j]){
				//si es asi obtener id
				var n = document.getElementById("numero").value;
			// obtener el cliente
			var c = document.getElementById("cliente").value;
			// obtener la descripcion
			var d = document.getElementById("description").value;
			// obtener la fecha
			var f = document.getElementById("fecha").value;
			// obtener las monto
			var m = document.getElementById("monto").value;
			// pregunto que si el cliente es vacio o nulo
			if(c == "" || c == null){
				// si es asi muetro un mensaje de error
				alert("No puede dejar el campo de cliente vacio");
				break;
				// si no, pregunto que si la descripcion es vacia o nula
			}else if(d == "" || d == null){
				// si es asi muestro un mensaje de error
				alert("No puede dejar el campo de descripcion vacio");
				break;
				// si no pregunto que si la fecha es vacia o nula
			}else if(f == "" || f == null){
				// si es asi se muestra un mensaje de error
				alert("No puede dejar el campo de fecha vacio");
				break;
				// si no, pregunto que si es monto es vacio o nulo
			}else if(m == "" || m == null){
				// si es asi muestro un mensaje de error
				alert("No puede dejar el campo de monto vacio");
				break;
				// si no es asi
			}else{
				// le digo que el elemento actual en la posicion 0 es igual a el id
				listInvoice[i][j] = n;
				// la posicion 1 es igual a el cliente
				listInvoice[i][j+1] = c;
				// la posicion 2 es igual a la descripcion
				listInvoice[i][j+2] = d;
				// la posicion 3 es igual a la fecha
				listInvoice[i][j+3] = f;
				// la posicion 4 es igual al monto
				listInvoice[i][j+4] = m;
				// le vuelvo a insertar los arreglos con el actual modificado
				localStorage[usuario_nombre] = JSON.stringify(listInvoice);
				// muestro un mensaje para que el usuario sepa que fue modificado
				alert("Se Modificó correctamente");
				// me voy a la tabla para corroborar que se modificó
				location.href = "Invoices Administration.html";
			}
		}
	};
};
}

// funcion que edita los usuarios
function editarUsers(){
	//debugger;
	// variable que obtengo el arreglo donde estan guardados los usuarios
	var listChamba = JSON.parse(localStorage.getItem("usuarios"));
	// obtengo el id para poder modificar el elemento actual
	modificar = JSON.parse(localStorage.getItem("id"));
	// recorro el arreglo de arreglos de los usuarios
	for (var i = 0; i < listChamba.length; i++) {
		// recorro cada uno de los arreglos
		for (var j = 0; j < listChamba[i].length; j++) {
			// pregunto que si el modificar es igual al id actual
			if(modificar == listChamba[i][j]){
				// si si es igual obtener id
				var n = document.getElementById("numero").value;
			// obtener el nombre completo
			var fn = document.getElementById("fullName").value;
			// obtener el nombre de usuario
			var u = document.getElementById("user").value;
			// obtener la contraseña
			var p = document.getElementById("password").value;
			// obtener la contraseña repetida
			var pr = document.getElementById("password_repeat").value;
			// pregunto si las contraseñas son vacias o nulas
			if(fn == "" || fn == null){
				// si es asi muestro un mensaje de error
				alert("No puede dejar el campo de nombre completo vacio");
				break;
				// si no, pregunto que si el nombre de usuario es vacio o nulo
			}else if(u == "" || u == null){
				// si es asi muestro un mensaje de error
				alert("No puede dejar el campo de nombre de usuario vacio");
				break;
				// si no 
			}else{
				// pregunto que si nas contraseñas son iguales
				if(p == pr){
					// si es asi, le digo que elemento actual en la posicion 0 es igual al id
					listChamba[i][j] = n;
					// la posicion 1 es igual al nombre completo
					listChamba[i][j+1] = fn;
					// la posicion 2 es igual a el nombre de usuario
					listChamba[i][j+2] = u;
					// la posicion 3 es igual a la contraseña
					listChamba[i][j+3] = p;
					// y la posicion 4 es igual a la contraseña repetida
					listChamba[i][j+4] = pr;
					// agrego la modificacion al localstorage
					localStorage['usuarios'] = JSON.stringify(listChamba);
					// muestro el mensaje para que se de cuenta el usuario que fue modificado
					alert("Se Modificó correctamente");
					// me voy a la tabla para corroborar que se modificó
					location.href = "ver_usuarios.html";
					// si no fuera asi
				}else{
					// muestro el mensaje de error porque las contraseñas son diferentes
					alert("No puede modificar el usuario porque las contraseñas son diferentes");
				}
			}
		}
	};
};
}

// funcion que guarda el id actial del basurero
function elim(elemento){
	//debugger;
	// tengo esta variable para que me guarde el id actual
	var id = elemento.id;
	// le digo a la variable global eliminar que sea igual a el id actual
	eliminar = parseInt(id);
	// coloca el id actual en una variable del localstorage
	localStorage.setItem("id",eliminar);
}

// funcion que me elimina el invoice seleccionado
function EliminarInvoiceIndicado(){
	//debugger;
	// este obtiene el nombre donde guardo los invoices en el localstorage ('Noeliainvoices')
	var acumulador = localStorage.getItem("Usuario_Actual") + "invoices";
	// este obtiene ese nombre ('Noeliainvoices')y lo parsea para poder obtener el arreglo de arreglos 
	var invoices = JSON.parse(localStorage.getItem(acumulador));
	// este for recorre todo el arreglo de arreglos
	for (i=0; i< invoices.length; i++){
		// este for recorre cada uno de esos arreglos
		for (j=0; j< invoices[i].length; j++){
			// esta variable es para obtener el id del elemento en el que estoy actualmente
			eliminar = JSON.parse(localStorage.getItem("id"));
			// pregunto que si ese id es igual al id del invoice
			if(eliminar == invoices[i][j]){
				// si es igual, intonces le digo que me elimine el que esta actualmente o sea i
				invoices.splice(i, 1);
				// luego vuelvo a guardarlo en localstorage todos loa arreglos menos el que eliminó obviamente
				localStorage[acumulador] = JSON.stringify(invoices);
				// muestro el mensaje para saber que se eliminó
				alert("Se Eliminó correctamente");
			}
		}
	}
}

//funcion que me elimina la chamba seleccionada
function EliminarChambaIndicada(){
	//debugger;
	// este obtiene el nombre donde guardo las chambas en el localstorage ('Noeliachambas')
	var acumulador = localStorage.getItem("Usuario_Actual") + "chambas";
	// este obtiene ese nombre ('Noeliachambas')y lo parsea para poder obtener el arreglo de arreglos 
	var chambas=JSON.parse(localStorage.getItem(acumulador));
	// este for recorre todo el arreglo de arreglos
	for (i=0; i< chambas.length; i++){
		// este for recorre cada uno de esos arreglos
		for (j=0; j< chambas[i].length; j++){
			// esta variable es para obtener el id del elemento en el que estoy actualmente
			eliminar = JSON.parse(localStorage.getItem("id"));
			// pregunto que si ese id es igual al id de la chamba
			if(eliminar == chambas[i][j]){
				// si es igual, intonces le digo que me elimine el que esta actualmente o sea i
				chambas.splice(i, 1);
				// luego vuelvo a guardarlo en localstorage todos loa arreglos menos el que eliminó obviamente
				localStorage[acumulador] = JSON.stringify(chambas);
				// muestro el mensaje para saber que se eliminó
				alert("Se Eliminó correctamente");
			}
		}
	}
}

// funcion que me elimina cada uno de los clientes
function EliminarClientIndicado(){
	//debugger;
	// este obtiene el nombre donde guardo los clientes en el localstorage ('Noeliaclientes')
	var acumulador = localStorage.getItem("Usuario_Actual") + "clientes";
	// este obtiene ese nombre ('Noeliaclientes')y lo parsea para poder obtener el arreglo de arreglos 
	var clientes=JSON.parse(localStorage.getItem(acumulador));
	// este for recorre todo el arreglo de arreglos
	for (i=0; i< clientes.length; i++){
		// este for recorre cada uno de esos arreglos
		for (j=0; j< clientes[i].length; j++){
			// esta variable es para obtener el id del elemento en el que estoy actualmente
			eliminar = JSON.parse(localStorage.getItem("id"));
			// pregunto que si ese id es igual al id del cliente
			if(eliminar == clientes[i][j]){
				// si es igual, intonces le digo que me elimine el que esta actualmente o sea i
				clientes.splice(i, 1);
				// luego vuelvo a guardarlo en localstorage todos loa arreglos menos el que eliminó obviamente
				localStorage[acumulador] = JSON.stringify(clientes);
				// muestro el mensaje para saber que se eliminó
				alert("Se Eliminó correctamente");
			}
		}
	}
}

// funcion que elimina cada uno de los usuarios
function EliminarUsuarioIndicado(){
	//debugger;
	// obtiene el arreglo a la hora de parsear los usuarios
	var chambas = JSON.parse(localStorage.getItem("usuarios"));
	// este for recorre el arreglo de arreglos
	for (i=0; i< chambas.length; i++){
		// este for recorre cada uno de los arreglos
		for (j=0; j< chambas[i].length; j++){
			// le asigno a la variable eliminar el id que está actualmente
			eliminar = JSON.parse(localStorage.getItem("id"));
			// pregunto que si el id de eliminar es igual al id actual
			if(eliminar == chambas[i][j]){
				// si es verdad elimina el elemento que esta actualmente
				chambas.splice(i, 1);
				// vuelvo a guardar todos los arreglos sin el que se eliminó obviamente
				localStorage['usuarios'] = JSON.stringify(chambas);
				// muestro el mensaje que me dice que se eliminó
				alert("Se Eliminó correctamente");
			}
		}
	}
}

// funcion que hace el datalist y le agrega los clientes que existen 
function cargarListaClientesChambas(){
	//debugger;
	// variable que obtiene el nombre con el que estan guardados los clientes
	var listcliente = (localStorage.getItem("Usuario_Actual")) + "clientes";
	// ese nombre lo parsea para obtener los arreglos
	var lista =JSON.parse(localStorage.getItem(listcliente));
	// crea un elemento datalist
	var datalist = document.createElement("datalist");
	// a ese elemento le agrego un id 
	datalist.setAttribute("id", "chambass");
	// recorro la lista de los cliente, donde esta el arreglo de arreglos
	for (var i = 0; i < lista.length; i++) {
		// recorro cada uno de los arreglos para obtener el nombre de los clientes
		for (var j = 0; j < lista[i].length; j++) {
  			// crea el elemento de opcion que tiene el datalist
  			var opcion = document.createElement("option");
  			// a la obcion le agrego el valor del nombre del cliente que esta actualmente
  			opcion.setAttribute("value", lista[i][2]);
    		// se lo agrega al elemento datalist que creo antes 
    		// aqui es como le voy agregando de uno en uno al datalist 
    		datalist.appendChild(opcion);
    		break;
    	};
    };
    // creo una variable para que me obtenga el input que le voy a agregar el datalist
    var input = document.getElementById("cliente");
    // agrega el elmento datalist con sus respectivos options a dicho input
    input.appendChild(datalist);
}

// funcion que hace el datalist y le agrega los clientes que existen 
function cargarListaClientesInvoices(){
	//debugger;
	// variable que obtiene el nombre con el que estan guardados los clientes
	var listcliente = (localStorage.getItem("Usuario_Actual")) + "clientes";
	// ese nombre lo parsea para obtener los arreglos
	var lista =JSON.parse(localStorage.getItem(listcliente));
	// crea un elemento datalist
	var datalist = document.createElement("datalist");
	// a ese elemento le agrego un id 
	datalist.setAttribute("id", "invoicess");
	// recorro la lista de los cliente, donde esta el arreglo de arreglos
	for (var i = 0; i < lista.length; i++) {
		// recorro cada uno de los arreglos para obtener el nombre de los clientes
		for (var j = 0; j < lista[i].length; j++) {
  			// crea el elemento de opcion que tiene el datalist
  			var opcion = document.createElement("option");
  			// a la obcion le agrego el valor del nombre del cliente que esta actualmente
  			opcion.setAttribute("value", lista[i][2]);
    		// se lo agrega al elemento datalist que creo antes 
    		// aqui es como le voy agregando de uno en uno al datalist 
    		datalist.appendChild(opcion);
    		break;
    	};
    };
    // creo una variable para que me obtenga el input que le voy a agregar el datalist
    var input = document.getElementById("cliente");
    // agrega el elmento datalist con sus respectivos options a dicho input
    input.appendChild(datalist);
}