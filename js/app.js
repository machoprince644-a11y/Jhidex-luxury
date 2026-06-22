// Currency & Core Functions
const exchangeRates = { USD: 1, EUR: 0.92, NGN: 1550, GBP: 0.79 };
const currencySymbols = { USD: '$', EUR: '€', NGN: '₦', GBP: '£' };

let currentCurrency = 'NGN';
let cart = JSON.parse(localStorage.getItem('cart')) || [];
let orders = JSON.parse(localStorage.getItem('orders')) || [];

// Make products available globally from products.js
let products = [];

window.addEventListener('DOMContentLoaded', () => {
    // Load products from products.js if not in localStorage
    if (typeof window.productsData !== 'undefined') {
        products = window.productsData;
        if (!localStorage.getItem('products')) {
            localStorage.setItem('products', JSON.stringify(products));
        }
    } else {
        products = JSON.parse(localStorage.getItem('products')) || [];
    }
    
    updateCartCount();
    if (typeof loadFeaturedProducts === 'function') loadFeaturedProducts();
    if (typeof initShop === 'function') initShop(); // For shop.html
});

function updateCartCount() {
    const cartCount = document.getElementById('cartCount');
    if (cartCount) cartCount.textContent = cart.length;
}

function formatPrice(price) {
    const converted = price * exchangeRates[currentCurrency];
    const symbol = currencySymbols[currentCurrency];
    return `\( {symbol} \){converted.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}`;
}

function changeCurrency() {
    const select = document.getElementById('currency');
    if (select) {
        currentCurrency = select.value;
        updateAllPrices();
    }
}

function updateAllPrices() {
    document.querySelectorAll('.product-price, .currency').forEach(el => {
        const base = parseFloat(el.getAttribute('data-price')) || 0;
        if (base) el.textContent = formatPrice(base);
    });
}

// Toggle menu, notifications, etc. (rest of your good functions remain)
function toggleMenu() {
    document.querySelector('.nav-menu')?.classList.toggle('active');
}

function showNotification(message) {
    const notif = document.createElement('div');
    notif.style.cssText = `position:fixed;top:20px;right:20px;background:#27ae60;color:white;padding:15px 20px;border-radius:5px;z-index:3000;`;
    notif.textContent = message;
    document.body.appendChild(notif);
    setTimeout(() => notif.remove(), 2500);
}

// Expose formatPrice globally
window.formatPrice = formatPrice;
window.changeCurrency = changeCurrency;
window.toggleMenu = toggleMenu;
window.showNotification = showNotification;
