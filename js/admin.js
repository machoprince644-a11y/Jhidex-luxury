// Admin Panel Functionality
const ADMIN_PASSWORD = 'jhidex123';
let isAdminLoggedIn = false;

function loginAdmin(event) {
    event.preventDefault();
    const password = document.getElementById('password').value;
    
    if (password === ADMIN_PASSWORD) {
        isAdminLoggedIn = true;
        localStorage.setItem('adminLoggedIn', 'true');
        document.getElementById('loginForm').style.display = 'none';
        document.getElementById('adminPanel').style.display = 'flex';
        loadDashboard();
    } else {
        const errorDiv = document.getElementById('loginError');
        errorDiv.textContent = 'Invalid password!';
        setTimeout(() => {
            errorDiv.textContent = '';
        }, 3000);
    }
}

function logoutAdmin() {
    isAdminLoggedIn = false;
    localStorage.removeItem('adminLoggedIn');
    document.getElementById('loginForm').style.display = 'flex';
    document.getElementById('adminPanel').style.display = 'none';
    document.getElementById('password').value = '';
}

function showTab(tabName) {
    // Hide all tabs
    document.querySelectorAll('.admin-tab').forEach(tab => {
        tab.classList.remove('active');
    });
    
    // Remove active class from all links
    document.querySelectorAll('.admin-link').forEach(link => {
        link.classList.remove('active');
    });
    
    // Show selected tab
    const tab = document.getElementById(tabName + 'Tab');
    if (tab) {
        tab.classList.add('active');
    }
    
    // Mark link as active
    event.target.classList.add('active');
    
    // Load content for specific tabs
    if (tabName === 'products') {
        loadProducts();
    } else if (tabName === 'orders') {
        loadOrders();
    } else if (tabName === 'inventory') {
        loadInventory();
    } else if (tabName === 'dashboard') {
        loadDashboard();
    }
}

function loadDashboard() {
    const totalOrders = document.getElementById('totalOrders');
    const totalProducts = document.getElementById('totalProducts');
    const totalRevenue = document.getElementById('totalRevenue');
    const totalCustomers = document.getElementById('totalCustomers');
    const pendingOrders = document.getElementById('pendingOrders');
    const shippedOrders = document.getElementById('shippedOrders');
    const deliveredOrders = document.getElementById('deliveredOrders');
    const recentOrdersDiv = document.getElementById('recentOrders');
    
    const uniqueCustomers = new Set(orders.map(o => o.email)).size;
    const revenue = orders.reduce((sum, o) => sum + o.total, 0);
    const pendingCount = orders.filter(o => o.status === 'pending').length;
    const shippedCount = orders.filter(o => o.status === 'shipped').length;
    const deliveredCount = orders.filter(o => o.status === 'delivered').length;
    
    if (totalOrders) totalOrders.textContent = orders.length;
    if (totalProducts) totalProducts.textContent = products.length;
    if (totalRevenue) totalRevenue.textContent = formatPrice(revenue);
    if (totalCustomers) totalCustomers.textContent = uniqueCustomers;
    if (pendingOrders) pendingOrders.textContent = pendingCount;
    if (shippedOrders) shippedOrders.textContent = shippedCount;
    if (deliveredOrders) deliveredOrders.textContent = deliveredCount;
    
    if (recentOrdersDiv) {
        const recent = orders.slice(-5).reverse();
        recentOrdersDiv.innerHTML = recent.length > 0 ? recent.map(order => `
            <p style="padding: 8px 0; border-bottom: 1px solid #333; color: #b0b0b0;">
                <strong style="color: #d4af37;">${order.id}</strong> - ${order.firstName} ${order.lastName} - ${formatPrice(order.total)}
                <span style="color: #27ae60; float: right;">${order.status}</span>
            </p>
        `).join('') : '<p style="color: #b0b0b0;">No orders yet</p>';
    }
}

function loadProducts() {
    const tbody = document.getElementById('productsTableBody');
    if (tbody) {
        tbody.innerHTML = products.map(product => `
            <tr>
                <td>${product.id}</td>
                <td>${product.name}</td>
                <td>${product.category}</td>
                <td>${formatPrice(product.price)}</td>
                <td>${product.sizes ? product.sizes.length : 0} sizes</td>
                <td>
                    <button onclick="editProduct(${product.id})" class="btn btn-secondary" style="padding: 5px 10px; margin-right: 5px;">Edit</button>
                    <button onclick="deleteProduct(${product.id})" class="btn btn-secondary" style="padding: 5px 10px; background-color: #e74c3c;">Delete</button>
                </td>
            </tr>
        `).join('');
    }
}

