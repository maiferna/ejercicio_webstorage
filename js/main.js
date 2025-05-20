
/**
 * Llamar a los elementos del DOM
 */

const bodyTabla = document.querySelector('#bodyTabla');
const formulario = document.querySelector('#formulario');
const valorInput = document.getElementById("valorInput");

/**
 * Crear array productos
 */

let arrayProductos;
    //     id: 'producto-1',
    //     producto: 'producto 1',
    //     cantidad: 1,
    // }


/**
 * Eventos
 * Agregar y eliminar producto
 * submit (agregar) y click (eliminar)
 * entrada {string} Captura el valor del input
 */

formulario.addEventListener("submit", (event) => {
    event.preventDefault();
    const entrada=event.target.valorInput.value;
    validarEntrada(entrada)
})

/**
 * 
 * @param {String} entrada El valor capturado en el input
 */

const validarEntrada=(entrada)=>{
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
    //     {
    //     id:'producto-prueba',
    //     nombre:'producto prueba',
    //     cantidad:1
    // }
    return  arrayProductos;
}


const agregarProducto = (entradaValidada) => {
    const arrayProductos = getLocal();
    const objProducto = arrayProductos.find((item) => item.nombre === entradaValidada)
    // si objProducto existe, no si es igual que la entrada, porque eso ya lo hemos validado con el .find
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


}

const eliminarProducto = (id) => {

    /*
        arrayProductod=filtrar y devolver todos los productos que su id sea distinto al parametro

        setlocal(arrayProductod)
    */


    pintarTabla()

}

const pintarTabla = () => {
   const arrayProductos= getLocal()
   console.log(arrayProductos)
   arrayProductos.forEach(item=>{
        bodyTabla.innerHTML=`<tr>
                                <td> ${item.nombre}</td>
                                 <td> ${item.cantidad}</td>
                                  <td> <button id='${item.id}'>Eliminar </button></td>

                            </tr> `
   })


}


pintarTabla()
