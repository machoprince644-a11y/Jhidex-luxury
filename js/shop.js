// Shop Page Functionality
let filteredProducts = [...products];

window.addEventListener('DOMContentLoaded', () => {
    displayProducts();
});

function filterProducts() {
    const categoryCheckboxes = document.querySelectorAll('.filter-group input[type="checkbox"]');
    const sizeCheckboxes = document.querySelectorAll('.filter-group input[type="checkbox"]');
    const priceRange = document.getElementById('priceRange')?.value || 10000;
    
    const selectedCategories = Array.from(categoryCheckboxes)
        .filter(cb => cb.checked && ['suits', 'shoes', 'accessories', 'casual'].includes(cb.value))
        .map(cb => cb.value);
    
    const selectedSizes = Array.from(sizeCheckboxes)
        .filter(cb => cb.checked && ['XS', 'S', 'M', 'L', 'XL', 'XXL', '6', '7', '8', '9', '10', '11', '12', '13', '28', '30', '32', '34', '36', '38', '40', '42'].includes(cb.value))
        .map(cb => cb.value);
    
    filteredProducts = products.filter(p => {
        const categoryMatch = selectedCategories.length === 0 || selectedCategories.includes(p.category);
        const sizeMatch = selectedSizes.length === 0 || p.sizes.some(s => selectedSizes.includes(s));
        const priceMatch = p.price <= priceRange;
        return categoryMatch && sizeMatch && priceMatch;
    });
    
    displayProducts();
}

function displayProducts() {
    const grid = document.getElementById('productsGrid');
    const count = document.getElementById('productCount');
    
    if (grid) {
        grid.innerHTML = filteredProducts.map(product => `
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
        
        if (count) {
            count.textContent = `Showing ${filteredProducts.length} products`;
        }
    }
}

function sortProducts() {
    const sortValue = document.getElementById('sortBy').value;
    
    switch(sortValue) {
        case 'newest':
            filteredProducts.sort((a, b) => b.new - a.new);
            break;
        case 'price-low':
            filteredProducts.sort((a, b) => a.price - b.price);
            break;
        case 'price-high':
            filteredProducts.sort((a, b) => b.price - a.price);
            break;
        case 'popular':
            filteredProducts.sort((a, b) => b.featured - a.featured);
            break;
        default:
            filteredProducts.sort((a, b) => b.featured - a.featured);
    }
    
    displayProducts();
}

function resetFilters() {
    document.querySelectorAll('.filter-group input[type="checkbox"]').forEach(cb => cb.checked = false);
    document.getElementById('priceRange').value = 10000;
    document.getElementById('priceValue').textContent = '10000';
    filteredProducts = [...products];
    displayProducts();
}

// Update price range display
document.addEventListener('DOMContentLoaded', () => {
    const priceRange = document.getElementById('priceRange');
    if (priceRange) {
        priceRange.addEventListener('input', (e) => {
            document.getElementById('priceValue').textContent = e.target.value;
            filterProducts();
        });
    }
});