function loadOrders() {
    const tbody = document.getElementById('ordersTableBody');
    if (tbody) {
        tbody.innerHTML = orders.map(order => `
            <tr>
                <td>${order.id}</td>
                <td>${order.firstName} ${order.lastName}</td>
                <td>${order.date}</td>
                <td>${formatPrice(order.total)}</td>
                <td><span style="color: #27ae60;">${order.status}</span></td>
                <td>
                    <button onclick="viewOrderDetails(${orders.indexOf(order)})" class="btn btn-secondary" style="padding: 5px 10px;">View</button>
                    <button onclick="updateOrderStatus(${orders.indexOf(order)})" class="btn btn-secondary" style="padding: 5px 10px;">Update Status</button>
                </td>
            </tr>
        `).join('');
    }
}

function loadInventory() {
    const tbody = document.getElementById('inventoryTableBody');
    if (tbody) {
        tbody.innerHTML = products.map(product => `
            <tr>
                <td>${product.name}</td>
                <td>SKU-${product.id}</td>
                <td>${Math.floor(Math.random() * 100)}</td>
                <td><span style="color: #27ae60;">In Stock</span></td>
                <td>
                    <button onclick="updateInventory(${product.id})" class="btn btn-secondary" style="padding: 5px 10px;">Update</button>
                </td>
            </tr>
        `).join('');
    }
}

function showAddProductForm() {
    document.getElementById('addProductForm').style.display = 'block';
}

function hideAddProductForm() {
    document.getElementById('addProductForm').style.display = 'none';
}

function addProduct(event) {
    event.preventDefault();
    
    const name = document.getElementById('productName').value;
    const category = document.getElementById('productCategory').value;
    const price = parseFloat(document.getElementById('productPrice').value);
    const stock = parseInt(document.getElementById('productStock').value);
    const description = document.getElementById('productDescription').value;
    const sizes = document.getElementById('productSize').value.split(',').map(s => s.trim()).filter(s => s);
    const colors = document.getElementById('productColor').value.split(',').map(c => c.trim()).filter(c => c);
    
    const newProduct = {
        id: products.length + 1,
        name,
        category,
        price,
        description,
        featured: false,
        new: true,
        emoji: '👔',
        sizes: sizes.length > 0 ? sizes : ['One Size'],
        colors: colors.length > 0 ? colors : ['Default']
    };
    
    products.push(newProduct);
    hideAddProductForm();
    loadProducts();
    loadDashboard();
    
    // Reset form
    document.getElementById('addProductForm').reset();
    showNotification('Product added successfully!');
}

function editProduct(productId) {
    const product = products.find(p => p.id === productId);
    if (product) {
        document.getElementById('editProductId').value = product.id;
        document.getElementById('editProductName').value = product.name;
        document.getElementById('editProductPrice').value = product.price;
        document.getElementById('editProductStock').value = 10;
        document.getElementById('editProductModal').style.display = 'block';
    }
}

function updateProduct(event) {
    event.preventDefault();
    
    const productId = parseInt(document.getElementById('editProductId').value);
    const product = products.find(p => p.id === productId);
    
    if (product) {
        product.name = document.getElementById('editProductName').value;
        product.price = parseFloat(document.getElementById('editProductPrice').value);
        closeEditModal();
        loadProducts();
        loadDashboard();
        showNotification('Product updated successfully!');
    }
}

function closeEditModal() {
    document.getElementById('editProductModal').style.display = 'none';
}

function deleteProduct(productId) {
    if (confirm('Are you sure you want to delete this product?')) {
        products = products.filter(p => p.id !== productId);
        loadProducts();
        loadDashboard();
        showNotification('Product deleted successfully!');
    }
}

