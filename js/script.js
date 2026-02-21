// ==========================
// ADD TO CART
// ==========================
function addToCart(name, price, image) {

    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    cart.push({
        name: name,
        price: price,
        image: image,
        quantity: 1
    });

    localStorage.setItem("cart", JSON.stringify(cart));

    alert(name + " added to cart!");

    updateCartCount();
}


// ==========================
// DISPLAY CART
// ==========================
function displayCart() {

    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    let cartContainer = document.getElementById("cartItems");
    let total = 0;

    if (!cartContainer) return;

    cartContainer.innerHTML = "";

    if (cart.length === 0) {
        cartContainer.innerHTML = "<h3 style='text-align:center;'>Cart is Empty</h3>";
        document.getElementById("totalAmount").innerText = "";
        return;
    }

    cart.forEach(function(item, index) {

        total += item.price * item.quantity;

        cartContainer.innerHTML += `
            <div style="border:1px solid #ccc; padding:15px; margin:15px; text-align:center;">
                <img src="${item.image}" width="120"><br>
                <h3>${item.name}</h3>
                <p>Price: ₹${item.price}</p>
                <p>Quantity: ${item.quantity}</p>
                <p><strong>Total: ₹${item.price * item.quantity}</strong></p>
                <button onclick="increaseQty(${index})">+</button>
                <button onclick="decreaseQty(${index})">-</button>
                <button onclick="removeItem(${index})">Remove</button>
            </div>
        `;
    });

    document.getElementById("totalAmount").innerText =
        "Total Amount: ₹" + total;
}


// ==========================
// REMOVE ITEM
// ==========================
function removeItem(index) {

    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    cart.splice(index, 1);

    localStorage.setItem("cart", JSON.stringify(cart));

    displayCart();
    updateCartCount();
}


// ==========================
// CLEAR CART
// ==========================
function clearCart() {

    localStorage.removeItem("cart");

    displayCart();
    updateCartCount();
}


// ==========================
// INCREASE QUANTITY
// ==========================
function increaseQty(index) {

    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    cart[index].quantity++;

    localStorage.setItem("cart", JSON.stringify(cart));

    displayCart();
}


// ==========================
// DECREASE QUANTITY
// ==========================
function decreaseQty(index) {

    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    if (cart[index].quantity > 1) {
        cart[index].quantity--;
    }

    localStorage.setItem("cart", JSON.stringify(cart));

    displayCart();
}


// ==========================
// UPDATE CART COUNT (Optional)
// ==========================
function updateCartCount() {

    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    let count = 0;

    cart.forEach(function(item) {
        count += item.quantity;
    });

    let cartCountElement = document.getElementById("cartCount");

    if (cartCountElement) {
        cartCountElement.innerText = count;
    }
}


// Run cart count on page load
document.addEventListener("DOMContentLoaded", function() {
    updateCartCount();
});

// ==========================
// DISPLAY CHECKOUT PAGE
// ==========================
function displayCheckout() {

    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    let summaryContainer = document.getElementById("orderSummary");
    let total = 0;

    if (!summaryContainer) return;

    summaryContainer.innerHTML = "";

    if (cart.length === 0) {
        summaryContainer.innerHTML = "<p>Your cart is empty.</p>";
        document.getElementById("checkoutTotal").innerText = "";
        return;
    }

    cart.forEach(function(item) {

        total += item.price * item.quantity;

        summaryContainer.innerHTML += `
            <div style="margin:10px 0;">
                ${item.name} - ₹${item.price} x ${item.quantity}
            </div>
        `;
    });

    document.getElementById("checkoutTotal").innerText =
        "Total Amount: ₹" + total;
}


function placeOrder(event) {

    event.preventDefault();

    // Generate Random Order Number
    let orderNumber = "ORD" + Math.floor(Math.random() * 1000000);

    // Save order number temporarily
    localStorage.setItem("lastOrder", orderNumber);

    // Clear cart
    localStorage.removeItem("cart");

    // Redirect to confirmation page
    window.location.href = "confirmation.html";
}