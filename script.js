// Product data
const products = [
  { id: 1, name: "Product 1", price: 10 },
  { id: 2, name: "Product 2", price: 20 },
  { id: 3, name: "Product 3", price: 30 },
  { id: 4, name: "Product 4", price: 40 },
  { id: 5, name: "Product 5", price: 50 },
];

// DOM elements
const productList = document.getElementById("product-list");
const cartList = document.getElementById("cart-list");
const clearCartBtn = document.getElementById("clear-cart-btn");

// Render product list
function renderProducts() {
  products.forEach((product) => {
    const li = document.createElement("li");
    li.innerHTML = `${product.name} - $${product.price} 
      <button class="add-to-cart-btn" data-id="${product.id}">Add to Cart</button>`;
    productList.appendChild(li);
  });

  // Add event listeners to "Add to Cart" buttons
  const addToCartButtons = document.querySelectorAll(".add-to-cart-btn");
  addToCartButtons.forEach((button) =>
    button.addEventListener("click", (event) => {
      const productId = parseInt(event.target.getAttribute("data-id"));
      addToCart(productId);
    })
  );
}

// Render cart list
function renderCart() {
  // Clear the current cart display
  cartList.innerHTML = "";

  // Retrieve cart from session storage
  const cart = JSON.parse(sessionStorage.getItem("cart")) || [];

  // Display the cart items
  cart.forEach((item) => {
    const li = document.createElement("li");
    li.innerHTML = `${item.name} - $${item.price}`;
    cartList.appendChild(li);
  });
}

function addToCart(productId) {
  // Retrieve the current cart from session storage
  const cart = JSON.parse(sessionStorage.getItem("cart")) || [];

  // Check if the product already exists in the cart
  const productExists = cart.some((item) => item.id === productId);
  if (productExists) {
    console.warn(`Product ID ${productId} is already in the cart.`);
    return; // Exit early if the product is already in the cart
  }

  // Find the product by ID and add it to the cart
  const product = products.find((p) => p.id === productId);
  if (product) {
    cart.push(product);
    sessionStorage.setItem("cart", JSON.stringify(cart)); // Update session storage
    console.log("Cart after adding product:", cart); // Debugging log
    renderCart(); // Update the cart display
  }
}


// Clear cart
function clearCart() {
  // Clear cart data in session storage
  sessionStorage.removeItem("cart");

  console.log("Cart cleared."); // Debugging log

  // Update the cart display
  renderCart();
}

// Initial render
renderProducts();
renderCart();

// Add event listener to "Clear Cart" button
clearCartBtn.addEventListener("click", clearCart);


