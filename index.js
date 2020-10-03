//Variables Filtros y Busqueda
const barraBusqueda = document.querySelector('#barra-busqueda')
const tarjetasProducto = document.getElementsByClassName('producto-tarjeta')
const filtroRating = document.getElementsByClassName('filtro-review')
const botonLimpiar = document.querySelector('.filtros-boton')
const botonesCerrar = document.querySelectorAll('.boton-cerrar')
const botonAbrirCarrito = document.querySelector('.boton-carrito')
const numeroProductosMostrados = document.querySelector('.productos-mostrados-cantidad')
const numeroProductosTotales = document.querySelector('.productos-totales-cantidad')

//Variables Transformaciones
const ventanaCarrito = document.querySelector('.carrito-seccion')
const body = document.body
const botonAbrirCheckout = document.querySelector('.boton-comprar.carrito')
const ventanaCheckout = document.querySelector('.overlay.checkout')
const botonSeguirComprando = document.querySelector('.boton-seguir-comprando')
const botonFiltrosResponsive = document.querySelector('.boton-filtros-responsive')
const asideFiltrosResponsive = document.querySelector('#filtros')
const overlay = document.querySelector('.overlay')
const filtroCategoria = document.getElementsByClassName('filtro-categoria')

//Variables Checkout
const subtotal = document.querySelector('.carrito-subtotal-valor')
const descuento = document.querySelector('.carrito-descuento-valor')
const envio = document.querySelector('.carrito-envio-valor')
const recargo = document.querySelector('.carrito-recargo-valor')
const total = document.querySelector('.carrito-total-valor')
const opcionesDePago = document.querySelector('.opciones-pago')
const radioPagoEfectivo = document.querySelector('#opciones-pago-efectivo')
const radioPagoCredito = document.querySelector('#opciones-pago-credito')
const checkboxEnvio = document.querySelector('#envio')
const checkboxDescuento = document.querySelector('#descuento')
const parrafoDescuento = document.querySelector('.checkout-resumen.descuento-parrafo')
const parrafoRecargo = document.querySelector('.checkout-resumen.recargo-parrafo')
const parrafoEnvio = document.querySelector('.checkout-resumen.envio-parrafo')

//Variables Vista Grilla y Lista
const contenedorTarjetas = document.querySelector('.productos-tarjetas-contenedor')
const botonVistaLista = document.querySelector('.boton-vista.lista')
const botonVistaTabla = document.querySelector('.boton-vista.tabla')
const detallesProductos =  document.querySelectorAll('.producto-detalles-parrafo')


///////////////// COMIENZA SECCION FILTROS Y BUSQUEDA /////////////////////

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
    let tarjetasMostradas = document.querySelectorAll(".producto-tarjeta:not(.hidden)")

    for (let tarjeta of tarjetasProducto) {
        if (pasaFiltros(tarjeta)) {
            mostrarTarjeta(tarjeta)
            console.log(tarjetasMostradas.length)
        }
        else {
            ocultarTarjeta(tarjeta)
        }
    }
    console.log(tarjetasMostradas.length)
    numeroProductosMostrados.textContent = tarjetasMostradas.length
}

//Contar los productos que se estan mostrando en cada momento
numeroProductosTotales.textContent = tarjetasProducto.length


// Mostrar y ocultar tarjetas
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

///////////////// TERMINAN RANSFORMACIONES - COMIENZAN FUNCIONALIDADES CHECKOUT /////////////////////

// Recuperar el valor "subtotal" que viene del carrito
let valorSubtotal = Number(subtotal.textContent)

//Escuchar los eventos que suceden en las opciones de pago
for (let opcion of opcionesDePago) {
    opcion.onclick = () => {
        calcularTotal()
    }
}

//Calcular el total de acuerdo a las opciones de pago seleccionadas
//Devolver el resultado final en el parrafo "Total"
const calcularTotal = () => {
    let valorTotal = valorSubtotal 
    valorTotal = valorSubtotal + tieneRecargoCredito() + tieneEnvio() + tieneTarjetaDescuento()
    total.textContent = (`${`$`}${valorTotal}`)
    return valorTotal
}

// Calcular el recargo si el usuario paga con tarjeta de credito
let recargoPagoConCredito 

const tieneRecargoCredito = () => {
    if (radioPagoCredito.checked) {
        recargoPagoConCredito =  valorSubtotal * 0.1 
        recargo.textContent = (`${`$`}${recargoPagoConCredito}`)
        parrafoRecargo.classList.remove('hidden')
    }
    else {
        recargoPagoConCredito = 0
        parrafoRecargo.classList.add('hidden')
    }
    return recargoPagoConCredito
}

// Calcular el recargo si el usuario necesita envio
let costoEnvio

const tieneEnvio = () => {
    if (checkboxEnvio.checked) {
        costoEnvio =  50
        envio.textContent = (`${`$`}${costoEnvio}`)
        parrafoEnvio.classList.remove('hidden')
    }
    else {
        costoEnvio = 0
        parrafoEnvio.classList.add('hidden')
    }
    return costoEnvio
}

// Calcular el descuento si el usuario tiene tarjeta de descuento

let valorDescuento

const tieneTarjetaDescuento = () => {
    if (checkboxDescuento.checked) {
        valorDescuento = - valorSubtotal * 0.1
        descuento.textContent = (`${`$`}${valorDescuento}`)
        parrafoDescuento.classList.remove('hidden')
    }
    else {
        valorDescuento = 0
        parrafoDescuento.classList.add('hidden')
    }
    return valorDescuento
}

///////////////// TERMINAN FUNCIONALIDADES CHECKOUT  - COMIENZAN DISPLAY LISTA Y TABLA/////////////////////

//Acciones a realizar cuando se selecciona la vista como tabla
botonVistaTabla.onclick = () => {
    contenedorTarjetas.classList.remove('vista-en-columna')
    for (let tarjeta of tarjetasProducto) {
        tarjeta.classList.remove('vista-horizontal')
    }
    for (let parrafoDetalle of detallesProductos) {
        parrafoDetalle.classList.add('hidden')
    }
}

//Acciones a realizar cuando se selecciona la vista como lista
botonVistaLista.onclick = () => {
    contenedorTarjetas.classList.add('vista-en-columna')
    for (let tarjeta of tarjetasProducto) {
        tarjeta.classList.add('vista-horizontal')
    }
    for (let parrafoDetalle of detallesProductos) {
        parrafoDetalle.classList.remove('hidden')
    }
}

