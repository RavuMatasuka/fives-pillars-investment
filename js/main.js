// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize the website
    initWebsite();
    setupFounderModal();
    const fadeEls = document.querySelectorAll('.fade-in-up');
    if ('IntersectionObserver' in window) {
        const observer = new IntersectionObserver((entries, obs) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    obs.unobserve(entry.target);
                }
            });
        }, { threshold: 0.15 });
        fadeEls.forEach(el => observer.observe(el));
    } else {
        // Fallback for old browsers
        fadeEls.forEach(el => el.classList.add('visible'));
    }
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

// Founder modal popup for fullscreen founder images
function setupFounderModal() {
    const modal = document.getElementById('founder-modal');
    const modalImg = modal.querySelector('.founder-modal-img');
    const modalCaption = modal.querySelector('.founder-modal-caption');
    const closeBtn = modal.querySelector('.founder-modal-close');
    const backdrop = modal.querySelector('.founder-modal-backdrop');
    const founderPhotos = document.querySelectorAll('.founder-photo');

    founderPhotos.forEach(photo => {
        photo.addEventListener('click', function() {
            modalImg.src = this.src;
            modalImg.alt = this.alt;
            // Use the card's name and title for caption
            const card = this.closest('.founder-card');
            const name = card.querySelector('h3')?.textContent || '';
            const title = card.querySelector('.founder-title')?.textContent || '';
            modalCaption.textContent = name + (title ? ' — ' + title : '');
            modal.classList.add('active');
            modal.style.display = 'flex';
            document.body.style.overflow = 'hidden';
        });
    });
    
    function closeModal() {
        modal.classList.remove('active');
        modal.style.display = 'none';
        modalImg.src = '';
        document.body.style.overflow = '';
    }
    
    closeBtn.addEventListener('click', closeModal);
    backdrop.addEventListener('click', closeModal);
    
    // Close on ESC key
    document.addEventListener('keydown', function(e) {
        if (modal.classList.contains('active') && (e.key === 'Escape' || e.key === 'Esc')) {
            closeModal();
        }
    });
} 