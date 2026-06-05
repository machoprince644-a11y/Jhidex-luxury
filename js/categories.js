// Categories Page Functionality
window.addEventListener('DOMContentLoaded', () => {
    loadCategories();
});

function loadCategories() {
    const categories = ['suits', 'shoes', 'accessories', 'casual'];
    
    categories.forEach(category => {
        const container = document.getElementById(category + 'Category');
        if (container) {
            const categoryProducts = getProductsByCategory(category);
            container.innerHTML = categoryProducts.map(product => `
                <div class="product-card" onclick="viewProductDetails(${product.id})">
                    <div class="product-image">
                        <div style="background: linear-gradient(135deg, #2a2a2a 0%, #1f1f1f 100%); width: 100%; height: 100%; display: flex; align-items: center; justify-content: center; font-size: 40px;">
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
    });
}
