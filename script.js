function slideOfferings(direction) {
    const container = document.querySelector('.offerings-box');
    const offerings = document.querySelectorAll('.offering');
    const offeringsPerView = 2;
    const totalOfferings = offerings.length;
    let currentIndex = parseInt(container.dataset.currentIndex || '0');

    if (direction === 'prev') {
        currentIndex = Math.max(0, currentIndex - offeringsPerView);
    } else {
        currentIndex = Math.min(totalOfferings - offeringsPerView, currentIndex + offeringsPerView);
    }

    container.dataset.currentIndex = currentIndex;

    // Hide all offerings first
    offerings.forEach(offering => {
        offering.style.display = 'none';
    });

    // Show only the current two offerings
    for (let i = currentIndex; i < Math.min(currentIndex + offeringsPerView, totalOfferings); i++) {
        offerings[i].style.display = 'flex';
    }

    // Update button states
    const prevButton = document.querySelector('.nav-button.prev');
    const nextButton = document.querySelector('.nav-button.next');
    
    prevButton.style.opacity = currentIndex === 0 ? '0.5' : '1';
    nextButton.style.opacity = currentIndex >= totalOfferings - offeringsPerView ? '0.5' : '1';
    
    // Add smooth transition effect
    container.style.transition = 'opacity 0.3s ease';
    container.style.opacity = '0';
    setTimeout(() => {
        container.style.opacity = '1';
    }, 50);
}

// Initialize offerings display
window.addEventListener('load', () => {
    const container = document.querySelector('.offerings-box');
    const offerings = document.querySelectorAll('.offering');
    container.dataset.currentIndex = '0';
    
    // Initially hide all offerings except first two
    offerings.forEach((offering, index) => {
        offering.style.display = index < 2 ? 'flex' : 'none';
    });
    
    // Set initial button states
    document.querySelector('.nav-button.prev').style.opacity = '0.5';
    document.querySelector('.nav-button.next').style.opacity = offerings.length > 2 ? '1' : '0.5';
});

// Cart functionality
let cartTotal = 0;
const totalElement = document.querySelector('.total-amount');

function formatKenyanPrice(amount) {
    return `KSh ${amount.toLocaleString('en-KE', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
}

function updateTotal() {
    totalElement.textContent = formatKenyanPrice(cartTotal);
}

// Add click event listeners to product items
document.querySelectorAll('.product-item').forEach(item => {
    item.addEventListener('click', () => {
        const priceText = item.querySelector('.price').textContent;
        const price = parseFloat(priceText.replace('KSh ', ''));
        cartTotal += price;
        updateTotal();
        
        // Visual feedback
        item.style.backgroundColor = 'rgba(106, 191, 75, 0.2)';
        setTimeout(() => {
            item.style.backgroundColor = '';
        }, 300);

        // Show added to cart message
        const productName = item.querySelector('h5').textContent;
        const message = document.createElement('div');
        message.className = 'add-to-cart-message';
        message.textContent = `Added ${productName} to cart`;
        document.body.appendChild(message);
        
        setTimeout(() => {
            message.remove();
        }, 2000);
    });
});

// Form validation and redirection functionality
document.addEventListener('DOMContentLoaded', function() {
    const signupForm = document.getElementById('signupForm');
    if (signupForm) {
        signupForm.addEventListener('submit', function(event) {
            event.preventDefault();
            
            // Reset error messages
            document.querySelectorAll('.error-message').forEach(error => {
                error.style.display = 'none';
                error.textContent = '';
            });

            // Get form values
            const fullname = document.getElementById('fullname').value.trim();
            const email = document.getElementById('email').value.trim();
            const phone = document.getElementById('phone').value.trim();
            const package = document.getElementById('package').value;

            // Validate form
            let isValid = true;

            if (!fullname) {
                showError('fullnameError', 'Please enter your full name');
                isValid = false;
            }

            if (!email) {
                showError('emailError', 'Please enter your email address');
                isValid = false;
            } else if (!isValidEmail(email)) {
                showError('emailError', 'Please enter a valid email address');
                isValid = false;
            }

            if (!phone) {
                showError('phoneError', 'Please enter your phone number');
                isValid = false;
            } else if (!isValidPhone(phone)) {
                showError('phoneError', 'Please enter a valid phone number');
                isValid = false;
            }

            if (!package) {
                showError('packageError', 'Please select a wellness package');
                isValid = false;
            }

            if (isValid) {
                // Show gratitude message
                const gratitudeMessage = "Thank you for signing up! Your wellness journey starts now. Redirecting you to your personalized plan... 💚";
                
                // Add fade-out animation
                const container = document.querySelector('.signup-container');
                container.classList.add('fade-out');

                // Show gratitude message and redirect after animation
                setTimeout(() => {
                    alert(gratitudeMessage);
                    redirectToPackage(package);
                }, 300);
            }
        });
    }

    // Newsletter subscription form handler
    const subscribeForm = document.querySelector('.subscribe-form');
    if (subscribeForm) {
        subscribeForm.addEventListener('submit', function(event) {
            event.preventDefault();
            
            // Show subscription confirmation message
            alert("Thanks For Subscribing!");
            
            // Reset the form
            subscribeForm.reset();
        });
    }
});

// Helper functions
function showError(elementId, message) {
    const errorElement = document.getElementById(elementId);
    errorElement.textContent = message;
    errorElement.style.display = 'block';
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function isValidPhone(phone) {
    const phoneRegex = /^\+?[\d\s-]{10,}$/;
    return phoneRegex.test(phone);
}

function redirectToPackage(package) {
    const redirectMap = {
        'basic': 'basic.html',
        'premium': 'premium.html',
        'family': 'family.html'
    };

    const redirectUrl = redirectMap[package];
    if (redirectUrl) {
        window.location.href = redirectUrl;
    }
}