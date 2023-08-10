let productsInCart = localStorage.getItem("products-in-cart");
productsInCart = JSON.parse(productsInCart);

const containerEmptyCart = document.querySelector("#empty-cart");
const containerProductsCart = document.querySelector("#products-cart");
const containerActionsCart = document.querySelector("#actions-cart");
const containerBoughtCart = document.querySelector("#cart-bought");
let buttonsDelete = document.querySelectorAll(".delete-cart-product");
const buttonEmpty = document.querySelector("#actions-cart-empty");
const containerTotal = document.querySelector("#total");
const buttonBuy = document.querySelector("#actions-cart-buy");


function addProductsCart() {
    if (productsInCart && productsInCart.length > 0) {

        containerEmptyCart.classList.add("disabled");
        containerProductsCart.classList.remove("disabled");
        containerActionsCart.classList.remove("disabled");
        containerBoughtCart.classList.add("disabled");
    
        containerProductsCart.innerHTML = "";
    
        productsInCart.forEach(product => {
    
            const div = document.createElement("div");
            div.classList.add("cart-product");
            div.innerHTML = `
                <img class="cart-product-image" src="${product.imagen}" alt="${product.titulo}">
                <div class="cart-product-title">
                    <small>Title</small>
                    <h3>${product.titulo}</h3>
                </div>
                <div class="cart-product-quantity">
                    <small>Quantity</small>
                    <p>${product.cantidad}</p>
                </div>
                <div class="cart-product-price">
                    <small>Price</small>
                    <p>$${product.precio}</p>
                </div>
                <div class="cart-product-subtotal">
                    <small>Subtotal</small>
                    <p>$${product.precio * product.cantidad}</p>
                </div>
                <button class="delete-cart-product" id="${product.id}"><i class="bi bi-trash-fill"></i></button>
            `;
    
            containerProductsCart.append(div);
        })
    
    actualizarbuttonsDelete();
    actualizarTotal();
	
    } else {
        containerEmptyCart.classList.remove("disabled");
        containerProductsCart.classList.add("disabled");
        containerActionsCart.classList.add("disabled");
        containerBoughtCart.classList.add("disabled");
    }

}

addProductsCart();

function actualizarbuttonsDelete() {
    buttonsDelete = document.querySelectorAll(".delete-cart-product");

    buttonsDelete.forEach(boton => {
        boton.addEventListener("click", eliminarDelCarrito);
    });
}

function eliminarDelCarrito(e) {
    Toastify({
        text: "Producto eliminado",
        duration: 3000,
        close: true,
        gravity: "top", // `top` or `bottom`
        position: "right", // `left`, `center` or `right`
        stopOnFocus: true, // Prevents dismissing of toast on hover
        style: {
          background: "linear-gradient(to right, #4b33a8, #785ce9)",
          borderRadius: "2rem",
          textTransform: "uppercase",
          fontSize: ".75rem"
        },
        offset: {
            x: '1.5rem', // horizontal axis - can be a number or a string indicating unity. eg: '2em'
            y: '1.5rem' // vertical axis - can be a number or a string indicating unity. eg: '2em'
          },
        onClick: function(){} // Callback after click
      }).showToast();

    const idBoton = e.currentTarget.id;
    const index = productsInCart.findIndex(product => product.id === idBoton);
    
    productsInCart.splice(index, 1);
    addProductsCart();

    localStorage.setItem("products-in-cart", JSON.stringify(productsInCart));

}

buttonEmpty.addEventListener("click", vaciarCarrito);
function vaciarCarrito() {

    Swal.fire({
        title: '¿Estás seguro?',
        icon: 'question',
        html: `Se van a borrar ${productsInCart.reduce((acc, product) => acc + product.cantidad, 0)} productos.`,
        showCancelButton: true,
        focusConfirm: false,
        confirmButtonText: 'Sí',
        cancelButtonText: 'No'
    }).then((result) => {
        if (result.isConfirmed) {
            productsInCart.length = 0;
            localStorage.setItem("products-in-cart", JSON.stringify(productsInCart));
            addProductsCart();
        }
      })
}


function actualizarTotal() {
    const totalCalculado = productsInCart.reduce((acc, product) => acc + (product.precio * product.cantidad), 0);
    total.innerText = `$${totalCalculado}`;
}

buttonBuy.addEventListener("click", comprarCarrito);
function comprarCarrito() {

    productsInCart.length = 0;
    localStorage.setItem("products-in-cart", JSON.stringify(productsInCart));
    
    containerEmptyCart.classList.add("disabled");
    containerProductsCart.classList.add("disabled");
    containerActionsCart.classList.add("disabled");
    containerBoughtCart.classList.remove("disabled");

}