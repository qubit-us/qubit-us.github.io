// Form data management
const formData = {
    name: '',
    email: '',
    company: '',
    message: ''
};

// DOM elements
const form = document.getElementById('contactForm');
const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');
const companyInput = document.getElementById('company');
const messageInput = document.getElementById('message');
const sendButton = document.getElementById('sendButton');

// Navigation functionality
document.addEventListener('DOMContentLoaded', function() {
    // Smooth scrolling for navigation links
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const href = this.getAttribute('href');
            if (href && href.startsWith('#')) {
                const target = document.querySelector(href);
                if (target) {
                    // Remove active class from all links
                    navLinks.forEach(navLink => navLink.classList.remove('active'));
                    // Add active class to clicked link
                    this.classList.add('active');
                    
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });
    
    // Update active navigation link on scroll
    const sections = document.querySelectorAll('section[id]');
    window.addEventListener('scroll', () => {
        const scrollPosition = window.scrollY + 100;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    });
    
    // Set initial active state
    const currentHash = window.location.hash || '#home';
    navLinks.forEach(link => {
        if (link.getAttribute('href') === currentHash) {
            link.classList.add('active');
        }
    });
});

// Form functionality
if (nameInput && emailInput && companyInput && messageInput && sendButton) {
    // Update form data when inputs change
    function handleInputChange(event) {
        const { name, value } = event.target;
        formData[name] = value;
    }

    // Add event listeners to form inputs
    nameInput.addEventListener('input', handleInputChange);
    emailInput.addEventListener('input', handleInputChange);
    companyInput.addEventListener('input', handleInputChange);
    messageInput.addEventListener('input', handleInputChange);

    // Handle form submission
    function handleSubmit(event) {
        event.preventDefault();
        
        // Get current form values
        const currentFormData = {
            name: nameInput.value.trim(),
            email: emailInput.value.trim(),
            company: companyInput.value.trim(),
            message: messageInput.value.trim()
        };
        
        // Basic validation
        if (!currentFormData.name || !currentFormData.email || !currentFormData.message) {
            showToast('Please fill in all required fields.', 'error');
            return;
        }
        
        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(currentFormData.email)) {
            showToast('Please enter a valid email address.', 'error');
            return;
        }
        
        // Create mailto URL
        const subject = encodeURIComponent('New Inquiry');
        const body = encodeURIComponent(
            `Name: ${currentFormData.name}\n` +
            `Email: ${currentFormData.email}\n` +
            `Company: ${currentFormData.company}\n` +
            `Message: ${currentFormData.message}`
        );
        
        const mailtoUrl = `mailto:qubit.usa@gmail.com?subject=${subject}&body=${body}`;
        
        // Open email client
        window.open(mailtoUrl);
        
        // Show success message
        showToast('Message sent! We\'ll get back to you within 24 hours.', 'success');
        
        // Reset form
        resetForm();
    }

    // Reset form function
    function resetForm() {
        nameInput.value = '';
        emailInput.value = '';
        companyInput.value = '';
        messageInput.value = '';
        
        // Reset form data object
        formData.name = '';
        formData.email = '';
        formData.company = '';
        formData.message = '';
    }

    // Add click event listener to send button
    sendButton.addEventListener('click', handleSubmit);

    // Add form submission handler
    form.addEventListener('submit', handleSubmit);
}

// Toast notification function
function showToast(message, type = 'info') {
    // Remove existing toast if any
    const existingToast = document.querySelector('.toast');
    if (existingToast) {
        existingToast.remove();
    }
    
    // Create toast element
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    toast.textContent = message;
    
    // Toast styles
    toast.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? '#10b981' : type === 'error' ? '#ef4444' : '#3b82f6'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
        z-index: 1000;
        font-weight: 500;
        max-width: 300px;
        animation: slideInRight 0.3s ease-out;
    `;
    
    // Add to document
    document.body.appendChild(toast);
    
    // Remove after 5 seconds
    setTimeout(() => {
        toast.style.animation = 'slideOutRight 0.3s ease-out';
        setTimeout(() => {
            if (toast.parentNode) {
                toast.parentNode.removeChild(toast);
            }
        }, 300);
    }, 5000);
}

// Add toast animations to document if not already present
if (!document.querySelector('#toast-styles')) {
    const style = document.createElement('style');
    style.id = 'toast-styles';
    style.textContent = `
        @keyframes slideInRight {
            from {
                transform: translateX(100%);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }
        
        @keyframes slideOutRight {
            from {
                transform: translateX(0);
                opacity: 1;
            }
            to {
                transform: translateX(100%);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);
}

// Add focus styles for accessibility
document.addEventListener('DOMContentLoaded', function() {
    const inputs = document.querySelectorAll('.form-input, .form-textarea');
    inputs.forEach(input => {
        input.addEventListener('focus', function() {
            this.parentElement.classList.add('focused');
        });
        
        input.addEventListener('blur', function() {
            this.parentElement.classList.remove('focused');
        });
    });
});

// Add keyboard navigation support
document.addEventListener('keydown', function(e) {
    if (e.key === 'Enter' && e.ctrlKey && form) {
        // Ctrl+Enter to submit form
        const submitEvent = new Event('submit');
        form.dispatchEvent(submitEvent);
    }
});

// Add form validation feedback styles
function addValidationStyles() {
    if (!document.querySelector('#validation-styles')) {
        const style = document.createElement('style');
        style.id = 'validation-styles';
        style.textContent = `
            .form-group.focused .form-label {
                color: #cd0102;
            }
            
            .form-input:invalid,
            .form-textarea:invalid {
                border-color: #ef4444;
            }
            
            .form-input:valid,
            .form-textarea:valid {
                border-color: #10b981;
            }
        `;
        document.head.appendChild(style);
    }
}

// Initialize validation styles
addValidationStyles();

// Initialize page
document.addEventListener('DOMContentLoaded', function() {
    // Add scroll reveal animations for service cards
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animationDelay = '0ms';
                entry.target.classList.add('animate-visible');
            }
        });
    }, observerOptions);

    // Observe service cards for animation
    const serviceCards = document.querySelectorAll('.service-card');
    serviceCards.forEach((card, index) => {
        card.style.animationDelay = `${index * 100}ms`;
        observer.observe(card);
    });
});
