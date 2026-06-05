// Currency Conversion Rates
const exchangeRates = {
    USD: 1,
    EUR: 0.92,
    NGN: 1550,
    GBP: 0.79
};

const currencySymbols = {
    USD: '$',
    EUR: '€',
    NGN: '₦',
    GBP: '£'
};

let currentCurrency = 'USD';
let cart = JSON.parse(localStorage.getItem('cart')) || [];
 let orders = JSON.parse(localStorage.getItem('orders')) || [];
let products = JSON.parse(localStorage.getItem('products')) || [];

// Load cart count on page load
window.addEventListener('DOMContentLoaded', () => {
    updateCartCount();
    loadFeaturedProducts();
});

// Update Cart Count
function updateCartCount() {
    const cartCount = document.getElementById('cartCount');
    if (cartCount) {
        cartCount.textContent = cart.length;
    }
}

// Toggle Navigation Menu
function toggleMenu() {
    const navMenu = document.querySelector('.nav-menu');
    if (navMenu) {
        navMenu.classList.toggle('active');
    }
}

// Change Currency
function changeCurrency() {
    const currencySelect = document.getElementById('currency');
    if (currencySelect) {
        currentCurrency = currencySelect.value;
        updateAllPrices();
    }
}

// Update All Prices on Page
function updateAllPrices() {
    const priceElements = document.querySelectorAll('.currency');
    priceElements.forEach(element => {
        const basePrice = parseFloat(element.getAttribute('data-price') || element.textContent.replace(/[^0-9.]/g, ''));
        if (basePrice) {
            const convertedPrice = basePrice * exchangeRates[currentCurrency];
            element.textContent = formatPrice(convertedPrice);
        }
    });
}

// Format Price
function formatPrice(price) {
    const converted = price * exchangeRates[currentCurrency];
    const symbol = currencySymbols[currentCurrency];
    return `${symbol}${converted.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
}

// Load Featured Products on Home Page
function loadFeaturedProducts() {
    const featuredContainer = document.getElementById('featuredProducts');
    if (!featuredContainer) return;

    const featuredProducts = products.filter(p => p.featured).slice(0, 4);
    featuredContainer.innerHTML = featuredProducts.map(product => `
        <div class="product-card" onclick="viewProductDetails(${product.id})">
            <div class="product-image">
                <div style="background: linear-gradient(135deg, #2a2a2a 0%, #1f1f1f 100%); width: 100%; height: 100%; display: flex; align-items: center; justify-content: center; font-size: 40px; color: #d4af37;">
                    ${product.emoji || '👔'}
                </div>
                ${product.new ? '<span class="product-badge">NEW</span>' : ''}
            </div>
            <div class="product-info">
                <p class="product-category">${product.category}</p>
                <h3 class="product-name">${product.name}</h3>
                <p class="product-price" data-price="${product.price}">${formatPrice(product.price)}</p>
                <div class="product-actions">
                    <button onclick="event.stopPropagation(); addToCart(${product.id})">Add to Cart</button>
                </div>
            </div>
        </div>
    `).join('');
}

// Add to Cart
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    if (product) {
        const existingItem = cart.find(item => item.id === productId);
        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            cart.push({ ...product, quantity: 1 });
        }
        localStorage.setItem('cart', JSON.stringify(cart));
        updateCartCount();
        showNotification('Added to cart!');
    }
}

// Remove from Cart
function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
}

// Update Quantity
function updateQuantity(productId, quantity) {
    const item = cart.find(item => item.id === productId);
    if (item) {
        if (quantity > 0) {
            item.quantity = quantity;
        } else {
            removeFromCart(productId);
        }
        localStorage.setItem('cart', JSON.stringify(cart));
    }
}

// Show Tracking Modal
function showTrackingModal() {
    const modal = document.getElementById('trackingModal');
    if (modal) {
        modal.style.display = 'block';
    }
}

// Close Tracking Modal
function closeTrackingModal() {
    const modal = document.getElementById('trackingModal');
    if (modal) {
        modal.style.display = 'none';
    }
}

// Track Order
function trackOrder() {
    const trackingNumber = document.getElementById('trackingNumber').value;
    const order = orders.find(o => o.id === trackingNumber);
    
    if (order) {
        const result = `
            <div style="margin-top: 20px; padding: 20px; background-color: #1a1a1a; border-radius: 5px;">
                <h3 style="color: #d4af37; margin-bottom: 15px;">Order #${order.id}</h3>
                <p><strong>Status:</strong> <span style="color: #27ae60;">${order.status}</span></p>
                <p><strong>Date:</strong> ${order.date}</p>
                <p><strong>Total:</strong> ${formatPrice(order.total)}</p>
                <p><strong>Shipping Address:</strong> ${order.address}, ${order.city}, ${order.state}</p>
                <div style="margin-top: 15px;">
                    <h4 style="color: #d4af37; margin-bottom: 10px;">Items:</h4>
                    ${order.items.map(item => `<p>- ${item.name} (Qty: ${item.quantity})</p>`).join('')}
                </div>
            </div>
        `;
        document.getElementById('trackingResult').innerHTML = result;
    } else {
        document.getElementById('trackingResult').innerHTML = '<p style="color: #e74c3c; margin-top: 20px;">Order not found. Please check your order number.</p>';
    }
}

// Show Notification
function showNotification(message) {
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background-color: #27ae60;
        color: white;
        padding: 15px 20px;
        border-radius: 5px;
        z-index: 3000;
        animation: slideIn 0.3s ease-in;
    `;
    notification.textContent = message;
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.remove();
    }, 3000);
}

