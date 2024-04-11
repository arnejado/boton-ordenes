console.log("script inicializado")

const listaBotones = document.querySelector(".listaBotones");
const botonMas = document.querySelector(".botonMas");
const borrar = document.querySelector(".borrar");
const formulario = document.querySelector(".formulario");

console.log(formulario);

botonMas.addEventListener("click", mostrarAgregar);
borrar.addEventListener("click", borrarBoton)
formulario.addEventListener('submit', agregarBoton);

comprobarLocalStorage()


function comprobarLocalStorage () {
    console.log("comprobando...");
};

function cargandoBotones () {
    console.log("cargando...");
}

function mostrarAgregar () {
    console.log("mostrando agregar...");
    formulario.classList.toggle("active");
    console.log(formulario);
}

function borrarBoton () {
    console.log("borrando...")
}

function agregarBoton() {
    console.log("agregando boton")
}



