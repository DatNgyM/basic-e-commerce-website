// Header Component

const HeaderComponent = {
    init: function() {
        this.setupEventListeners();
        console.log('Header component initialized');
    },

    setupEventListeners: function() {
        const navLinks = document.querySelectorAll('.nav a');
        navLinks.forEach(link => {
            link.addEventListener('click', this.handleNavClick.bind(this));
        });

        // Add scroll effect to header
        window.addEventListener('scroll', this.handleScroll.bind(this));
    },

    handleNavClick: function(e) {
        const link = e.target;
        this.removeActiveClass();
        link.parentElement.classList.add('active');
    },

    removeActiveClass: function() {
        document.querySelectorAll('.nav li').forEach(li => {
            li.classList.remove('active');
        });
    },

    handleScroll: function() {
        const header = document.querySelector('.header');
        if (window.scrollY > 10) {
            header.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.15)';
        } else {
            header.style.boxShadow = '0 2px 4px rgba(0, 0, 0, 0.1)';
        }
    }
};

// Make component available globally
window.HeaderComponent = HeaderComponent;
