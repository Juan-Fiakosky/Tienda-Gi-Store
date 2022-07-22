/* ----Variables---- */
let productsContainer = document.querySelector(".products");
let containerBuyCart = document.querySelector(".card-items");
let priceTotal = document.querySelector(".price-total");
let amountProduct = document.querySelector(".count-product");

let buyThings = [];
let totalCard = 0;
let countProduct = 0;
let productsList = [];

/* ----Fetch y JSON---- */
function addProducts() {
	fetch("products.json")
		.then((resp) => resp.json())
		.then((products) => {
			products.forEach((product) => {
				productsList.push(product);
			});
		})
		.then(() => {
			productsList.forEach((product) => {
				const { image, name, price, id } = product;
				const newProductCard = document.createElement("div");
				newProductCard.classList.add("product-card");
				newProductCard.innerHTML = `
					<div class="product-img-wrap">
						<img class="product-img" src=${image} alt=${name} />
						<p class="product-price">$<span>${price}</span></p>
					</div>
					<p class="product-title">${name}</p>
					<a href="" data-id="${id}" class="btn-add-cart">Agregar al Carrito</a>
				`;

				productsContainer.appendChild(newProductCard);
			});
		});
}

addProducts();

/* ----CheckLocalStorage---- */

function checkLocalStorage() {
	if (localStorage.getItem("cart")) {
		buyThings = readCartForLocalStorage();
		countProduct = buyThings.length;

		buyThings.map((product) => {
			totalCard += product.price * product.amount;
		});

		loadHtml();
	}
}

checkLocalStorage();

/* ----AddEventListeners---- */
loadEventListenrs();
function loadEventListenrs() {
	productsContainer.addEventListener("click", addProductToCart);
	containerBuyCart.addEventListener("click", deleteProduct);
}

/* ----AddProduct---- */
function addProductToCart(e) {
	e.preventDefault();
	if (e.target.classList.contains("btn-add-cart")) {
		const selectProduct = e.target.parentElement;
		readTheContent(selectProduct);
	}
}

/* ----DeleteProduct---- */
function deleteProduct(e) {
	if (e.target.classList.contains("item-delete")) {
		const deleteId = e.target.getAttribute("data-id");

		buyThings.forEach((value) => {
			if (value.id == deleteId) {
				let priceReduce = parseFloat(value.price) * parseFloat(value.amount);
				totalCard = totalCard - priceReduce;
				totalCard = totalCard.toFixed(1);
			}
		});
		buyThings = buyThings.filter((product) => product.id !== deleteId);

		countProduct--;
	}
	loadHtml();
}

/* ----ReadTheContent---- */
function readTheContent(product) {
	const infoProduct = {
		image: product.querySelector(".product-img").src,
		title: product.querySelector(".product-title").textContent,
		price: product.querySelector(".product-price span").textContent,
		id: product.querySelector("a").getAttribute("data-id"),
		amount: 1,
	};

	totalCard = parseFloat(totalCard) + parseFloat(infoProduct.price);
	totalCard = totalCard.toFixed(1);

	const exist = buyThings.some((product) => product.id === infoProduct.id);
	if (exist) {
		const pro = buyThings.map((product) => {
			if (product.id === infoProduct.id) {
				product.amount++;
				return product;
			} else {
				return product;
			}
		});
		buyThings = [...pro];
	} else {
		buyThings = [...buyThings, infoProduct];
		countProduct++;
	}

	addCartToLocalStorage();
	loadHtml();
}

/* ----LoadHtml---- */
function loadHtml() {
	clearHtml();

	if (buyThings.length === 0) {
		priceTotal.innerHTML = 0;
		amountProduct.innerHTML = 0;
		localStorage.removeItem("cart");
	} else {
		buyThings.forEach((product) => {
			const { image, title, price, amount, id } = product;
			const row = document.createElement("div");
			row.classList.add("item");
			row.innerHTML = `
            <img src="${image}" alt="">
            <div class="item-description">
                <p class="item-title">${title}</p>
                <p class="item-price">$${price}</p>
                <p class="item-amount">Cantidad: ${amount}</p>
            </div>
            <span class="item-delete" data-id="${id}">❌</span>
        `;

			containerBuyCart.appendChild(row);

			priceTotal.innerHTML = totalCard;

			amountProduct.innerHTML = countProduct;
		});
	}
}

/* ----LocalStorage---- */
function addCartToLocalStorage() {
	localStorage.setItem("cart", JSON.stringify(buyThings));
}

function readCartForLocalStorage() {
	const cart = JSON.parse(localStorage.getItem("cart"));
	return cart;
}

/* ----ClearHtml---- */
function clearHtml() {
	containerBuyCart.innerHTML = "";
}

/* ----ShowCart---- */
function showCart() {
	document.getElementById("products-id").style.display = "flex";
}

/* ----CloseBtn---- */
function closeBtn() {
	document.getElementById("products-id").style.display = "none";
}

/* ----Interactuar con Html---- */
let div = document.getElementById("products-id");
console.log(div.innerHTML);

/* ----Sweet Alert---- */
function pushAlert(products) {
	if (products.length === 0) {
		Swal.fire({
			title: "Su carrito esta vacio",
			text: "Por favor agregue productos para porder realizar su pedido",
			icon: "error",
			confirmButtonText: "Volver a la tienda",
			confirmButtonColor: "#000",
		});
	} else {
		Swal.fire({
			title: "Pedido confirmado",
			text: "Gracias por su compra",
			icon: "success",
			confirmButtonText: "Volver a la tienda",
			confirmButtonColor: "#000",
		});
	}
}

/* ---------------Ejercicios practicos--------------- */

/* ----Operador Spread de Array---- */
const calzados = [
	"Sandalias",
	"Zapatillas",
	"Suecos",
	"Botas cortas",
	"Botas texanas cortas",
	"Pantuflas",
	"Gomones",
	"Zapatillas Gi",
	"Botas texanas",
];
console.log(...calzados);

/* ----Ejemplo desestructuracion de objetos---- */
const calzado = {
	nombre: "Sandalias",
	stock: 7,
};

const { nombre, stock } = calzado;

console.log(nombre, stock);

/* ----Operadores ternarios---- */
let cantidadCalzados = 1;
let accion = "stock";

cantidadCalzados == 1 && accion == "stock"
	? console.log("Existe carrito")
	: console.log("No existe carrito");
