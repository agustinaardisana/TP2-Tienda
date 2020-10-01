//Comienza aside (filtros)
const barraBusqueda = document.querySelector('#barra-busqueda')
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
const filtroCategoria = document.getElementsByClassName('filtro-categoria')


///////////////// COMIENZA SECCION FILTROS /////////////////////

//Escuchar los eventos que suceden en el aside-filtros
barraBusqueda.oninput = () => {
    filtrarTarjetas()
}

for (let checkbox of filtroRating) {
    checkbox.onclick = () => {
        filtrarTarjetas()
    }
}

for (let checkbox of filtroCategoria) {
    checkbox.onclick = () => {
        filtrarTarjetas()
    }
}

//Filtrar Tarjetas
const filtrarTarjetas = () => {
    for (let tarjeta of tarjetasProducto) {
        if (pasaFiltros(tarjeta)) {
            mostrarTarjeta(tarjeta)
        }
        else {
            ocultarTarjeta(tarjeta)
        }
    }
}

const ocultarTarjeta = (tarjeta) => {
    return tarjeta.classList.add("hidden")
  }
  
  const mostrarTarjeta = (tarjeta) => {
    return tarjeta.classList.remove("hidden")
  }

//Ver si la tarjeta cumple con todos los requisitos para pasar los filtros
const pasaFiltros = (tarjeta) => {
    if (pasaFiltroInput(tarjeta) && pasaFiltroPorCategoria(tarjeta) && pasaFiltroPorRating(tarjeta)) {
        return true
    }
    else {
        return false
    }
}

//Ver si la tarjeta pasa el filtro por input
const pasaFiltroInput = (tarjeta) => {
    if (barraBusquedaTieneInput()) {
        if (inputCoincideConNombreTarjeta(tarjeta)) {
            return true
        }
        else {
            return false
        }
    }
    else {
        return true
    }
}

//Ver si hay algo escrito en el input
const barraBusquedaTieneInput = () => {
    return Boolean(barraBusqueda.value)
}

//Ver si lo escrito en el input coincide con el data-nombre de la tarjeta
const inputCoincideConNombreTarjeta = (tarjeta) => {
    if (tarjeta.dataset.nombre.includes(barraBusqueda.value.toLowerCase())) {
        return true
    }
    else {
        return false
    }
}

//Ver si la tarjeta pasa el filtro por Rating
const pasaFiltroPorRating = (tarjeta) => {
    if (checkboxRatingSeleccionado()) {
        if (coincidenCheckboxRatingYTarjeta(tarjeta)) {
            return true
        }
        else {
            return false
        }
    }
    return true
}

//Ver si hay algun checkbox-rating seleccionado
const checkboxRatingSeleccionado = () => {
    for (let checkbox of filtroRating) {
        if (checkbox.checked) {
            return true
        }
    }
}

//Ver si el checkbox-rating seleccionado coincide con alguna tarjeta
const coincidenCheckboxRatingYTarjeta = (tarjeta) => {
    const rating = tarjeta.dataset.review
    for (let checkbox of filtroRating) {
        if (checkbox.checked) {
            if (checkbox.value === rating) {
                return true
            }
        }
    }
    return false
}

//Ver si la tarjeta pasa el filtro por Categoria
const pasaFiltroPorCategoria = (tarjeta) => {
    if (checkboxCategoriaSeleccionado()) {
        if (coincidenCheckboxCategoriaYTarjeta(tarjeta)) {
            return true
        }
        else {
            return false
        }
    }
    return true
}

//Ver si hay algun checkbox-categoria seleccionado
const checkboxCategoriaSeleccionado = () => {
    for (let checkbox of filtroCategoria) {
        if (checkbox.checked) {
            return true
        }
    }
}

//Ver si el checkbox-categoria seleccionado coincide con alguna tarjeta
const coincidenCheckboxCategoriaYTarjeta = (tarjeta) => {
    const categoria = tarjeta.dataset.categoria
    for (let checkbox of filtroCategoria) {
        if (checkbox.checked) {
            if (checkbox.value === categoria) {
                return true
            }
        }
    }
    return false
}


//Filtros por checkbox - Rating

const filtrarPorRating = () => {
    for (let tarjeta of tarjetasProducto) {
        tarjeta.classList.add('hidden')
        if (checkboxSeleccionado()) {
            if (coincidenCheckboxYTarjeta(tarjeta)) {
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
    barraBusqueda.value = ""
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

///////////////// TERMINA SECCION FILTROS - COMIENZAN TRANSFORMACIONES /////////////////////

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