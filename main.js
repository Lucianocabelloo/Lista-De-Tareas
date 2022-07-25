listadetareas.addEventListener("submit", ()=>{

AgregarTarea();

})



let input = document.getElementById("tareas");
let contador = 0;

let AgregarTarea = function(){
    contador++;

    let tarea_agregada = input.value;
    input.value = ``;


    lista.innerHTML += 
    `
        <div class="contenedor-tareas" id="${contador}">
                <input type="checkbox" name="" id="checkbox">
                <label for="">${tarea_agregada}</label>
                <img src="imagenes/borrar.png" alt="" class="borrar">
            </div>
        </div>
        `
        actualizacion();
}




let actualizacion = function actualizar_stats(){
    
    stats.innerHTML =
    `
    <p>Tareas Pendientes: ${contador}
    `
    
    
    let checkbox1 = document.getElementById("checkbox");
    let check = 0;
    
    checkbox1.addEventListener ("change", tareasRealizadas);
    
    function tareasRealizadas(e){
    console.log(e);
        check++
        stats2.innerHTML  =
        `
        <p>Tareas realizadas: ${check}
        `
    }
}


