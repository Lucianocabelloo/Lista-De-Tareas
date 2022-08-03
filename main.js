
let tareasNuevas

let contador = 0

// Obtenemos el id de la lista
let lista = document.getElementById("lista")

// Ver si hay tareas antiguas o si el array está vacío
let tareasViejas = JSON.parse(localStorage.getItem("tareas")) || []

console.log(tareasViejas)
// Si el array viejo tiene items al momento de cargar la página entonces mostramos las tareas

let agregar_tareasViejas = (tareasViejas.length > 0) ?  mostrarTareas() : null



// Boton para agregar las tareas
let boton = document.getElementById("boton")
boton.addEventListener("click", (e) => {
	e.preventDefault()
	agregarTareas()
})

function agregarTareas() {
	// Obtener la tarea nueva
	tareasNuevas = document.getElementById("tareas")
		Toastify({
	
			text: "Se agrego una tarea",
			
			duration: 3000
			
			}).showToast();

	
	// Guardar la tarea nueva en el array
	tareasViejas.push(tareasNuevas.value)
	console.log(tareasViejas)

	tareasNuevas.value = ""

	// Guardar el nuevo array en el localStorage
	localStorage.setItem("tareas", JSON.stringify(tareasViejas))
	mostrarTareas()
}

function mostrarTareas() {
	// Vaciamos el placeholder
	contador++;
	lista.innerHTML = ""
	// Mostramos nueva lista por cada tarea, usamos reverse para mostrar la ultima tarea primero
	tareasViejas.reverse().forEach((tarea) => {
		lista.innerHTML += `
        <div class="contenedor-tareas" id="${contador}">
        <input type="checkbox" name="" class="form-check-input mt-0" id="checkbox">
        <label for="">${tarea}</label>
        <img src="imagenes/borrar.png" alt="" class="borrar" id="Borrar">
        </div>
    `
	})
	
}

// Tareas Pendientes y Completadas
let actualizacion = () =>{
	// Llamaremos a todos los div que seran las Tareas a realizar en la lista
    let element = lista.querySelectorAll(`div`);
	// Llamaremos todos los Checkbox checkeados en la lista
    let checkbox = lista.querySelectorAll(`input[type="checkbox"]:checked`);
	// Pinteremos en el div llamado Stats, las tareas pendientes y tareas a realizar
    stats.innerHTML = `<p>Tareas Totales: ${element.length} Completadas: ${checkbox.length}</p>`;

}

// Agregamos un evento a la lista para saber donde hacemos click
lista.addEventListener("click", (e) =>{
	//Si hacemos un click en cualquier INPUT de la lista se actualizaran los Stats
	if (e.srcElement.nodeName == "INPUT") {
		actualizacion();
	} 
	// si hacemos click en cualquier IMG de la lista se ejecutara la funcion borrar tarea con los parametros id
	else if (e.srcElement.nodeName == "IMG"){
		console.log(e.srcElement.parentNode.id);
		borrarTarea(e.srcElement.parentNode.id)
	}   
	});

	let borrarTarea = (id) =>{
		let tareaABorrar =  document.getElementById(id);
		lista.removeChild(tareaABorrar);
		actualizacion();
		}


		// Vaciar Lista

		let botonReset = document.getElementById("reset");

botonReset.addEventListener("click", vaciarLista);
// Cuando se apriete vaciar lista, se limpiara el localstorage y se recargara la pagina
function vaciarLista (e){
	Swal.fire({
		title: 'Estas seguro que queres vaciar la lista?',
		text: "Esta no se podra recuperar luego",
		icon: 'warning',
		showCancelButton: true,
		confirmButtonColor: '#3085d6',
		cancelButtonColor: '#d33',
		confirmButtonText: 'Si, quiero elimiar esto!'
	}).then((result) => {
		if (result.isConfirmed) {
			e.preventDefault
			localStorage.clear(tareas);
			location.reload();
			return true;
		Swal.fire(
			'Eliminado!',
			'Tu lista ha sido borrada',
			'Finalizado'
		)
		}
	  })
}

/*

let retVal = confirm("¿Seguro desea continuar?");
if( retVal == true ){

}

*/