// View Product Details
function viewProductDetails(productId) {
    const product = products.find(p => p.id === productId);
    if (product) {
        const modal = document.getElementById('productModal');
        if (modal) {
            const detailsDiv = document.getElementById('productDetails');
            detailsDiv.innerHTML = `
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 30px;">
                    <div>
                        <div style="background: linear-gradient(135deg, #2a2a2a 0%, #1f1f1f 100%); width: 100%; aspect-ratio: 1; border-radius: 8px; display: flex; align-items: center; justify-content: center; font-size: 80px;">
                            ${product.emoji || '👔'}
                        </div>
                    </div>
                    <div>
                        <h2 style="color: #d4af37; margin-bottom: 10px;">${product.name}</h2>
                        <p style="color: #b0b0b0; margin-bottom: 15px;">${product.category.toUpperCase()}</p>
                        <p style="font-size: 24px; color: #d4af37; margin-bottom: 20px;" data-price="${product.price}">${formatPrice(product.price)}</p>
                        <p style="color: #b0b0b0; margin-bottom: 20px; line-height: 1.6;">${product.description}</p>
                        
                        <div style="margin-bottom: 20px;">
                            <h4 style="color: #d4af37; margin-bottom: 10px;">Available Sizes:</h4>
                            <div style="display: flex; gap: 10px; flex-wrap: wrap;">
                                ${product.sizes.map(size => `<button onclick="selectSize('${size}')" style="padding: 8px 15px; border: 1px solid #d4af37; background-color: transparent; color: #d4af37; border-radius: 5px; cursor: pointer;">${size}</button>`).join('')}
                            </div>
                        </div>
                        
                        <div style="margin-bottom: 20px;">
                            <h4 style="color: #d4af37; margin-bottom: 10px;">Available Colors:</h4>
                            <div style="display: flex; gap: 10px; flex-wrap: wrap;">
                                ${product.colors.map(color => `<button onclick="selectColor('${color}')" style="padding: 8px 15px; border: 1px solid #d4af37; background-color: transparent; color: #d4af37; border-radius: 5px; cursor: pointer;">${color}</button>`).join('')}
                            </div>
                        </div>

                        <button onclick="addToCart(${product.id}); closeProductModal();" class="btn btn-primary" style="width: 100%; padding: 12px; margin-bottom: 10px;">Add to Cart</button>
                    </div>
                </div>
            `;
            modal.style.display = 'block';
        }
    }
}

// Close Product Modal
function closeProductModal() {
    const modal = document.getElementById('productModal');
    if (modal) {
        modal.style.display = 'none';
    }
}

// Close Modal on Outside Click
window.addEventListener('click', (event) => {
    const modals = document.querySelectorAll('.modal');
    modals.forEach(modal => {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    });
});

// Select Size (placeholder function)
function selectSize(size) {
    console.log('Selected size:', size);
}

// Select Color (placeholder function)
function selectColor(color) {
    console.log('Selected color:', color);
}
