//Product Data
var products = [
  { id: 1, name: "Small Noami", price: 74.99, color: "Grey" },
  { id: 2, name: "Stormy", price: 56.99, color: "Green" },
  { id: 3, name: "Puff Larger", price: 43.99, color: "Grey" },
  { id: 4, name: "Helix", price: 78.99, color: "Silk" },
];

//Accessing elements
const cartButton = document.getElementById("cartButton");
const overlay = document.getElementById("overlay");
const main = document.getElementById("main");
const closeCart = document.getElementById("closeCart");
const productSizeBtns = document.getElementsByClassName("product-size");

// Adding event listeners
function addEventListenerToAddProduct() {
  var addToCartButtons = document.getElementsByClassName(
    "product-add-cart-btn"
  );
  Array.from(addToCartButtons).forEach(function (button) {
    button.addEventListener("click", addToCartClickListener);
  });
}

function addEventListenerToRemoveProduct() {
  var removerFromCartButtons = document.getElementsByClassName(
    "cart-product-remove"
  );
  Array.from(removerFromCartButtons).forEach(function (button) {
    button.addEventListener("click", removeFromCartClickListener);
  });
}

function addEventListenerToQuantityBtn() {
  var decreaseQuantity = document.getElementsByClassName("decrease-quantity");
  Array.from(decreaseQuantity).forEach(function (button) {
    button.addEventListener("click", decreaseCartItemQuantity);
  });

  var increaseQuantity = document.getElementsByClassName("increase-quantity");
  Array.from(increaseQuantity).forEach(function (button) {
    button.addEventListener("click", increaseCartItemQuantity);
  });
}

cartButton.addEventListener("click", () => {
  cartSection.classList.toggle("show");
  overlay.classList.toggle("show");
  main.classList.toggle("overflow");
  addEventListenerToRemoveProduct();
  addEventListenerToQuantityBtn();
});

closeCart.addEventListener("click", () => {
  cartSection.classList.toggle("show");
  overlay.classList.toggle("show");
  main.classList.toggle("overflow");
});

// Rendering the products which are included in the products array

function showProducts() {
  var productList = document.getElementById("products-container");
  products.forEach(function (product) {
    var productCard = document.createElement("div");
    productCard.classList.add("col-md-3");
    productCard.innerHTML = `
        <div class="card product-card">
          <div class="card-body">
            <img class="product-image" src=${`./assets/images/product-${product.id}.png`}>
            <div class="product-name-price">
                <span class="product-name">${product.name}</span>
                <span class="product-price">$${product.price}</span>
            </div>
            <ul class="size-list">
                <li data-product-id=${product.id} class="product-size">XS</li>
                <li data-product-id=${product.id} class="product-size">S</li>
                <li data-product-id=${product.id} class="product-size">M</li>
                <li data-product-id=${product.id} class="product-size">L</li>
                <li data-product-id=${product.id} class="product-size">XL</li>
            </ul>
            <button class="product-add-cart-btn" data-product-id="${
              product.id
            }">Add to Cart</button>
          </div>
        </div>
      `;
    productList.appendChild(productCard);
  });
}

// Handle Add to Cart button click
function addToCartClickListener(event) {
  var productId = event.target.getAttribute("data-product-id");
  var product = products.find(function (p) {
    return p.id === parseInt(productId);
  });
  var cart = document.getElementById("cart");
  let nodeCount = document.getElementById("cart").children.length;

  const cartItemQuantity = cart.querySelector(
    `.cart-item-quantity[data-product-id="${productId}"]`
  );

  let quantity = 0;
  if (cartItemQuantity != null) {
    quantity = parseInt(cartItemQuantity.textContent);
  }

  if (quantity == 0) {
    //if product is not present in the cart
    var cartItem = document.createElement("li");
    var line = document.createElement("span");
    line.classList.add("product-line");
    cartItem.classList.add("list-group-item");
    cartItem.innerHTML = `
    <div class="cart-item-body" data-product-id=${product.id}>
        <img class="cart-product-image" src=${`./assets/images/product-${product.id}.png`}>
        <div class="cart-product-details">
            <span class="cart-product-name">${product.name}</span>
            <span class="cart-product-color">Color : ${product.color}</span>
            <div class="cart-product-quantity">
                <button class="decrease-quantity" data-product-id=${
                  product.id
                }>-</button>
                <span data-product-id=${
                  product.id
                } class="cart-item-quantity">1</span>
                <button class="increase-quantity" data-product-id=${
                  product.id
                }>+</button>

            </div>
        </div>
        <div class="cart-product-action-price">
            <button class="cart-product-remove" data-product-id="${
              product.id
            }"></button>
            <span data-product-id=${product.id} class="cart-item-price">$${
      product.price
    }</span>
        </div>
    </div>
    `;

    //updating the quantity of cart
    const cartQuantity = document.getElementById("cart-quantity");
    const cartQuantityInt = parseInt(cartQuantity.textContent);
    cartQuantity.textContent = cartQuantityInt + 1;

    //updating the quantity of products on cart icon
    const cartHeaderQuantity = document.getElementById(
      "cart-header-text-quantity"
    );
    let finalCartHeaderQuantity =
      parseInt(cartHeaderQuantity.textContent.split("")[1]) + 1;
    cartHeaderQuantity.textContent = `(${finalCartHeaderQuantity} ITEM)`;

    //updating the total price of cart

    const totalPrice = document.getElementById(`cart-total-value`);
    totalPrice.textContent = `$${(
      product.price + +totalPrice.textContent.split("$")[1]
    ).toFixed(2)}`;
    if (nodeCount > 0) cart.appendChild(line);
    cart.appendChild(cartItem);
  } else {
    //To increase the quantity if the product is already present in the cart

    const price = cart.querySelector(
      `.cart-item-price[data-product-id="${productId}"]`
    );
    let finalPrice = (products[productId - 1].price * (quantity + 1)).toFixed(
      2
    );
    const totalPrice = document.getElementById(`cart-total-value`);

    totalPrice.textContent = `$${(
      +products[productId - 1].price + +totalPrice.textContent.split("$")[1]
    ).toFixed(2)}`;
    price.textContent = `$${finalPrice}`;
    cartItemQuantity.textContent = quantity + 1;
  }
}

