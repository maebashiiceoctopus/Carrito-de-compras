//variables

const carrito = document.querySelector("#carrito"),
    listaCursos = document.querySelector("#lista-cursos"),
    contenedorCarrito = document.querySelector("#lista-carrito tbody"),
    vaciarCarritoBtn = document.querySelector("#vaciar-carrito");

let articulosCarrito = [];

// eventos

RegistrarEventListeners();

function RegistrarEventListeners() {
    //cuando agregas un curso presionando agregar al carrito
    listaCursos.addEventListener("click", agregarCurso);

    //elimina cursos del carrito

    carrito.addEventListener("click", eliminarCurso);



    //vaciar carrito 

    vaciarCarritoBtn.addEventListener('click', () => {
        articulosCarrito = []; // reseteamos el arreglo

        limpiarHTML(); // limpiamos el html
    })
}

//funciones

function agregarCurso(e) {
    e.preventDefault();
    if (e.target.classList.contains("agregar-carrito")) {
        const cursoSeleccionado = e.target.parentElement.parentElement;

        leerDatos(cursoSeleccionado);
    }
}

//eliminar productos
function eliminarCurso(e) {
    if (e.target.classList.contains("borrar-curso")) {
        const cursoId = e.target.getAttribute("data-id");
        //elimina del arreglo  articulos carrito usando el data-id

        articulosCarrito = articulosCarrito.filter(curso => curso.id !== cursoId);
        //iteramos sobre el carrito y mostramos el html
        carritoHTML();

    }
}
//leer los datos del curso al que dimos click

function leerDatos(curso) {
    //crear objeto con el contenido del cursor:
    const infoCurso = {
        imagen: curso.querySelector("img").src, //obtener la imagen
        nombre: curso.querySelector("h4").textContent, //acceder al texto
        descuento: curso.querySelector("span").textContent,
        id: curso.querySelector("a").getAttribute("data-id"),
        cantidad: 1,
    };
    // revisa si un elemento ya existe en el carrito y si es asi actualizara la cantidad

    const existe = articulosCarrito.some((curso) => curso.id === infoCurso.id);
    if (existe) {
        // actualizamos cantidad
        const cursos = articulosCarrito.map((curso) => {
            if (curso.id === infoCurso.id) {
                curso.cantidad++;
                return curso; //retorna objeto actualizado
            } else {
                return curso; //retorna objetos que no sufren actualización
            }
        });
        articulosCarrito = [...cursos];
    } else {
        //agregar los elementos al arreglo de carrito
        articulosCarrito = [...articulosCarrito, infoCurso];
    }

    console.log(articulosCarrito);
    carritoHTML();
}

//mostrar el carrito de compras en el html

function carritoHTML() {
    //limpiar el html
    limpiarHTML();

    //recorre el carrito y agrega el html

    articulosCarrito.forEach((curso) => {
        const { imagen, nombre, descuento, cantidad, id } = curso; //desestructuring trayendo los datos de nuestro objeto
        const row = document.createElement("tr");
        row.innerHTML = `
        <td>
        <img src="${imagen}" width="100">
        </td>
        
        <td>
        ${nombre}
        </td>
        <td>
        <p>${descuento} </p>
        </td>
        <td>
        <p>${cantidad} </p>
        </td>
        <td>
         <a href="#" class="borrar-curso" data-id=${id} > X </a>
        </td>
        `;
        //agrega el html del carrito en el tbody

        contenedorCarrito.appendChild(row);
    });
}

//elimina los cursos del tbody

function limpiarHTML() {
    while (contenedorCarrito.firstChild) {
        contenedorCarrito.removeChild(contenedorCarrito.firstChild);
    }
}