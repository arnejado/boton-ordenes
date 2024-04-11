console.log("script inicializado")

const listaBotones = document.querySelector(".listaBotones");
const anadir = document.querySelector(".anadir");
const borrar = document.querySelector(".borrar");

anadir.addEventListener("click", anadir);
borrar.addEventListener("click", borrar)

function comprobarLocalStorage () {
    console.log("comprobando...");
}

function cargandoBotones () {
    console.log("cargando...");
}

function anadir () {
    console.log("añadiendo...");
}

function borrar () {
    console.log("borrando...")
}

