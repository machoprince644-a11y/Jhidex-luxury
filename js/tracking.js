// Order Tracking Page Functionality
window.addEventListener('DOMContentLoaded', () => {
    // Check if there's an order number in URL params
    const urlParams = new URLSearchParams(window.location.search);
    const orderId = urlParams.get('orderId');
    
    if (orderId) {
        document.getElementById('trackingNumber').value = orderId;
        searchOrder();
    }
});

function searchOrder() {
    const trackingNumber = document.getElementById('trackingNumber').value.trim();
    const resultsDiv = document.getElementById('trackingResults');
    
    if (!trackingNumber) {
        resultsDiv.innerHTML = '<p style="color: #b0b0b0; text-align: center;">Please enter an order number to track.</p>';
        return;
    }
    
    const order = orders.find(o => o.id === trackingNumber);
    
    if (!order) {
        resultsDiv.innerHTML = `
            <div style="text-align: center; padding: 40px; background-color: #1a1a1a; border-radius: 8px;">
                <i class="fas fa-search" style="font-size: 40px; color: #d4af37; margin-bottom: 20px; display: block;"></i>
                <p style="color: #e74c3c; font-size: 16px;">Order not found.</p>
                <p style="color: #b0b0b0;">Please check your order number and try again.</p>
            </div>
        `;
        return;
    }
    
    const statusSteps = {
        'pending': 1,
        'processing': 2,
        'shipped': 3,
        'delivered': 4
    };
    
    const currentStep = statusSteps[order.status] || 1;
    
    resultsDiv.innerHTML = `
        <div style="background-color: #1a1a1a; border: 1px solid #333; border-radius: 8px; padding: 30px; margin-top: 20px;">
            <h2 style="color: #d4af37; margin-bottom: 20px;">Order #${order.id}</h2>
            
            <div style="margin-bottom: 30px;">
                <div style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 20px; margin-bottom: 20px;">
                    <div style="text-align: center;">
                        <div style="width: 50px; height: 50px; margin: 0 auto 10px; background-color: ${currentStep >= 1 ? '#d4af37' : '#333'}; border-radius: 50%; display: flex; align-items: center; justify-content: center; color: ${currentStep >= 1 ? '#0f0f0f' : '#b0b0b0'}; font-weight: bold;">1</div>
                        <p style="color: ${currentStep >= 1 ? '#d4af37' : '#b0b0b0'}; font-size: 12px;">Pending</p>
                    </div>
                    <div style="text-align: center;">
                        <div style="width: 50px; height: 50px; margin: 0 auto 10px; background-color: ${currentStep >= 2 ? '#d4af37' : '#333'}; border-radius: 50%; display: flex; align-items: center; justify-content: center; color: ${currentStep >= 2 ? '#0f0f0f' : '#b0b0b0'}; font-weight: bold;">2</div>
                        <p style="color: ${currentStep >= 2 ? '#d4af37' : '#b0b0b0'}; font-size: 12px;">Processing</p>
                    </div>
                    <div style="text-align: center;">
                        <div style="width: 50px; height: 50px; margin: 0 auto 10px; background-color: ${currentStep >= 3 ? '#d4af37' : '#333'}; border-radius: 50%; display: flex; align-items: center; justify-content: center; color: ${currentStep >= 3 ? '#0f0f0f' : '#b0b0b0'}; font-weight: bold;">3</div>
                        <p style="color: ${currentStep >= 3 ? '#d4af37' : '#b0b0b0'}; font-size: 12px;">Shipped</p>
                    </div>
                    <div style="text-align: center;">
                        <div style="width: 50px; height: 50px; margin: 0 auto 10px; background-color: ${currentStep >= 4 ? '#27ae60' : '#333'}; border-radius: 50%; display: flex; align-items: center; justify-content: center; color: ${currentStep >= 4 ? '#fff' : '#b0b0b0'}; font-weight: bold;">✓</div>
                        <p style="color: ${currentStep >= 4 ? '#27ae60' : '#b0b0b0'}; font-size: 12px;">Delivered</p>
                    </div>
                </div>
            </div>
            
            <div style="border-top: 1px solid #333; padding-top: 20px;">
                <h3 style="color: #d4af37; margin-bottom: 15px;">Order Details</h3>
                <p style="color: #b0b0b0; margin-bottom: 8px;"><strong>Date:</strong> ${order.date}</p>
                <p style="color: #b0b0b0; margin-bottom: 8px;"><strong>Status:</strong> <span style="color: #27ae60;">${order.status.toUpperCase()}</span></p>
                <p style="color: #b0b0b0; margin-bottom: 8px;"><strong>Total:</strong> $${order.total.toFixed(2)}</p>
            </div>
            
            <div style="border-top: 1px solid #333; padding-top: 20px; margin-top: 20px;">
                <h3 style="color: #d4af37; margin-bottom: 15px;">Shipping Address</h3>
                <p style="color: #b0b0b0;">
                    ${order.firstName} ${order.lastName}<br>
                    ${order.address}<br>
                    ${order.city}, ${order.state} ${order.zipcode}<br>
                    ${order.country}
                </p>
            </div>
            
            <div style="border-top: 1px solid #333; padding-top: 20px; margin-top: 20px;">
                <h3 style="color: #d4af37; margin-bottom: 15px;">Items Ordered</h3>
                ${order.items.map(item => `
                    <p style="color: #b0b0b0; margin-bottom: 8px;">
                        ${item.name} (Qty: ${item.quantity}) - $${(item.price * item.quantity).toFixed(2)}
                    </p>
                `).join('')}
            </div>
            
            <div style="background-color: rgba(212, 175, 55, 0.1); border: 1px solid #d4af37; border-radius: 5px; padding: 15px; margin-top: 20px;">
                <p style="color: #d4af37; margin: 0;">
                    <i class="fas fa-info-circle"></i> For more information, contact us at ibrahimjimoh892@gmail.com
                </p>
            </div>
        </div>
    `;
}
