const listaBotones = document.querySelector(".listaBotones");
const botonMas = document.querySelector(".botonMas");
const borrar = document.querySelector(".borrar");
const formulario = document.querySelector(".formulario");
let botones = [];

console.log(formulario);
console.log(botones);

botonMas.addEventListener("click", mostrarAgregar);
borrar.addEventListener("click", borrarBoton)
formulario.addEventListener('submit', agregarBoton);

comprobarLocalStorage()

// Funciones

function comprobarLocalStorage () {
    console.log("comprobando...");
};

function mostrarAgregar () {
    console.log("mostrando agregar...");
    formulario.classList.toggle("active");
    listaBotones.classList.toggle("active");
    console.log(formulario);
}

function agregarBoton(e) {
    e.preventDefault();

    //donde el usuario escribe
    console.log("agregando boton")
    const botonNuevo = document.querySelector('.nuevoBoton').value;

    console.log (botonNuevo);
    // validacion del botón
/*
    if (botonNuevo === "") {

        mostrarError ("El botón no puede estar vacío");

        return; // evita que se ejecuten más lineas de codigo (funciona en un if dentro de una función)
    }
*/
    const botonObj = {
        id: Date.now(),
        boton : botonNuevo   
    }
    //Añadir al arreglo de tweets

    botones = [...botones, botonObj];

    //Una vez agregado vamos a cear el HTML

    // crearHTML ()

    //reiniciar el formulario
    console.log(botonNuevo)  ;
    console.log(botones);
}

/*

//Mostrar error

function mostrarError (error) {
    
    const mensajeError = document.createElement('p');
    mensajeError.textContent = error;
    mensajeError.classList.add ('error');

    //vamos a insentarlo en el Contenido
    const contenido = document.querySelector('#contenido');
    contenido.appendChild(mensajeError);
    
    //elimina el mensaje de error despues de tres segundos
    setTimeout (() => {
        mensajeError.remove();
    },    3000);
    }

*/


function borrarBoton () {
    console.log("borrando...")
}


