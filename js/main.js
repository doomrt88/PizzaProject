const getProducts = () => [
    {
        "id": "hawaian",
        "title": "Hawaian",
        "image": "./images/products/hawaian.jpg",
        "category": {
            "name": "hawaian",
            "id": "hawaian"
        },
        "price": 20
    },

    {
        "id": "cheese-tomato",
        "title": "Cheese and Tomato",
        "image": "./images/products/cheese-tomato.jpg",
        "category": {
            "name": "cheese-tomato",
            "id": "cheese-tomato"
        },
        "price": 18
    },

    {
        "id": "pepperoni",
        "title": "Pepperoni",
        "image": "./images/products/pepperoni.jpg",
        "category": {
            "name": "pepperoni",
            "id": "pepperoni"
        },
        "price": 22
    },

    {
        "id": "california",
        "title": "California",
        "image": "./images/products/california.jpg",
        "category": {
            "name": "california",
            "id": "california"
        },
        "price": 25
    },

    {
        "id": "chicago",
        "title": "Chicago",
        "image": "./images/products/chicago.jpg",
        "category": {
            "name": "chicago",
            "id": "chicago"
        },
        "price": 27
    },

    {
        "id": "greek",
        "title": "Greek",
        "image": "./images/products/greek.jpg",
        "category": {
            "name": "greek",
            "id": "greek"
        },
        "price": 36
    },

    {
        "id": "neapolitan",
        "title": "Neapolitan",
        "image": "./images/products/neapolitan.jpg",
        "category": {
            "name": "neapolitan",
            "id": "neapolitan"
        },
        "price": 26
    },

    {
        "id": "newYork",
        "title": "New York",
        "image": "./images/products/newYork.jpg",
        "category": {
            "name": "newYork",
            "id": "newYork"
        },
        "price": 32
    }
]

const containerProducts = document.querySelector("#package-products");
const buttonsCategories = document.querySelectorAll(".category-button");
const mainTitle = document.querySelector("#main-title");
let buttonsAdd = document.querySelectorAll(".product-add");
const smallNumber = document.querySelector("#small-number");
const aboutContainer = document.querySelector("#history");

let products = getProducts();

$(document).ready(() => {
    addProducts(products);
});


buttonsCategories.forEach(button => button.addEventListener("click", () => {
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

function toggleElements({
    componentName,
    type = "article",
    className = "hide-component",
    invertClass = false
}) {
    const sections = [...document.getElementsByTagName(type)];
    sections.forEach((section) => {
        if (section.id !== componentName) {
            section.classList[invertClass ? "remove" : "add"](className)
        } else {
            section.classList[invertClass ? "add" : "remove"](className)
        }
    })
}

$("button#menu").click(function () {
    const buttonOptions = {
        componentName: "menu",
        type: "button",
        className: "active",
        invertClass: true
    }
    toggleElements({ componentName: "menuComponent" });
    toggleElements(buttonOptions);
});

$("button#about-us").click(function () {
    const buttonOptions = {
        componentName: "about-us",
        type: "button",
        className: "active",
        invertClass: true
    }
    toggleElements({ componentName: "aboutUsComponent" });
    toggleElements(buttonOptions);
});

$("button#logIn").click(function () {
    const buttonOptions = {
        componentName: "logIn",
        type: "button",
        className: "active",
        invertClass: true
    }
    toggleElements({ componentName: "loginComponent" });
    toggleElements(buttonOptions);
});

$("button#signUp").click(function () {
    const buttonOptions = {
        componentName: "signUp",
        type: "button",
        className: "active",
        invertClass: true
    }
    toggleElements({ componentName: "registerComponent" });
    toggleElements(buttonOptions);
});

function updateButtonsAdd() {
    buttonsAdd = document.querySelectorAll(".product-add");

    buttonsAdd.forEach(boton => {
        boton.addEventListener("click", addToCart);
    });
}

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
        onClick: function () { } // Callback after click
    }).showToast();

    const idButton = e.currentTarget.id;
    const productAdded = products.find(product => product.id === idButton);

    if (productsInCart.some(product => product.id === idButton)) {
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