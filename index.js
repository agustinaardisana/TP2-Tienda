//Comienza aside (filtros)
const filtroNombre = document.querySelector('#barra-busqueda')
const tarjetasProducto = document.getElementsByClassName('producto-tarjeta')
const filtroRating = document.getElementsByClassName('filtro-review')
const botonLimpiar = document.querySelector('.filtros-boton')
const botonesCerrar = document.querySelectorAll('.boton-cerrar')
const botonAbrirCarrito = document.querySelector('.boton-carrito')
//const overlayCarrito = document.querySelector('.overlay.carrito')
const ventanaCarrito = document.querySelector('.carrito-seccion')
const body = document.body
const botonAbrirCheckout = document.querySelector('.boton-comprar.carrito')
const ventanaCheckout = document.querySelector('.overlay.checkout')
const botonSeguirComprando = document.querySelector('.boton-seguir-comprando')
const botonFiltrosResponsive = document.querySelector('.boton-filtros-responsive')
//const overlayAsideFiltrosResponsive = document.querySelector('.overlay.aside-filtros')
const asideFiltrosResponsive = document.querySelector('#filtros')
const overlay = document.querySelector('.overlay')


//Filtro por búsqueda del usuario
filtroNombre.oninput = () => {
    for (let tarjeta of tarjetasProducto) {
        const titulo = tarjeta.dataset.nombre
        const busqueda = filtroNombre.value

        if (titulo.includes(busqueda)) {
            tarjeta.classList.remove('hidden')
        }
        else {
            tarjeta.classList.add('hidden')
        }
    }
}

//Filtros por checkbox - Rating
for (let checkbox of filtroRating) {
    checkbox.onclick = () => {
        filtrarPorRating()
    }
}

const checkboxSeleccionado = () => {
    for (let checkbox of filtroRating) {
        if (checkbox.checked) {
            return true
        }
    }
}

const coincidenCheckboxYTajeta = (tarjeta) => {
    const rating = tarjeta.dataset.review
    for (let checkbox of filtroRating) {
        if (checkbox.checked && checkbox.value === rating) {
            return true
        }
    }
}

const filtrarPorRating = () => {
    for (let tarjeta of tarjetasProducto) {
        tarjeta.classList.add('hidden')
        if (checkboxSeleccionado()) {
            if (coincidenCheckboxYTajeta(tarjeta)) {
                tarjeta.classList.remove('hidden')
            }
        }
        else {
            tarjeta.classList.remove('hidden')
        }
    }
}

//Filtros por checkbox - Categoria
const filtroCategoria = document.getElementsByClassName('filtro-categoria')

for (let checkbox of filtroCategoria) {
    checkbox.onclick = () => {
        filtrarPorCategoria()
    }
}

const checkboxCategoriaSeleccionado = () => {
    for (let checkbox of filtroCategoria) {
        if (checkbox.checked) {
            return true
        }
    }
}

const coincidenCheckboxCategoriaYTajeta = (tarjeta) => {
    const categoria = tarjeta.dataset.categoria
    for (let checkbox of filtroCategoria) {
        if (checkbox.checked && checkbox.value === categoria) {
            return true
        }
    }
}

filtrarPorCategoria = () => {
    for (let tarjeta of tarjetasProducto) {
        tarjeta.classList.add('hidden')
        if (checkboxCategoriaSeleccionado()) {
            if (coincidenCheckboxCategoriaYTajeta(tarjeta)) {
                tarjeta.classList.remove('hidden')
            }
        }
        else {
            tarjeta.classList.remove('hidden')
        }
    }
}


//Borrar filtros
botonLimpiar.onclick = () => {
    filtroNombre.value = ""
    for (let checkbox of filtroRating) {
        checkbox.checked = false
    }
    for (let checkbox of filtroCategoria) {
        checkbox.checked = false
    }
    for (let tarjeta of tarjetasProducto) {
        tarjeta.classList.remove('hidden')
    }
}

//Abrir ventana del carrito
botonAbrirCarrito.onclick = () => {
    overlay.classList.remove('hidden')
    ventanaCarrito.classList.add('abierto')
    body.classList.add('no-scroll')
}

//Cerrar ventana del carrito y del aside filtros
for (let botonCerrar of botonesCerrar) {
    botonCerrar.onclick = () => {
        overlay.classList.add('hidden')
        ventanaCarrito.classList.remove('abierto')
        asideFiltrosResponsive.classList.remove('abierto')
        body.classList.remove('no-scroll')
    }
}

//Abrir aside filtros responsive
botonFiltrosResponsive.onclick = () => {
    overlay.classList.remove('hidden')
    asideFiltrosResponsive.classList.add('abierto')
    body.classList.add('no-scroll')
}

//Abrir ventana checkout
botonAbrirCheckout.onclick = () => {
    ventanaCheckout.classList.remove('hidden')
}

//Cerrar ventana chekout
botonSeguirComprando.onclick = () => {
    ventanaCheckout.classList.add('hidden')
}