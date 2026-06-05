// New Arrivals Page Functionality
window.addEventListener('DOMContentLoaded', () => {
    loadNewArrivals();
});

function loadNewArrivals() {
    const container = document.getElementById('newArrivalsGrid');
    if (container) {
        const newProducts = products.filter(p => p.new);
        container.innerHTML = newProducts.map(product => `
            <div class="product-card" onclick="viewProductDetails(${product.id})">
                <div class="product-image">
                    <div style="background: linear-gradient(135deg, #2a2a2a 0%, #1f1f1f 100%); width: 100%; height: 100%; display: flex; align-items: center; justify-content: center; font-size: 40px;">
                        ${product.emoji || '👔'}
                    </div>
                    <span class="product-badge">NEW</span>
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
}
