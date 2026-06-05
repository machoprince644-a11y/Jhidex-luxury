// Contact Page Functionality
function submitContact(event) {
    event.preventDefault();
    
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const subject = document.getElementById('subject').value;
    const message = document.getElementById('message').value;
    
    // In production, this would send to a backend
    console.log('Contact Form Submission:', { name, email, subject, message });
    
    const formMessage = document.getElementById('formMessage');
    formMessage.innerHTML = '<p style="color: #27ae60; margin-top: 20px; padding: 15px; background-color: rgba(39, 174, 96, 0.1); border-radius: 5px;">Thank you for your message! We will get back to you soon.</p>';
    
    document.getElementById('contactForm').reset();
    
    setTimeout(() => {
        formMessage.innerHTML = '';
    }, 5000);
}