function viewOrderDetails(orderIndex) {
    const order = orders[orderIndex];
    if (order) {
        const modal = document.getElementById('orderDetailModal');
        const detailsDiv = document.getElementById('orderDetails');
        
        detailsDiv.innerHTML = `
            <h2 style="color: #d4af37; margin-bottom: 20px;">Order #${order.id}</h2>
            
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 30px;">
                <div>
                    <h3 style="color: #d4af37; margin-bottom: 15px;">Customer Information</h3>
                    <p style="color: #b0b0b0; margin-bottom: 8px;"><strong>Name:</strong> ${order.firstName} ${order.lastName}</p>
                    <p style="color: #b0b0b0; margin-bottom: 8px;"><strong>Email:</strong> ${order.email}</p>
                    <p style="color: #b0b0b0; margin-bottom: 8px;"><strong>Phone:</strong> ${order.phone}</p>
                </div>
                <div>
                    <h3 style="color: #d4af37; margin-bottom: 15px;">Shipping Address</h3>
                    <p style="color: #b0b0b0;">${order.address}<br>${order.city}, ${order.state} ${order.zipcode}<br>${order.country}</p>
                </div>
            </div>
            
            <div style="border-top: 1px solid #333; margin-top: 20px; padding-top: 20px;">
                <h3 style="color: #d4af37; margin-bottom: 15px;">Items</h3>
                <table style="width: 100%; color: #b0b0b0;">
                    <tr style="border-bottom: 1px solid #333;">
                        <th style="text-align: left; padding: 10px 0; color: #d4af37;">Product</th>
                        <th style="text-align: right; padding: 10px 0; color: #d4af37;">Qty</th>
                        <th style="text-align: right; padding: 10px 0; color: #d4af37;">Price</th>
                    </tr>
                    ${order.items.map(item => `
                        <tr style="border-bottom: 1px solid #333;">
                            <td style="padding: 10px 0;">${item.name}</td>
                            <td style="text-align: right; padding: 10px 0;">${item.quantity}</td>
                            <td style="text-align: right; padding: 10px 0;">${formatPrice(item.price * item.quantity)}</td>
                        </tr>
                    `).join('')}
                </table>
            </div>
            
            <div style="border-top: 1px solid #333; margin-top: 20px; padding-top: 20px;">
                <h3 style="color: #d4af37; margin-bottom: 15px;">Order Summary</h3>
                <p style="color: #b0b0b0; margin-bottom: 8px;"><strong>Subtotal:</strong> ${formatPrice(order.subtotal)}</p>
                <p style="color: #b0b0b0; margin-bottom: 8px;"><strong>Shipping:</strong> ${formatPrice(order.shipping)}</p>
                <p style="color: #b0b0b0; margin-bottom: 15px;"><strong>Tax:</strong> ${formatPrice(order.tax)}</p>
                <p style="color: #d4af37; font-size: 18px;"><strong>Total:</strong> ${formatPrice(order.total)}</p>
            </div>
        `;
        
        modal.style.display = 'block';
    }
}

function closeOrderModal() {
    document.getElementById('orderDetailModal').style.display = 'none';
}

function updateOrderStatus(orderIndex) {
    const order = orders[orderIndex];
    const statuses = ['pending', 'processing', 'shipped', 'delivered'];
    const currentIndex = statuses.indexOf(order.status);
    const nextStatus = statuses[(currentIndex + 1) % statuses.length];
    
    order.status = nextStatus;
    localStorage.setItem('orders', JSON.stringify(orders));
    loadOrders();
    loadDashboard();
    showNotification(`Order status updated to: ${nextStatus}`);
}

function filterOrders() {
    const status = document.getElementById('orderStatus').value;
    const tbody = document.getElementById('ordersTableBody');
    
    if (!tbody) return;
    
    const filtered = status ? orders.filter(o => o.status === status) : orders;
    
    tbody.innerHTML = filtered.map(order => `
        <tr>
            <td>${order.id}</td>
            <td>${order.firstName} ${order.lastName}</td>
            <td>${order.date}</td>
            <td>${formatPrice(order.total)}</td>
            <td><span style="color: #27ae60;">${order.status}</span></td>
            <td>
                <button onclick="viewOrderDetails(${orders.indexOf(order)})" class="btn btn-secondary" style="padding: 5px 10px;">View</button>
            </td>
        </tr>
    `).join('');
}

function filterInventory() {
    // Placeholder for inventory filtering
}

function updateInventory(productId) {
    const quantity = prompt('Enter new stock quantity:');
    if (quantity !== null) {
        showNotification('Inventory updated successfully!');
    }
}

// Check if admin is already logged in
window.addEventListener('DOMContentLoaded', () => {
    if (localStorage.getItem('adminLoggedIn') === 'true') {
        isAdminLoggedIn = true;
        document.getElementById('loginForm').style.display = 'none';
        document.getElementById('adminPanel').style.display = 'flex';
        loadDashboard();
    }
});
