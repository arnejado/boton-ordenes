const listaBotones = document.querySelector(".listaBotones");
const botonMas = document.querySelector(".botonMas");
const borrar = document.querySelector(".borrar");
const editar = document.querySelector(".editar");
const expandir = document.querySelector(".expandir");
const formulario = document.querySelector(".formulario");
let botones = [];
let vamosEditar = false;
let vamosBorrar = false;

console.log(listaBotones);

document.addEventListener('DOMContentLoaded', ()=> {
    botones = JSON.parse ( localStorage.getItem('botones')) || []; // el   || []   lo ponemos para cuando devuelva null asigne un arreglo vacio, si no daría error
    crearHTML ();
})

botonMas.addEventListener("click", mostrarAgregar);
borrar.addEventListener("click", mostrarBorrar);
formulario.addEventListener('submit', agregarBoton);
editar.addEventListener("click", mostarEditar);
expandir.addEventListener("click", mostrarBotones);

// Funciones

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
    formulario.classList.toggle("active");
    listaBotones.classList.toggle("active");
    vamosEditar = false;
    vamosBorrar = false;
    crearHTML ()

    //reiniciar el formulario

}

// llena la lista de botones

function crearHTML () {

    limpiarHTML();

    if (botones.length >0) {
        botones.forEach (boton => {
      
            //crear HTML
            const li = document.createElement('p');
            const botonli = document.createElement('button');
            botonli.classList.add("botonListado");

            //comprobamos si vamos a borrar
            if (vamosBorrar === true) {
            
                // Agregar un botón de eliminar

                const btnEliminar = document.createElement('a');
                btnEliminar.classList.add('borrarBotonX');
                btnEliminar.innerText = "X";
                
                //Añadir la función de eliminar
                btnEliminar.onclick = () => {
                    borrarBoton(boton.id); 
                }

                //Asignar el botón de eliminar
                li.appendChild(btnEliminar);
            }

            //comprobamos si vamos a editar
            if (vamosEditar === true){

                // Agregar un botón de editar
                const btnEditar = document.createElement('a');
                btnEditar.classList.add("botonEditarX");
                btnEditar.innerText = "📝";

                //Añadimos la función de editar
                btnEditar.onclick = () => {
                editarBoton(boton.id)
                }

                li.appendChild(btnEditar);            
            }

            //Añadimos función al botón que reproduce
            botonli.onclick = () => {
                reproduce(boton.boton);
            }

            //añadir el texto
            botonli.innerText = boton.boton;


            //Asignar el boton que reproduce
            li.appendChild(botonli);
            //Asignar el botón editar
            

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


function borrarBoton (idBoton) {
    botones = botones.filter (boton => boton.id !== idBoton);
    crearHTML();
}

function editarBoton(idboton) {
    console.log("editando...");
    const botonEncontrado = botones.filter((objeto) => {
        return objeto.id === idboton;
      });
      
      console.log(botonEncontrado);
      console.log(botonEncontrado.boton);


      formulario.classList.toggle("active");
      listaBotones.classList.toggle("active");
      const botonNuevo = document.querySelector('.nuevoBoton').value;
      console.log(botonNuevo);
      botonNuevo.innerText = botonEncontrado.boton;
}

function reproduce(fraseReproducir) {
    const utterance = new SpeechSynthesisUtterance(fraseReproducir);
        utterance.voice = speechSynthesis.getVoices()[2]; // Elige una voz (puedes obtener la lista de voces disponibles)
        utterance.rate = 1.0; // Velocidad normal
        utterance.pitch = 1.0; // Tono normal

        window.speechSynthesis.speak(utterance); //reproduce

}

function mostrarBotones () {
    botonMas.classList.toggle("active");
    borrar.classList.toggle("active");
    editar.classList.toggle("active");
    expandir.classList.toggle("active");
}

function mostrarAgregar () {
    formulario.classList.toggle("active");
    listaBotones.classList.toggle("active");
    console.log(formulario);

}

function mostrarBorrar () {
    vamosEditar = false;
    vamosBorrar = !vamosBorrar;
    crearHTML ();
}

function mostarEditar () {
    vamosBorrar = false;
    vamosEditar = !vamosEditar;
    crearHTML ();
}