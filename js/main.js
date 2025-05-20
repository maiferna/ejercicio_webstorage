
/**
 * Llamar a los elementos del DOM
 */

const bodyTabla = document.querySelector('#bodyTabla');
const formulario = document.querySelector('#formulario');
const entradaFormulario = document.getElementById("entradaFormulario");


/**
 * Variables
 */

const fragment = document.createDocumentFragment();
let arrayProductos;


/**
 * Eventos
 * Agregar producto (submit)
 * entrada {string} Captura el valor del input del formulario
 * entradaFormulario es el antiguo valorInput
 */

formulario.addEventListener("submit", (event) => {
    event.preventDefault();
    const entrada = event.target.entradaFormulario.value;
    validarEntrada(entrada);
})

/**
 * Evento
 * Eliminar producto (click)
 */
bodyTabla.addEventListener("click", (event) => {
    
    if (event.target.matches('BUTTON')) {
        eliminarProducto(event.target.id);
    }
})


/**
 * 
 * @param {String} entrada El valor capturado en el input
 * @returns Llamada a agregarProducto una vez la entrada haya sido validada
 */

const validarEntrada = (entrada) => {
    const regExp = /^[a-zA-Z]+$/;

    if (!regExp.test(entrada)) {
        console.log("Error: caracteres no válidos.")
        return;
    }
    agregarProducto(entrada);
}

/**
 * 
 * @param {Array} todosLosProductos Array de productos
 * @returns Convierte el array en un string JSON y lo guarda en localStroage con la clave "listaProductos"
 */

const setLocal = (todosLosProductos) => {
    if(!todosLosProductos) return
    
    localStorage.setItem("listaProductos", JSON.stringify(todosLosProductos))
}

/**
 * Busca en localStorage la clave "listaProductos"
 * @returns {Array} Devuelve el array de productos
 * Si encuentra un string, lo convierte en un array con JSON
 * Si no lo encuentra, devuelve un array vacío
 */
const getLocal = () => {
    arrayProductos = JSON.parse(localStorage.getItem("listaProductos")) || [];
    return  arrayProductos;
}

/**
 * Función que agrega un producto a la tabla
 * Si el producto existe, lo incrementa en 1, sino lo crea y lo añade a la tabla
 * @param {String} entradaValidada Entrada del formulario validada
 * Con setLocal() se actualiza el almacenamiento con el array actualizado
 */

const agregarProducto = (entradaValidada) => {
    const arrayProductos = getLocal();
    const objProducto = arrayProductos.find((item) => item.nombre === entradaValidada)
    if (objProducto) {
        objProducto.cantidad += 1;
    } else {
        let newProduct = {
            id: entradaValidada.split(' ').join('-'),
            nombre: `${entradaValidada}`,
            cantidad: 1
        }
        arrayProductos.push(newProduct);
    }
    setLocal(arrayProductos);
    pintarTabla();
}


/**
 * Función para eliminar un producto
 * Si la cantidad del producto es 1, el producto se elimina, sino decrementa en uno
 * @param {String} id Identificador del botón y del producto a eliminar
 * Con .filter() se crea un nuevo array con los elementos que cumplan una condición. La función callback debe devolver true o false para saber si hay que dejar el elemento en el array o no
 */

const eliminarProducto = (id) => {
    let arrayProductos = getLocal();
    arrayProductos = arrayProductos.filter((item) => {
        if (item.id === id) {
            if (item.cantidad > 1) {
                item.cantidad -= 1;
                return true;
            } else {
                return false;
            }  
        }
        return true;
    })
    setLocal(arrayProductos);
    pintarTabla()
}


/**
 * Función que pinta la fila de la tabla con los elementos nombre, cantidad y botón de eliminar.
 * bodyTabla.innerHTML = '' --> limpia la tabla para que las filas de los mismos productos no se dupliquen.
 */

const pintarTabla = () => {
    const arrayProductos= getLocal();
    bodyTabla.innerHTML = '';
    arrayProductos.forEach(item => {
        const filaTabla = document.createElement('TR');
  
        const celdaNombre = document.createElement('TD');
        const celdaCantidad = document.createElement('TD');
        const celdaAccion = document.createElement('TD');
        const botonEliminar = document.createElement('BUTTON');

        celdaNombre.textContent = item.nombre;
        celdaCantidad.textContent = item.cantidad;
        botonEliminar.textContent = 'Eliminar';
        botonEliminar.id = item.id;

        celdaAccion.append(botonEliminar);
        filaTabla.append(celdaNombre, celdaCantidad, celdaAccion);
        fragment.append(filaTabla);
    });
    bodyTabla.append(fragment);
}
