listadetareas.addEventListener("submit", ()=>{

AgregarTarea();

})



let input = document.getElementById("tareas");
let contador = 0;
let tareasDelDia = [];

let AgregarTarea = function(){
    contador++;
    
    let tarea_agregada = input.value;
    if(tarea_agregada == ""){
        
        return alert("Tenes que introducir texto")
    }
    input.value = ``;
    

    lista.innerHTML += 
    `
        <div class="contenedor-tareas" id="${contador}">
                <input type="checkbox" name="" id="checkbox">
                <label for="">${tarea_agregada}</label>
                <img src="imagenes/borrar.png" alt="" class="borrar" id="Borrar">
            </div>
        </div>
        `
        actualizacion();
}



let actualizacion = () =>{
    let element = lista.querySelectorAll(`div`);
    let checkbox = lista.querySelectorAll(`input[type="checkbox"]:checked`);
    stats.innerHTML = `<p>Tareas Pendientes: ${element.length} Completadas: ${checkbox.length}</p>`;

}


lista.addEventListener("click", (e) =>{
if (e.srcElement.nodeName == "INPUT") {
    actualizacion();
} 
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



