let products = [];

fetch("./js/products.json")
    .then(response => response.json())
    .then(data => {
        products = data;
        addProducts(products);
    })


const containerProducts = document.querySelector("#package-products");
const buttonsCategories = document.querySelectorAll(".category-button");
const mainTitle = document.querySelector("#main-title");
let buttonsAdd = document.querySelectorAll(".product-add");
const smallNumber = document.querySelector("#small-number");


buttonsCategories.forEach(boton => boton.addEventListener("click", () => {
    aside.classList.remove("aside-visible");
}))


function addProducts(productsChosen) {

    containerProducts.innerHTML = "";

    productsChosen.forEach(product => {

        const div = document.createElement("div");
        div.classList.add("product");
        div.innerHTML = `
            <img class="product-image" src="${product.image}" alt="${product.title}">
            <div class="product-details">
                <h3 class="product-title">${product.title}</h3>
                <p class="product-price">$${product.price}</p>
                <button class="product-add" id="${product.id}">Add</button>
            </div>
        `;

        containerProducts.append(div);
    })

    updateButtonsAdd();
}


buttonsCategories.forEach(boton => {
    boton.addEventListener("click", (e) => {

        buttonsCategories.forEach(boton => boton.classList.remove("active"));
        e.currentTarget.classList.add("active");

        if (e.currentTarget.id != "todos") {
            const productCategory = products.find(product => product.category.id === e.currentTarget.id);
            mainTitle.innerText = productCategory.category.name;
            const productsBoton = products.filter(product => product.category.id === e.currentTarget.id);
            addProducts(productsBoton);
        } else {
            mainTitle.innerText = "All Pizzas";
            addProducts(products);
        }

    })
});

function updateButtonsAdd() {
    buttonsAdd = document.querySelectorAll(".product-add");

    buttonsAdd.forEach(boton => {
        boton.addEventListener("click", addToCart);
    });
}

let productsInCart;

let productsInCartLS = localStorage.getItem("products-in-cart");

if (productsInCartLS) {
    productsInCart = JSON.parse(productsInCartLS);
    updateSmallNumber();
} else {
    productsInCart = [];
}

function addToCart(e) {

    Toastify({
        text: "Product Added",
        duration: 3000,
        close: true,
        gravity: "top", // `top` or `bottom`
        position: "right", // `left`, `center` or `right`
        stopOnFocus: true, // Prevents dismissing of toast on hover
        style: {
          background: "linear-gradient(to right, #d87d33, #e9bc5c)",
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

    const idButton = e.currentTarget.id;
    const productAdded = products.find(product => product.id === idButton);

    if(productsInCart.some(product => product.id === idButton)) {
        const index = productsInCart.findIndex(product => product.id === idButton);
        productsInCart[index].quantity++;
    } else {
        productAdded.quantity = 1;
        productsInCart.push(productAdded);
    }

    updateSmallNumber();

    localStorage.setItem("products-in-cart", JSON.stringify(productsInCart));
}

function updateSmallNumber() {
    let newSmallNumber = productsInCart.reduce((acc, product) => acc + product.quantity, 0);
    smallNumber.innerText = newSmallNumber;
}