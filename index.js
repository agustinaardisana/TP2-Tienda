//Variables Filtros y Busqueda
const barraBusqueda = document.querySelector('#barra-busqueda')
const tarjetasProducto = document.getElementsByClassName('producto-tarjeta')
const filtroRating = document.getElementsByClassName('filtro-review')
const botonLimpiar = document.querySelector('.filtros-boton-limpiar')
const numeroProductosMostrados = document.querySelector('.productos-mostrados-cantidad')
const numeroProductosTotales = document.querySelector('.productos-totales-cantidad')
const tarjetasOcultas = document.getElementsByClassName('producto-tarjeta hidden')

//Variables Transformaciones
const body = document.body
const ventanaCarrito = document.querySelector('.carrito-seccion')
const botonesCerrar = document.querySelectorAll('.boton-cerrar')
const botonAbrirCheckout = document.querySelector('.boton-comprar.carrito')
const overlayPopups = document.querySelector('.overlay.popups')
const dialogoCheckout = document.querySelector('.checkout-seccion')
const botonVaciarCarrito = document.querySelector('.boton-vaciar.carrito')
const dialogoVaciarCarrito = document.querySelector('.vaciar-carrito-contenedor')
const botonCancelarVaciarCarrito = document.querySelector('.boton-cancelar')
const botonConfirmarVaciarCarrito = document.querySelector('.boton-vaciar.confirmar-vaciar')
const botonSeguirComprando = document.querySelector('.boton-seguir-comprando')
const botonFiltrosResponsive = document.querySelector('.boton-filtros-responsive')
const asideFiltrosResponsive = document.querySelector('#filtros')
const overlaySidebars = document.querySelector('.overlay.sidebars')
const filtroCategoria = document.getElementsByClassName('filtro-categoria')

//Variables Carrito
const botonAbrirCarrito = document.querySelector('.boton-carrito')
const botonAgregarAlCarrito =  document.querySelectorAll('.boton-agregar-al-carrito')
const mensajeCarritoVacio = document.querySelector(".contenedor-carrito-vacio")
const contenidoCarritoLleno = document.querySelector(".carrito-productos-agregados")


//Variables Checkout
const subtotal = document.querySelector('.carrito-subtotal-valor')
const descuento = document.querySelector('.carrito-descuento-valor')
const envio = document.querySelector('.carrito-envio-valor')
const recargo = document.querySelector('.carrito-recargo-valor')
const total = document.querySelector('.carrito-total-valor')
const opcionesDePago = document.getElementsByClassName('opciones-pago')

//const radioPagoEfectivo = document.querySelector('#opciones-pago-efectivo')
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
const detallesProductos = document.querySelectorAll('.producto-detalles-parrafo')


///////////////// COMIENZA SECCION FILTROS Y BUSQUEDA /////////////////////

//Escuchar los eventos que suceden en el aside-filtros
barraBusqueda.oninput = () => {
    filtrarTarjetas()
    contarProductosMostrados()
}

for (let checkbox of filtroRating) {
    checkbox.onclick = () => {
        filtrarTarjetas()
        contarProductosMostrados()
    }
}

for (let checkbox of filtroCategoria) {
    checkbox.onclick = () => {
        filtrarTarjetas()
        contarProductosMostrados()
    }
}

//Contar los productos que se estan mostrando en cada momento
const contarProductosMostrados = (productosMostrados) => {
    productosMostrados = tarjetasProducto.length - tarjetasOcultas.length
    numeroProductosMostrados.textContent = productosMostrados
    numeroProductosTotales.textContent = tarjetasProducto.length
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
    contarProductosMostrados()
}

///////////////// TERMINA SECCION FILTROS - COMIENZAN TRANSFORMACIONES /////////////////////

//Cerrar ventana del carrito y del aside filtros
for (let botonCerrar of botonesCerrar) {
    botonCerrar.onclick = () => {
        overlaySidebars.classList.add('hidden')
        ventanaCarrito.classList.remove('abierto')
        asideFiltrosResponsive.classList.remove('abierto')
        asideFiltrosResponsive.removeAttribute("aria-modal")
        asideFiltrosResponsive.removeAttribute("role")
        body.classList.remove('no-scroll')
    }
}

//Abrir aside filtros responsive
botonFiltrosResponsive.onclick = () => {
    overlaySidebars.classList.remove('hidden')
    asideFiltrosResponsive.classList.add('abierto')
    asideFiltrosResponsive.setAttribute("aria-modal", true)
    asideFiltrosResponsive.setAttribute("role", "dialog")
    body.classList.add('no-scroll')
}

