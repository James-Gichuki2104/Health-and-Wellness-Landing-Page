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