// To remove product from the Cart

function removeFromCartClickListener(event) {
  var productId = event.target.getAttribute("data-product-id");
  var cart = document.getElementById("cart");
  const childElement = cart.querySelector(
    `.cart-item-body[data-product-id="${productId}"]`
  );
  const totalPrice = document.getElementById(`cart-total-value`);
  const cartItemQuantity = cart.querySelector(
    `.cart-item-quantity[data-product-id="${productId}"]`
  );

  totalPrice.textContent = `$${(
    +totalPrice.textContent.split("$")[1] -
    products[productId - 1].price * +cartItemQuantity.textContent
  ).toFixed(2)}`;

  const cartQuantity = document.getElementById("cart-quantity");
  const cartQuantityInt = parseInt(cartQuantity.textContent);
  cartQuantity.textContent = cartQuantityInt - 1;

  const cartHeaderQuantity = document.getElementById(
    "cart-header-text-quantity"
  );

  let finalCartHeaderQuantity =
    parseInt(cartHeaderQuantity.textContent.split("")[1]) - 1;
  cartHeaderQuantity.textContent = `(${finalCartHeaderQuantity} ITEM)`;
  var parentElement = childElement.parentNode;
  cart.removeChild(parentElement);
}

//Increase the quantity of the product in cart
function increaseCartItemQuantity(event) {
  var productId = event.target.getAttribute("data-product-id");
  var cart = document.getElementById("cart");
  const cartItemQuantity = cart.querySelector(
    `.cart-item-quantity[data-product-id="${productId}"]`
  );
  const price = cart.querySelector(
    `.cart-item-price[data-product-id="${productId}"]`
  );
  let quantity = parseInt(cartItemQuantity.textContent);
  cartItemQuantity.textContent = quantity + 1;
  let finalPrice = (products[productId - 1].price * (quantity + 1)).toFixed(2);
  const totalPrice = document.getElementById(`cart-total-value`);

  totalPrice.textContent = `$${(
    +products[productId - 1].price + +totalPrice.textContent.split("$")[1]
  ).toFixed(2)}`;
  price.textContent = `$${finalPrice}`;
}

//Decrease the quantity of the product in cart
function decreaseCartItemQuantity(event) {
  var productId = event.target.getAttribute("data-product-id");
  var cart = document.getElementById("cart");
  const cartItemQuantity = cart.querySelector(
    `.cart-item-quantity[data-product-id="${productId}"]`
  );

  const price = cart.querySelector(
    `.cart-item-price[data-product-id="${productId}"]`
  );

  let quantity = parseInt(cartItemQuantity.textContent);
  if (quantity > 0) {
    cartItemQuantity.textContent = quantity - 1;
    let finalPrice = (products[productId - 1].price * (quantity - 1)).toFixed(
      2
    );
    const totalPrice = document.getElementById(`cart-total-value`);

    totalPrice.textContent = `$${(
      +totalPrice.textContent.split("$")[1] - +products[productId - 1].price
    ).toFixed(2)}`;
    price.textContent = `$${finalPrice}`;
  }
}

// Initialization
function init() {
  showProducts();
  addEventListenerToAddProduct();
}

// Start
init();

for (let button of productSizeBtns) {
  button.addEventListener("click", () => {
    for (let ele of productSizeBtns) {
      if (ele.dataset.productId == button.dataset.productId)
        ele.classList.remove("selected-size");
    }
    if (button.classList.contains("selected-size")) {
      button.classList.remove("selected-size");
    } else {
      button.classList.add("selected-size");
    }
  });
}
