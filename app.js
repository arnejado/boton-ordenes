const listaBotones = document.querySelector(".listaBotones");
const botonMas = document.querySelector(".botonMas");
const borrar = document.querySelector(".borrar");
const editar = document.querySelector(".editar");
const expandir = document.querySelector(".expandir");
const formulario = document.querySelector(".formulario");
const espacioFormulario = document.querySelector(".espacioFormulario");
const textAreaNuevoBoton = document.querySelector(".nuevoBoton");
const cancelar = document.querySelector(".cancelarBoton");
let botones = [];
let vamosEditar = false;
let vamosBorrar = false;
let editando = false;

document.addEventListener('DOMContentLoaded', ()=> {
    botones = JSON.parse ( localStorage.getItem('botones')) || []; // el   || []   lo ponemos para cuando devuelva null asigne un arreglo vacio, si no daría error
    crearHTML ();
})

botonMas.addEventListener("click", mostrarAgregar);
borrar.addEventListener("click", mostrarBorrar);
formulario.addEventListener('submit', agregarBoton);
editar.addEventListener("click", mostarEditar);
expandir.addEventListener("click", mostrarBotones);
cancelar.addEventListener("click", cancelarFormulario);

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


    if (editando === true) {
        console.log("editando");
        console.log(clon.boton);
        clon.boton = botonNuevo;
            

    } else {
        const botonObj = {
            id: Date.now(),
            boton : botonNuevo   
        }
        //Añadir al arreglo de botones

        botones = [...botones, botonObj];
    }

        //Una vez agregado vamos a cear el HTML
        espacioFormulario.classList.toggle("active");
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
                const clone = structuredClone(boton)
                btnEditar.onclick = () => {
                editarBoton(clone)
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

function editarBoton(clon) {
    
    console.log(clon.boton);
    espacioFormulario.classList.toggle("active");
    listaBotones.classList.toggle("active");
    textAreaNuevoBoton.innerText = clon.boton;
    editando = true;
    console.log(clon);
}

function reproduce(fraseReproducir) {
    const utterance = new SpeechSynthesisUtterance(fraseReproducir);
        utterance.voice = speechSynthesis.getVoices()[1]; // Elige una voz (puedes obtener la lista de voces disponibles)
        utterance.rate = 1.0; // Velocidad normal
        utterance.pitch = 1.0; // Tono normal

        window.speechSynthesis.speak(utterance); //reproduce

}

function mostrarBotones () {
    botonMas.classList.toggle("active");
    borrar.classList.toggle("active");
    editar.classList.toggle("active");
    expandir.classList.toggle("active");

    if (!expandir.classList.contains('active')) {
        vamosEditar = false;
        vamosBorrar = false;
        crearHTML();
    }
}

function mostrarAgregar () {
    vamosEditar = false;
    vamosBorrar = false;
    crearHTML();
    espacioFormulario.classList.toggle("active");
    listaBotones.classList.toggle("active");
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

function cancelarFormulario () {
    espacioFormulario.classList.toggle("active");
    listaBotones.classList.toggle("active");
    if (!expandir.classList.contains('active')) {
        vamosEditar = false;
        vamosBorrar = false;
        crearHTML();
    }
}