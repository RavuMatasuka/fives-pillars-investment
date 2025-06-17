// Sticky Navbar Implementation
document.addEventListener('DOMContentLoaded', function() {
    const header = document.querySelector('header');
    const nav = document.querySelector('nav');
    let lastScroll = 0;

    // Function to handle scroll events
    function handleScroll() {
        const currentScroll = window.pageYOffset;
        
        // Always show header when scrolling up
        if (currentScroll <= 0) {
            header.style.position = 'fixed';
            header.style.top = '0';
            header.style.transform = 'translateY(0)';
            return;
        }

        // Add shadow when scrolled
        if (currentScroll > 0) {
            header.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.3)';
        } else {
            header.style.boxShadow = 'none';
        }

        lastScroll = currentScroll;
    }

    // Add scroll event listener
    window.addEventListener('scroll', handleScroll);

    // Initial check
    handleScroll();
}); 