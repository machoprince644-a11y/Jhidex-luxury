// Checkout Page Functionality
window.addEventListener('DOMContentLoaded', () => {
    displayCheckoutItems();
    updateCheckoutSummary();
    
    const shippingOptions = document.querySelectorAll('input[name="shipping"]');
    shippingOptions.forEach(option => {
        option.addEventListener('change', updateCheckoutSummary);
    });
});

function displayCheckoutItems() {
    const container = document.getElementById('checkoutItems');
    if (container && cart.length > 0) {
        container.innerHTML = cart.map(item => `
            <div style="display: flex; justify-content: space-between; padding: 10px 0; border-bottom: 1px solid #333;">
                <span>${item.name} x ${item.quantity}</span>
                <span class="currency" data-price="${item.price * item.quantity}">${formatPrice(item.price * item.quantity)}</span>
            </div>
        `).join('');
    }
}

function updateCheckoutSummary() {
    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const shippingType = document.querySelector('input[name="shipping"]:checked').value;
    const shipping = shippingType === 'express' ? 50 : 20;
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

function completeOrder() {
    const firstName = document.getElementById('firstName').value;
    const lastName = document.getElementById('lastName').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;
    const address = document.getElementById('address').value;
    const city = document.getElementById('city').value;
    const state = document.getElementById('state').value;
    const zipcode = document.getElementById('zipcode').value;
    const country = document.getElementById('country').value;
    
    if (!firstName || !lastName || !email || !phone || !address || !city || !state || !zipcode) {
        alert('Please fill in all required fields!');
        return;
    }
    
    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const shippingType = document.querySelector('input[name="shipping"]:checked').value;
    const shipping = shippingType === 'express' ? 50 : 20;
    const tax = subtotal * 0.1;
    const total = subtotal + shipping + tax;
    
    const orderId = 'ORD-' + Date.now();
    const orderDate = new Date().toLocaleDateString();
    
    const order = {
        id: orderId,
        firstName,
        lastName,
        email,
        phone,
        address,
        city,
        state,
        zipcode,
        country,
        items: cart,
        subtotal,
        shipping,
        tax,
        total,
        status: 'pending',
        date: orderDate,
        shippingType
    };
    
    orders.push(order);
    localStorage.setItem('orders', JSON.stringify(orders));
    
    // Send email notification to owner
    sendOrderNotification(order);
    
    // Clear cart
    cart = [];
    localStorage.setItem('cart', JSON.stringify(cart));
    
    // Show success modal
    const modal = document.getElementById('successModal');
    const orderNumber = document.getElementById('orderNumber');
    if (modal && orderNumber) {
        orderNumber.textContent = `Order Number: ${orderId}`;
        modal.style.display = 'block';
    }
}

function sendOrderNotification(order) {
    // This would normally send an email to the owner
    // For now, we'll simulate it by logging
    const emailContent = `
        New Order Notification
        =====================
        Order ID: ${order.id}
        Date: ${order.date}
        
        Customer Information:
        Name: ${order.firstName} ${order.lastName}
        Email: ${order.email}
        Phone: ${order.phone}
        
        Delivery Address:
        ${order.address}
        ${order.city}, ${order.state} ${order.zipcode}
        ${order.country}
        
        Items Ordered:
        ${order.items.map(item => `- ${item.name} (Qty: ${item.quantity}) - $${(item.price * item.quantity).toFixed(2)}`).join('\n        ')}
        
        Order Summary:
        Subtotal: $${order.subtotal.toFixed(2)}
        Shipping: $${order.shipping.toFixed(2)}
        Tax (10%): $${order.tax.toFixed(2)}
        Total: $${order.total.toFixed(2)}
        
        Shipping: ${order.shippingType === 'express' ? 'Express (2-3 days)' : 'Standard (5-7 days)'}
    `;
    
    console.log('Email to be sent to ibrahimjimoh892@gmail.com:', emailContent);
    // In production, this would use a backend API to send the email
}
