// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize the website
    initWebsite();
    setupFounderModal();
    setupFoundersMobileCarousel();
    setupServicesMobileCarousel();
});

// Main initialization function
function initWebsite() {
    // Add smooth scrolling for navigation links
    setupSmoothScrolling();
    
    // Add mobile menu functionality
    setupMobileMenu();

    // Add carousel functionality for services
    setupServicesCarousel();
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

// Carousel for Our Services section
function setupServicesCarousel() {
    // Get all service cards and carousel controls
    const cards = document.querySelectorAll('.services-carousel .service-card');
    const prevBtn = document.querySelector('.services-carousel .prev');
    const nextBtn = document.querySelector('.services-carousel .next');
    let current = 0;

    // Helper: Animate card transitions
    function animateCardTransition(newIndex, direction) {
        const currentCard = cards[current];
        const nextCard = cards[newIndex];
        // Remove all animation classes
        cards.forEach(card => card.classList.remove('slide-in-left', 'slide-in-right', 'slide-out-left', 'slide-out-right', 'active'));
        // Animate out current card
        if (direction === 'next') {
            currentCard.classList.add('slide-out-left');
            nextCard.classList.add('slide-in-right');
        } else {
            currentCard.classList.add('slide-out-right');
            nextCard.classList.add('slide-in-left');
        }
        // Activate next card after animation
        setTimeout(() => {
            cards.forEach(card => card.classList.remove('slide-in-left', 'slide-in-right', 'slide-out-left', 'slide-out-right', 'active'));
            nextCard.classList.add('active');
        }, 450); // Match CSS transition duration
    }

    // Show the first card initially
    cards[0].classList.add('active');

    // Go to previous card
    prevBtn.addEventListener('click', function() {
        const newIndex = (current - 1 + cards.length) % cards.length;
        animateCardTransition(newIndex, 'prev');
        current = newIndex;
    });

    // Go to next card
    nextBtn.addEventListener('click', function() {
        const newIndex = (current + 1) % cards.length;
        animateCardTransition(newIndex, 'next');
        current = newIndex;
    });
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

// Mobile founders carousel (only on mobile)
function setupFoundersMobileCarousel() {
    const carousel = document.querySelector('.founders-carousel-mobile');
    if (!carousel) return;
    const slides = carousel.querySelectorAll('.founder-card-slide');
    const prevBtn = carousel.querySelector('.carousel-btn.prev');
    const nextBtn = carousel.querySelector('.carousel-btn.next');
    let current = 0;
    function showSlide(index) {
        slides.forEach((slide, i) => {
            slide.classList.toggle('active', i === index);
        });
    }
    showSlide(current);
    prevBtn.addEventListener('click', function() {
        current = (current - 1 + slides.length) % slides.length;
        showSlide(current);
    });
    nextBtn.addEventListener('click', function() {
        current = (current + 1) % slides.length;
        showSlide(current);
    });
    // Optional: swipe support for mobile
    let startX = null;
    carousel.addEventListener('touchstart', function(e) {
        startX = e.touches[0].clientX;
    });
    carousel.addEventListener('touchend', function(e) {
        if (startX === null) return;
        let endX = e.changedTouches[0].clientX;
        if (endX - startX > 40) prevBtn.click();
        else if (startX - endX > 40) nextBtn.click();
        startX = null;
    });
}

function setupServicesMobileCarousel() {
    const carousel = document.querySelector('.services-carousel-mobile');
    if (!carousel) return;
    const slides = carousel.querySelectorAll('.service-card-slide');
    const prevBtn = carousel.querySelector('.carousel-btn.prev');
    const nextBtn = carousel.querySelector('.carousel-btn.next');
    let current = 0;
    // Ensure at least one slide is visible on load
    slides.forEach((slide, i) => slide.classList.toggle('active', i === 0));
    function showSlide(index) {
        slides.forEach((slide, i) => {
            slide.classList.toggle('active', i === index);
        });
    }
    prevBtn.addEventListener('click', function() {
        current = (current - 1 + slides.length) % slides.length;
        showSlide(current);
    });
    nextBtn.addEventListener('click', function() {
        current = (current + 1) % slides.length;
        showSlide(current);
    });
    // Optional: swipe support for mobile
    let startX = null;
    carousel.addEventListener('touchstart', function(e) {
        startX = e.touches[0].clientX;
    });
    carousel.addEventListener('touchend', function(e) {
        if (startX === null) return;
        let endX = e.changedTouches[0].clientX;
        if (endX - startX > 40) prevBtn.click();
        else if (startX - endX > 40) nextBtn.click();
        startX = null;
    });
} 