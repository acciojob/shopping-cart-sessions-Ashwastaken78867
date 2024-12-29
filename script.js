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

  // Check if the product is already in the cart
  const productExists = cart.some((item) => item.id === productId);

  if (!productExists) {
    // Find the product by ID
    const product = products.find((p) => p.id === productId);

    // Add the product to the cart
    cart.push(product);

    // Save the updated cart back to session storage
    sessionStorage.setItem("cart", JSON.stringify(cart));

    // Update the cart display
    renderCart();
  } else {
    console.warn(`Product ID ${productId} is already in the cart.`);
  }
}




// Clear cart
function clearCart() {
  // Clear cart data in session storage
  sessionStorage.removeItem("cart");

  // Update the cart display
  renderCart();
}

// Initial render
renderProducts();
renderCart();

// Add event listener to "Clear Cart" button
clearCartBtn.addEventListener("click", clearCart);

