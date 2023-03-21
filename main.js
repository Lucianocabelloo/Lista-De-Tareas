
let tareasNuevas

let contador = 0

// Obtenemos el id de la lista
let lista = document.getElementById("lista")

// Ver si hay tareas antiguas o si el array está vacío
let tareasViejas = JSON.parse(localStorage.getItem("tareas")) || []

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
	tareasNuevas = document.getElementById("tareas");
	if(tareasNuevas.value == ""){
		return Swal.fire({
			icon: 'error',
			title: 'Oops...',
			text: 'No podes agregar tareas en blanco...',
		})
	}
		Toastify({
	
			text: "Se agrego una tarea",
			
			duration: 3000
			
			}).showToast();

	
	// Guardar la tarea nueva en el array
	tareasViejas.push(tareasNuevas.value)
	tareasNuevas.value = ""
	// Guardar el nuevo array en el localStorage
	mostrarTareas()
}

function mostrarTareas() {
	// Vaciamos el placeholder
	contador;
	lista.innerHTML = ""
	// Mostramos nueva lista por cada tarea, usamos reverse para mostrar la ultima tarea primero
	tareasViejas.forEach((tareasNuevas) => {
	lista.innerHTML += `
	<div class="contenedor-tareas" id="${contador++}">
	<input type="checkbox" name="" class="form-check-input mt-0" id="checkbox">
	<label for="">${tareasNuevas}</label>
	<img src="imagenes/borrar.png" alt="" class="borrar" id="Borrar">
	</div>
`
	})
		localStorage.setItem("tareas", JSON.stringify(tareasViejas))
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
		//console.log(e.srcElement.parentNode.id);
		borrarTarea(e.srcElement.parentNode.id)
	}   
	});

	let borrarTarea = (id) =>{
		let tareaABorrar =  document.getElementById(id);
		lista.removeChild(tareaABorrar);
				let tareasEliminadas = [];

		for (let index = 0; index < tareasViejas.length; index++){
			if (index != tareasEliminadas){
				tareasEliminadas.push(tareasViejas[index])
			}
			console.log("Tareas eliminadas", tareasEliminadas)
			location.reload();
			localStorage.setItem("tareas", JSON.stringify(tareasEliminadas))
		actualizacion();
		}
		
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
	})
	.then((result) => {
		if (result.isConfirmed) {
			e.preventDefault
			localStorage.clear(tareas);
			location.reload();

			return true
		}
	})
}
// pedir informacion a la api 
let climaContainer = document.getElementById("clima-conteiner")
let apiClima = `https://api.openweathermap.org/data/2.5/weather?q=Tucuman&units=metric&appid=4b56f215333470bc78211cf09c98602e`
// recibir informacion de la api 
const pedirData = async () => {
	let clima = []
	let soleado = []
let variableFetch = await fetch(apiClima)
let dataFetch = await variableFetch.json()
clima.push(dataFetch.main.temp)
soleado.push(dataFetch.name)

clima.forEach(dataFetch => {
	const p = document.createElement("p")

	p.innerHTML = `<p>La Temperatura es: <span class="span"> &#127777 </span> ${JSON.stringify(clima)}° en la ciudad de <span class="span"> &#128205 </span> ${JSON.stringify(soleado)} </p>`

	climaContainer.appendChild(p)

})

}


pedirData()
