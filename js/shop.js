// js/shop.js
function initShop() {
    renderAllProducts();
}

function renderAllProducts(filteredProducts = products) {
    const grid = document.getElementById('productsGrid');
    if (!grid) return;
    
    grid.innerHTML = filteredProducts.map(p => `
        <div class="product-card" onclick="viewProductDetails(${p.id})">
            <div class="product-image">
                <div style="font-size:60px;">${p.emoji}</div>
                ${p.new ? '<span class="product-badge">NEW</span>' : ''}
            </div>
            <div class="product-info">
                <p class="product-category">${p.category}</p>
                <h3 class="product-name">${p.name}</h3>
                <p class="product-price" data-price="\( {p.price}"> \){formatPrice(p.price)}</p>
                <button onclick="event.stopPropagation(); addToCart(${p.id});" class="btn btn-primary">Add to Cart</button>
            </div>
        </div>
    `).join('');
}

function filterProducts() {
    // Basic filter logic (expand as needed)
    renderAllProducts(products);
}

window.initShop = initShop;
window.filterProducts = filterProducts;
