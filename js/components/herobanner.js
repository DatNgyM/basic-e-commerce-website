// Herobanner Component

const HeroBannerComponent = {
    init: function() {
        this.setupEventListeners();
        this.setupAnimation();
        console.log('Herobanner component initialized');
    },

    setupEventListeners: function() {
        const ctaButton = document.querySelector('.cta-button');
        if (ctaButton) {
            ctaButton.addEventListener('click', this.handleCtaClick.bind(this));
        }
    },

    handleCtaClick: function() {
        const productsSection = document.querySelector('#products');
        if (productsSection) {
            productsSection.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    },

    setupAnimation: function() {
        const herobanner = document.querySelector('.herobanner');
        const content = document.querySelector('.herobanner-content');

        if (window.IntersectionObserver) {
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        content.style.animation = 'fadeInUp 0.8s ease forwards';
                    }
                });
            });

            if (herobanner) {
                observer.observe(herobanner);
            }
        }

        // Add animation
        this.addAnimationStyles();
    },

    addAnimationStyles: function() {
        if (!document.querySelector('#herobanner-animations')) {
            const style = document.createElement('style');
            style.id = 'herobanner-animations';
            style.textContent = `
                @keyframes fadeInUp {
                    from {
                        opacity: 0;
                        transform: translateY(30px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }

                .herobanner-content {
                    animation: fadeInUp 0.8s ease forwards;
                }
            `;
            document.head.appendChild(style);
        }
    }
};

// Make component available globally
window.HeroBannerComponent = HeroBannerComponent;
