
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
 */

const validarEntrada = (entrada) => {
    console.log(entrada,'en validar')

    // TODO: VALIDAR ENTRADA Y VOLVER A SOLICITAR EN CASO DEL FALSE
    const entradaValidada = entrada;

    agregarProducto(entradaValidada);
}


const setLocal = (todosLosProductos) => {

    if(!todosLosProductos) return
    
    localStorage.setItem("listaProductos", JSON.stringify(todosLosProductos))
}


const getLocal = () => {
    arrayProductos = JSON.parse(localStorage.getItem("listaProductos")) || [];
    return  arrayProductos;
}


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
    
 /*  TODO: recorrer el array buscando que exista
 
    si existe - incrementar cantidad en uno
      actualizo el localstorage
      pinto tabla

    si no existe crear un nuevo objeto 
            crear id - coger el productoName y reemplazar el espacio por un guión

      newProduct  {
            id:'idCreado',
            nomber: ' productoName';
            cantidad:1
        }
        
        arrayPdroductos.push(newProduct)

        añado al localstorage  
    ???'?????
localStorage.setItem("listaProductos", JSON.stringify([...arrayProductos, newProduct]))

setLocal([...arrayProductos, newProduct])

actualizar localstorage
pintar tabla (todo fuera)
        

    ???????

        pintar
 
 
 */




/**
 * Función para eliminar un producto
 * Si la cantidad del producto es 1, el producto se elimina, sino decrementa en uno
 * @param {String} id Identificador del botón y del producto a eliminar
 * Con .filter() se crea un nuevo array con los elementos que cumplan una condición. La función callback debe devolver true o false para saber si hay que incluir el elemento o no
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
/*
        arrayProductod=filtrar y devolver todos los productos que su id sea distinto al parametro

        setlocal(arrayProductod)
    */
// const pintarTabla = () => {
//    const arrayProductos= getLocal()
//    console.log(arrayProductos)
//    arrayProductos.forEach(item=>{
//         bodyTabla.innerHTML=`<tr>
//                                 <td> ${item.nombre}</td>
//                                  <td> ${item.cantidad}</td>
//                                   <td> <button id='${item.id}'>Eliminar </button></td>

//                             </tr> `
//    })


// }

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
