/*producto*/



class Producto {
    constructor(id, nombre, precio, img) {
        this.id = id;
        this.nombre = nombre;
        this.precio = precio;
        this.img = img;
        this.cantidad = 1;
    }
}

const shampoo = new Producto(1, "shampoo", 540, "./Shampoo.jpg");
const limpiaCristales = new Producto(2, "limpiaCristales", 90, "./Limpia-Cristales.jpg");
const LimpiaLlantas = new Producto(3, "LimpiaLlantas", 110, "./Limpia-Llantas.jpg");
const LimpiaTapizado = new Producto(4,"LimpiaTapizado", 130, "./Limpia-Tapizados.jpg");
const Motorlimp = new Producto(5, "RevividorNeumaticos", 200, "./Revividor-de-Neumaticos.jpg");
const RevividorGomas = new Producto(6, "RevividorGomas", 180, "./Revividor-de-Gomas.jpg");
const BrilloExpress = new Producto(7, "BrilloExpress", 400, "./Brillo-Express-.jpg");
const Interior = new Producto(8, "Interior", 450, "./Interior.jpg");
const productos = [shampoo, limpiaCristales, LimpiaLlantas, LimpiaTapizado, Motorlimp, RevividorGomas, BrilloExpress, Interior];

let carrito = [];

if(localStorage.getItem("carrito")){
    carrito = JSON.parse(localStorage.getItem("carrito"));
}

const contenedorProductos = document.getElementById("contenedorProductos");


const mostrarProductos = () => {
    productos.forEach( producto => {
        const card = document.createElement("div");
        card.classList.add("col-xl-3", "col-md-6", "col-xs-12");
        card.innerHTML = `
               <div class="card">
                    <img src="${producto.img}" class="card-img-top imgProductos" alt="${producto.nombre}">
                    <div class= "card-body">
                       <h5>${producto.nombre}</h5>
                       <p> ${producto.precio} </p>
                       <button class="btn colorBoton" id="boton${producto.id}" > Agregar al Carrito </button>
                    </div>
               </div>
                       `

    contenedorProductos.appendChild(card);

    const boton = document.getElementById(`boton${producto.id}`);
    boton.addEventListener("click", () => {
        agregarAlCarrito(producto.id);
    })
  })
}

mostrarProductos();

const agregarAlCarrito = (id) => {
    const productoEnCarrito = carrito.find(producto => producto.id === id);
    if(productoEnCarrito) {
        productoEnCarrito.cantidad++;
    }else {
        const producto = productos.find(producto => producto.id === id);
        carrito.push(producto);
      
    }
    localStorage.setItem("carrito", JSON.stringify(carrito));
   
}

const contenedorCarrito = document.getElementById("contenedorCarrito");
const verCarrito = document.getElementById("verCarrito");

verCarrito.addEventListener("click", () => {
    mostrarCarrito();
})

const mostrarCarrito = () => {
    contenedorCarrito.innerHTML = "";

   carrito.forEach(producto => {
    const card = document.createElement("div");
    card.classList.add("col-xl-3", "col-md-6", "col-xs-12");
    card.innerHTML = `
           <div class="card">
                <img src="${producto.img}" class="card-img-top imgProductos" alt="${producto.nombre}">
                <div class= "card-body">
                   <h5>${producto.nombre}</h5>
                   <p> ${producto.precio} </p>
                   <p> ${producto.cantidad} </p>
                   <button class="btn colorBoton" id="eliminar${producto.id}" > Eliminar Producto </button>
                </div>
           </div>
                   `
    contenedorCarrito.appendChild(card); 
    
    const boton = document.getElementById(`eliminar${producto.id}`);
    boton.addEventListener("click", () => {
        eliminarDelCarrito(producto.id);
    })



   })
   calcularTotal();
}

const eliminarDelCarrito = (id) => {
    const producto = carrito.find(producto => producto.id === id);
    const indice = carrito.indexOf(producto);
    carrito.splice(indice, 1);
    mostrarCarrito();

    localStorage.setItem("carrito", JSON.stringify(carrito));

}

const vaciarCarrito = document.getElementById("vaciarCarrito");
vaciarCarrito.addEventListener("click", () => {
    eliminarTodoElCarrito();
})

const eliminarTodoElCarrito = () => {
    carrito = [];
    mostrarCarrito();

    localStorage.clear();



}

const total = document.getElementById("total");
const calcularTotal = () => {
    let totalCompra = 0;
    carrito.forEach(producto => {
        totalCompra += producto.precio * producto.cantidad;
    })
    total.innerHTML = `Total: $${totalCompra}`;


}