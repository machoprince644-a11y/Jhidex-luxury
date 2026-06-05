// Cart Page Functionality
window.addEventListener('DOMContentLoaded', () => {
    displayCart();
});

function displayCart() {
    const cartItemsDiv = document.getElementById('cartItems');
    const emptyCartDiv = document.getElementById('emptyCartMessage');
    
    if (cart.length === 0) {
        if (cartItemsDiv) cartItemsDiv.innerHTML = '';
        if (emptyCartDiv) emptyCartDiv.style.display = 'block';
    } else {
        if (emptyCartDiv) emptyCartDiv.style.display = 'none';
        if (cartItemsDiv) {
            cartItemsDiv.innerHTML = cart.map(item => `
                <div class="cart-item">
                    <div class="cart-item-image" style="background: linear-gradient(135deg, #2a2a2a 0%, #1f1f1f 100%); display: flex; align-items: center; justify-content: center; font-size: 30px;">
                        ${item.emoji || '👔'}
                    </div>
                    <div class="cart-item-details">
                        <h3 class="cart-item-name">${item.name}</h3>
                        <p class="cart-item-price" data-price="${item.price}">${formatPrice(item.price)}</p>
                        <div class="cart-item-controls">
                            <div class="quantity-selector">
                                <button onclick="updateQuantity(${item.id}, ${item.quantity - 1})">−</button>
                                <input type="number" value="${item.quantity}" onchange="updateQuantity(${item.id}, parseInt(this.value))">
                                <button onclick="updateQuantity(${item.id}, ${item.quantity + 1})">+</button>
                            </div>
                        </div>
                        <span class="remove-btn" onclick="removeFromCart(${item.id}); displayCart();">Remove</span>
                    </div>
                </div>
            `).join('');
        }
    }
    
    updateCartSummary();
}

function updateCartSummary() {
    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const shipping = subtotal > 0 ? (subtotal > 500 ? 0 : 25) : 0;
    const tax = subtotal * 0.1;
    const total = subtotal + shipping + tax;
    
    const subtotalEl = document.getElementById('subtotal');
    const shippingEl = document.getElementById('shipping');
    const taxEl = document.getElementById('tax');
    const totalEl = document.getElementById('total');
    
    if (subtotalEl) subtotalEl.textContent = formatPrice(subtotal);
    if (shippingEl) shippingEl.textContent = formatPrice(shipping);
    if (taxEl) taxEl.textContent = formatPrice(tax);
    if (totalEl) totalEl.textContent = formatPrice(total);
}

function proceedToCheckout() {
    if (cart.length === 0) {
        alert('Your cart is empty!');
        return;
    }
    window.location.href = 'checkout.html';
}
