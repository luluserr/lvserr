const productos = [
    {
        nombre: 'Florence',
        imagen: 'catalogo1.png',
        precio: 160000
    },
    {
        nombre: 'Renée',
        imagen: 'catalogo2.png',
        precio: 185000
    },
    {
        nombre: 'Isabella',
        imagen: 'catalogo3.png',
        precio: 200000
    },
    {
        nombre: 'Paloma',
        imagen: 'catalogo4.png',
        precio: 153000
    },
    {
        nombre: 'Cecilia',
        imagen: 'catalogo5.png',
        precio: 170000
    },
    {
        nombre: 'Aurora',
        imagen: 'catalogo6.png',
        precio: 220000
    },
];

document.addEventListener('DOMContentLoaded', () => {
    mostrarProductos();
    mostrarCarrito();
});

const contenedorProductos = document.querySelector('.contenedor-productos');

// mostrar los productos en la página shop.html
const mostrarProductos = () => {
    if (!contenedorProductos) return;

    contenedorProductos.innerHTML = "";

    productos.forEach((producto, index) => {
        const productoDiv = document.createElement('section');
        productoDiv.classList.add('producto');

        productoDiv.innerHTML = `
            <h3>Vestido</h3>
            <h2>${producto.nombre}</h2>
            <img src="${producto.imagen}">
            <p><b>Valor</b>: $${producto.precio.toLocaleString()}</p>
            <button class="agregar-carrito" data-index="${index}">Agregar al carrito</button>
        `;
        contenedorProductos.appendChild(productoDiv);
    });
};

// agregar vestidos al carrito
const agregarAlCarrito = (index) => {
    const producto = productos[index];
    let carrito = JSON.parse(localStorage.getItem('carrito')) || [];

    const existingProductIndex = carrito.findIndex(item => item.nombre === producto.nombre);

    if (existingProductIndex >= 0) {
        carrito[existingProductIndex].cantidad += 1;
    } else {
        producto.cantidad = 1;
        carrito.push(producto);
    }

    localStorage.setItem('carrito', JSON.stringify(carrito));
    alert(`Sumaste el vestido ${producto.nombre} a tu carrito.`);
};

// eliminar vestidos del carrito
const eliminarDelCarrito = (nombre) => {
    let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    carrito = carrito.filter(item => item.nombre !== nombre);
    localStorage.setItem('carrito', JSON.stringify(carrito));

    mostrarCarrito();
};

// mostrar los vestidos seleccionados en el carrito
const mostrarCarrito = () => {
    const carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    const contenedorCarrito = document.querySelector('.contenedor-carrito');

    contenedorCarrito.innerHTML = '';

    if (carrito.length === 0) {
        contenedorCarrito.innerHTML = '<p>Tu carrito se encuentra vacío. Ya le echaste un vistazo a nuestro <a href="shop.html"><b>catálogo</b></a>?</p>';
    } else {
        let total = 0;

        carrito.forEach(producto => {
            const productoDiv = document.createElement('div');
            productoDiv.classList.add('producto');
            productoDiv.innerHTML = `
                <h3>${producto.nombre}</h3>
                <img src="${producto.imagen}" class="producto-imagen">
                <p><b>Cantidad</b>: ${producto.cantidad}</p>
                <p><b>Valor</b>: $${producto.precio.toLocaleString()}</p>
                <button class="eliminar" data-nombre="${producto.nombre}">Eliminar</button>
            `;
            contenedorCarrito.appendChild(productoDiv);

            total += producto.precio * producto.cantidad;
        });

        const precioTotal = document.createElement('div');
        precioTotal.innerHTML = `<h2>Precio final: $${total.toLocaleString()}</h2>`;
        contenedorCarrito.appendChild(precioTotal);

        const checkoutButton = document.createElement('button');
        checkoutButton.textContent = 'Finalizar compra';
        checkoutButton.onclick = () => {
            alert('Muchas gracias por tu compra y por elegirnos para tu ocasión tan especial. 💕');
            localStorage.removeItem('carrito');
            mostrarCarrito();
        };
        contenedorCarrito.appendChild(checkoutButton);
    }
};

if (contenedorProductos) {
    contenedorProductos.addEventListener('click', (e) => {
        if (e.target && e.target.classList.contains('agregar-carrito')) {
            const index = e.target.getAttribute('data-index');
            agregarAlCarrito(index);
        }
    });
}

document.querySelector('.contenedor-carrito')?.addEventListener('click', (e) => {
    if (e.target && e.target.classList.contains('eliminar')) {
        const nombre = e.target.getAttribute('data-nombre');
        eliminarDelCarrito(nombre);
    }
});