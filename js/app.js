const listaCursos = document.getElementById('lista-cursos');
const contenedorCarrito = document.querySelector('#lista-carrito tbody');
const carrito = document.getElementById('carrito');
const vaciarCarrito = document.getElementById('vaciar-carrito');

let articulosCarrito = [];

// cargar todos los eventos escucha
cargarEventListeners();
function cargarEventListeners() {
    
    listaCursos.addEventListener('click', agregarCurso);

    carrito.addEventListener('click', borrarCurso);
    
    vaciarCarrito.addEventListener('click', () => {
        articulosCarrito = [];
        mostrar();
    });
}

// agregar a carrito
function agregarCurso(e) {
    e.preventDefault();
    if (e.target.classList.contains('agregar-carrito')) {
        const cursoSeleccionado = e.target.parentElement.parentElement;
        leerDatosProducto(cursoSeleccionado);
        seleccionValida();
    }
}

// leer contenido del HTML 
function leerDatosProducto(curso) {
    const informacion = {
        imagen: curso.querySelector('img').src,
        titulo: curso.querySelector('h4').textContent,
        precio: curso.querySelector('.precio span').textContent,
        id: curso.querySelector('a').getAttribute('data-id'),
        cantidad: 1,
    }

    const existe = articulosCarrito.some(articulo => articulo.id === informacion.id);
    if (existe) {
        articulosCarrito.forEach(articulo => {
            if (articulo.id === informacion.id) {
                articulo.cantidad++;
            }
        });
    }
    else {
        articulosCarrito = [...articulosCarrito, informacion];
    }

    console.log(articulosCarrito);
    mostrar();
}

// agregando en lista
function mostrar() {

    limpiar();

    articulosCarrito.forEach((curso) => {
        // curso es un objeto, por lo tanto podemos hacer destructuracion de objetos
        let { imagen, titulo, precio, id, cantidad } = curso;
        let row = document.createElement('tr');
        row.classList.add('tableRow');
        row.innerHTML = `
            <td class = "tableData">
            <img src="${imagen}" alt = "Imagen curso" width = "110px" >
            </td>
            <td class = "tableData"> ${titulo} </td>
            <td class = "tableData"> ${precio} </td>
            <td class = "tableData"> ${cantidad} </td>
            <td class = "tableData">
            <a href = "#" class = "borrar-curso" data-id = "${id}"> X </a>
            </td>
        `;
        contenedorCarrito.appendChild(row);
    });
}

// limpiando el html en el carrito
function limpiar() {
    // mientras haya un hijo, los eliminara hasta que no haya ninguno
    while (contenedorCarrito.firstChild) {
        contenedorCarrito.removeChild(contenedorCarrito.firstChild);
    }
}

// avisandole al usuario que selecciono un curso
function seleccionValida() {
    alert('Haz agregado un elemento al carrito.');
}

// quitando curso del carrito
function borrarCurso(e){
    if(e.target.classList.contains('borrar-curso')){
        const idCursoEliminar = e.target.getAttribute('data-id');
        articulosCarrito.forEach((curso) => {
            if(idCursoEliminar === curso.id){
                (curso.cantidad > 1) 
                ? curso.cantidad-- 
                : articulosCarrito = articulosCarrito.filter(item => item.id !== idCursoEliminar);
            }
        });
    }
    // volviendo a llamar a mostrar el carrito ya que el arreglo a sufrido cambios
    mostrar();
}