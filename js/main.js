// Main JavaScript file for E-Commerce Website

document.addEventListener('DOMContentLoaded', function() {
    console.log('E-Commerce Website loaded successfully');
    
    // Initialize all components
    initializeComponents();
});

function initializeComponents() {
    // Initialize header
    if (window.HeaderComponent) {
        window.HeaderComponent.init();
    }
    
    // Initialize herobanner
    if (window.HeroBannerComponent) {
        window.HeroBannerComponent.init();
    }
}

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});
