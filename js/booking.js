// ============================================
// INVISIBLE BRACES DENTAL & SKIN POLYCLINIC
// Booking Form Handler
// ============================================

document.addEventListener('DOMContentLoaded', function () {

    const appointmentForm = document.getElementById('appointmentForm');

    if (appointmentForm) {
        // Set minimum date to today
        const dateInput = document.getElementById('date');
        if (dateInput) {
            const today = new Date().toISOString().split('T')[0];
            dateInput.setAttribute('min', today);
        }

        appointmentForm.addEventListener('submit', function (e) {
            e.preventDefault();

            // Get form data
            const formData = {
                name: document.getElementById('name').value,
                email: document.getElementById('email').value,
                phone: document.getElementById('phone').value,
                service: document.getElementById('service').value,
                date: document.getElementById('date').value,
                time: document.getElementById('time').value,
                message: document.getElementById('message').value
            };

            // Validate form
            if (!formData.name || !formData.email || !formData.phone || !formData.service) {
                showMessage('Please fill in all required fields', 'error');
                return;
            }

            // Email validation
            if (!isValidEmail(formData.email)) {
                showMessage('Please enter a valid email address', 'error');
                return;
            }

            // Phone validation
            if (!isValidPhone(formData.phone)) {
                showMessage('Please enter a valid phone number', 'error');
                return;
            }

            // Show loading state
            const submitButton = appointmentForm.querySelector('button[type="submit"]');
            const originalButtonText = submitButton.innerHTML;
            submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
            submitButton.disabled = true;

            // Simulate form submission (replace with actual API call)
            setTimeout(() => {
                // Success
                showMessage('Thank you! Your appointment request has been received. We will contact you within 24 hours to confirm your appointment.', 'success');
                appointmentForm.reset();
                submitButton.innerHTML = originalButtonText;
                submitButton.disabled = false;

                // Optional: Send WhatsApp message
                sendWhatsAppNotification(formData);
            }, 1500);
        });
    }

    function showMessage(message, type) {
        // Remove existing messages
        const existingMessages = document.querySelectorAll('.booking-message');
        existingMessages.forEach(msg => msg.remove());

        const messageDiv = document.createElement('div');
        messageDiv.className = `booking-message ${type}`;
        messageDiv.style.padding = '1rem';
        messageDiv.style.marginTop = '1rem';
        messageDiv.style.borderRadius = '0.5rem';
        messageDiv.style.fontWeight = '500';

        if (type === 'success') {
            messageDiv.style.backgroundColor = '#D1FAE5';
            messageDiv.style.color = '#065F46';
            messageDiv.innerHTML = `<i class="fas fa-check-circle"></i> ${message}`;
        } else {
            messageDiv.style.backgroundColor = '#FEE2E2';
            messageDiv.style.color = '#991B1B';
            messageDiv.innerHTML = `<i class="fas fa-exclamation-circle"></i> ${message}`;
        }

        appointmentForm.appendChild(messageDiv);

        // Scroll to message
        messageDiv.scrollIntoView({ behavior: 'smooth', block: 'nearest' });

        // Auto-remove after 5 seconds
        setTimeout(() => {
            messageDiv.remove();
        }, 5000);
    }

    function isValidEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }

    function isValidPhone(phone) {
        const re = /^[\d\s\+\-\(\)]+$/;
        return re.test(phone) && phone.replace(/\D/g, '').length >= 10;
    }

    function sendWhatsAppNotification(formData) {
        // Format message for WhatsApp
        const message = `New Appointment Request:\n\nName: ${formData.name}\nEmail: ${formData.email}\nPhone: ${formData.phone}\nService: ${formData.service}\nPreferred Date: ${formData.date || 'Not specified'}\nPreferred Time: ${formData.time || 'Not specified'}\nMessage: ${formData.message || 'None'}`;

        // Encode message for URL
        const encodedMessage = encodeURIComponent(message);

        // Open WhatsApp (optional - uncomment if you want to auto-open)
        // window.open(`https://wa.me/971555296155?text=${encodedMessage}`, '_blank');
    }

    // Real-time phone number formatting
    const phoneInput = document.getElementById('phone');
    if (phoneInput) {
        phoneInput.addEventListener('input', function (e) {
            let value = e.target.value.replace(/\D/g, '');
            if (value.length > 0) {
                // Format as +971 XX XXX XXXX
                if (value.startsWith('971')) {
                    value = '+971 ' + value.substring(3);
                } else if (value.startsWith('0')) {
                    value = '+971 ' + value.substring(1);
                }
            }
            e.target.value = value;
        });
    }

    // Service selection helper
    const serviceSelect = document.getElementById('service');
    if (serviceSelect) {
        serviceSelect.addEventListener('change', function () {
            const selectedService = this.options[this.selectedIndex].text;
            console.log('Selected service:', selectedService);
        });
    }
});
