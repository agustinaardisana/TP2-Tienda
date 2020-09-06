//Comienza aside (filtros)
const filtroNombre = document.querySelector('#barra-busqueda')
const tarjetasProducto = document.getElementsByClassName('producto-tarjeta')
const filtroRating = document.getElementsByClassName('filtro-review')
const botonLimpiar = document.querySelector('.filtros-boton')

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

const coincidenCheckboxYTajeta = tarjeta => {
    const rating = tarjeta.dataset.review
    for (let checkbox of filtroRating) {
        if (checkbox.value === rating && checkbox.checked) {
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

const coincidenCheckboxCategoriaYTajeta = tarjeta => {
    const categoria = tarjeta.dataset.categoria
    for (let checkbox of filtroCategoria) {
        if (checkbox.value === categoria && checkbox.checked) {
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