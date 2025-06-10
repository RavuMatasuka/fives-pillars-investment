// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize the website
    initWebsite();
});

// Main initialization function
function initWebsite() {
    // Add smooth scrolling for navigation links
    setupSmoothScrolling();
    
    // Add mobile menu functionality
    setupMobileMenu();
}

// Setup smooth scrolling for navigation links
function setupSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const headerOffset = 70; // Match the header height
                const elementPosition = target.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });

                // Close mobile menu if open
                const navLinks = document.querySelector('.nav-links');
                if (navLinks.classList.contains('active')) {
                    navLinks.classList.remove('active');
                }
            }
        });
    });
}

// Setup mobile menu functionality
function setupMobileMenu() {
    const menuButton = document.querySelector('.mobile-menu-button');
    const navLinks = document.querySelector('.nav-links');
    const backdrop = document.querySelector('.mobile-menu-backdrop');
    
    if (menuButton && navLinks && backdrop) {
        // Toggle menu and backdrop
        menuButton.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            menuButton.classList.toggle('active');
            backdrop.classList.toggle('active');
            // Prevent body scroll when menu is open
            if (navLinks.classList.contains('active')) {
                document.body.style.overflow = 'hidden';
            } else {
                document.body.style.overflow = '';
            }
        });

        // Close menu when clicking the backdrop
        backdrop.addEventListener('click', () => {
            navLinks.classList.remove('active');
            menuButton.classList.remove('active');
            backdrop.classList.remove('active');
            document.body.style.overflow = '';
        });

        // Close menu when clicking a link
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
                menuButton.classList.remove('active');
                backdrop.classList.remove('active');
                document.body.style.overflow = '';
            });
        });

        // Close menu when window is resized
        window.addEventListener('resize', () => {
            if (window.innerWidth > 768) {
                navLinks.classList.remove('active');
                menuButton.classList.remove('active');
                backdrop.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    }
} 