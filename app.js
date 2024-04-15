const listaBotones = document.querySelector(".listaBotones");
const botonMas = document.querySelector(".botonMas");
const borrar = document.querySelector(".borrar");
const formulario = document.querySelector(".formulario");
let botones = [];

console.log(listaBotones);

document.addEventListener('DOMContentLoaded', ()=> {
    botones = JSON.parse ( localStorage.getItem('botones')) || []; // el   || []   lo ponemos para cuando devuelva null asigne un arreglo vacio, si no daría error
    crearHTML ();
})

botonMas.addEventListener("click", mostrarAgregar);
borrar.addEventListener("click", mostrarBorrar);
formulario.addEventListener('submit', agregarBoton);

// Funciones


function mostrarAgregar () {
    formulario.classList.toggle("active");
    listaBotones.classList.toggle("active");
    console.log(formulario);
}


function agregarBoton(e) {
    e.preventDefault();

    //donde el usuario escribe
    const botonNuevo = document.querySelector('.nuevoBoton').value;

    // validacion del botón
    if (botonNuevo === "") {
        mostrarError ("El botón no puede estar vacío");
        return; // evita que se ejecuten más lineas de codigo (funciona en un if dentro de una función)
    }

    const botonObj = {
        id: Date.now(),
        boton : botonNuevo   
    }
    //Añadir al arreglo de tweets

    botones = [...botones, botonObj];

    //Una vez agregado vamos a cear el HTML
    console.log(botones);
    formulario.classList.toggle("active");
    listaBotones.classList.toggle("active");
    crearHTML ()

    //reiniciar el formulario

}

// llena la lista de botones

function crearHTML () {
    console.log(botones);

    limpiarHTML();

    if (botones.length >0) {
        botones.forEach (boton => {
            // Agregar un botón de eliminar

            const btnEliminar = document.createElement('a');
            btnEliminar.classList.add('borrarBotonX');
            btnEliminar.innerText = "X";
            
            //Añadir la función de eliminar
            btnEliminar.onclick = () => {
                borrarBoton(boton.id); 
            }

            console.log(btnEliminar)
            //crear HTML
            const li = document.createElement('p');
            const botonli = document.createElement('button');
            botonli.classList.add("botonListado");

            //Añadimos función al botón que reproduce
            botonli.onclick = () => {
                reproduce(boton.boton);
            }


            console.log(boton.boton);
            //añadir el texto
            botonli.innerText = boton.boton;

            //Asignar el botón de eliminar
            li.appendChild(btnEliminar);
            
            //Asignar el boton que reproduce
            li.appendChild(botonli);
            

            //insertarlo en el html
            listaBotones.appendChild(li);
        });

         sincronizarStorage();
    }
}

//Agrega los botones actuales a LocalStorage

function sincronizarStorage() {

    localStorage.setItem('botones', JSON.stringify(botones));

    
}


//Mostrar error

function mostrarError (error) {
    
    const mensajeError = document.createElement('p');
    mensajeError.textContent = error;
    mensajeError.classList.add ('error');

    //vamos a insentarlo en el Contenido
    const cuerpo = document.querySelector('.cuerpo');
    cuerpo.appendChild(mensajeError);
    
    //elimina el mensaje de error despues de tres segundos
    setTimeout (() => {
        mensajeError.remove();
    },    3000);
    }

function limpiarHTML() {
        while (listaBotones.firstChild) 
            listaBotones.removeChild(listaBotones.firstChild);
}


function borrarBoton () {

}

function reproduce(fraseReproducir) {
    const utterance = new SpeechSynthesisUtterance(fraseReproducir);
        utterance.voice = speechSynthesis.getVoices()[2]; // Elige una voz (puedes obtener la lista de voces disponibles)
        utterance.rate = 1.0; // Velocidad normal
        utterance.pitch = 1.0; // Tono normal

        window.speechSynthesis.speak(utterance); //reproduce

}

function mostrarBorrar () {
    console.log("mostrando borrar....");
    btnEliminar.classList.toggle("active");
}