//Abrir popup checkout
botonAbrirCheckout.onclick = () => {
    overlayPopups.classList.remove('hidden')
    dialogoCheckout.classList.remove('hidden')
}

//Cerrar popup chekout
botonSeguirComprando.onclick = () => {
    overlayPopups.classList.add('hidden')
    dialogoCheckout.classList.add('hidden')

}

//Abrir popup vaciar carrito
botonVaciarCarrito.onclick = () => {
    overlayPopups.classList.remove('hidden')
    dialogoVaciarCarrito.classList.remove('hidden')
}

//Cerrar popup vaciar carrito
botonCancelarVaciarCarrito.onclick = () => {
    overlayPopups.classList.add('hidden')
    dialogoVaciarCarrito.classList.add('hidden')

}

//Confirmar vaciar carrito (a los fines del TP basico funciona igual que el botonCancelarVaciarCarrito)
botonConfirmarVaciarCarrito.onclick = () => {
    overlayPopups.classList.add('hidden')
    dialogoVaciarCarrito.classList.add('hidden')

}

///////////////// TERMINAN RANSFORMACIONES - COMIENZAN FUNCIONALIDADES DEL CARRITO /////////////////////

//Abrir ventana del carrito
botonAbrirCarrito.onclick = () => {
    overlaySidebars.classList.remove('hidden')
    ventanaCarrito.classList.add('abierto')
    body.classList.add('no-scroll')
    actualizarCarrito()
}

for (let boton of botonAgregarAlCarrito) {
    boton.onclick = () => {
        boton.classList.add('producto-agregado')
    }
}

const crearTarjetaProductoEnCarrito = (producto) => {
    const productoHTML = 
    `<article class="carrito-producto-tarjeta" data-nombre="${producto.dataset.nombre}" data-precio="${producto.dataset.precio}">
                    <img class="carrito-producto-imagen" src="${producto.dataset.img}" aria-hidden="true">
                    <div class="carrito-producto-detalles-contenedor">
                        <div class="carrito-producto-detalles">
                            <h3 class="carrito-producto-nombre">${producto.dataset.nombre}</h3>
                            <button type="button" aria-label="Eliminar producto" class="boton-eliminar-producto">
                                <i class="far fa-trash-alt" aria-hidden="true"></i>
                            </button>
                        </div>
                        <div class="carrito-producto-precio-contenedor">
                            <label for="carrito-producto-cantidad" class="not-flex">
                                <input id="carrito-producto-cantidad" type="number" min="0" value="1" />
                                unidades
                            </label>
                            <p class="carrito-producto-precio">x ${`$`}${producto.dataset.precio}</p>
                        </div>
                    </div>
                </article>`
                
    return productoHTML
}

const actualizarCarrito = () => {
    const productosAgregadosAlCarrito = document.querySelectorAll('.producto-agregado')

    if (productosAgregadosAlCarrito.length === 0) {
        mensajeCarritoVacio.classList.remove('hidden')
        contenidoCarritoLleno.classList.add('hidden')
        mensajeCarritoVacio.textContent = `No tienes productos en el carrito, ¡agrega algunos!`
    } 
    else {
        mensajeCarritoVacio.classList.add('hidden')
        mostrarTarjetasProductoEnHTML = "" //variable acumuladora

        for (let producto of productosAgregadosAlCarrito) {
            mostrarTarjetasProductoEnHTML = mostrarTarjetasProductoEnHTML + crearTarjetaProductoEnCarrito(producto)
        }
        contenidoCarritoLleno.innerHTML = mostrarTarjetasProductoEnHTML
    }
}

//Eliminar producto del carrito usando el icono
const botonesEliminarProducto = document.querySelectorAll('.boton-eliminar-producto')
console.log(botonesEliminarProducto)

const eliminarProductoDelCarrito = (producto) => {
    console.log(botonesEliminarProducto)

    for (let boton of botonesEliminarProducto) {
        if (boton.onclick) {
            producto.remove()
        }
    }
}

///////////////// TERMINAN FUNCIONALIDADES AGREGAR PRODUCTOS AL CARRITO - COMIENZAN FUNCIONALIDADES CHECKOUT /////////////////////


// Recuperar el valor "subtotal" que viene del carrito
let valorSubtotal = Number(subtotal.textContent.slice(1))
total.textContent = (`${`$`}${valorSubtotal}`)

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
        recargoPagoConCredito = valorSubtotal * 0.1
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
        costoEnvio = 300
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
        valorDescuento = - valorSubtotal * 0.05
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

