document.addEventListener('DOMContentLoaded', function() {
    // Add animation class to course cards when they come into view
    const animateOnScroll = function() {
        const courseCards = document.querySelectorAll('.course-card');
        
        const isInViewport = function(element) {
            const rect = element.getBoundingClientRect();
            return (
                rect.top <= (window.innerHeight * 0.8) &&
                rect.bottom >= 0
            );
        };
        
        const handleScroll = function() {
            courseCards.forEach(card => {
                if (isInViewport(card) && !card.classList.contains('animate')) {
                    card.classList.add('animate');
                }
            });
        };
        
        // Initial check in case cards are already in view
        handleScroll();
        
        // Add scroll event listener
        window.addEventListener('scroll', handleScroll);
    };
    
    // Initialize course card animations
    animateOnScroll();
    
    // Add hover effect for course cards
    const courseCards = document.querySelectorAll('.course-card');
    
    courseCards.forEach(card => {
        // Add hover effect
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-15px)';
            this.style.boxShadow = '0 20px 40px rgba(0, 0, 0, 0.15)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.05)';
        });
        
        // Add click effect
        card.addEventListener('click', function(e) {
            // Only trigger if not clicking on a link
            if (e.target.tagName !== 'A') {
                const link = this.querySelector('a');
                if (link) {
                    window.location.href = link.href;
                }
            }
        });
        
        // Make entire card clickable on mobile
        if (window.innerWidth < 768) {
            card.style.cursor = 'pointer';
        }
    });
    
    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80, // Adjust for fixed header
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Add animation for the courses CTA button
    const ctaButton = document.querySelector('.courses-cta .btn-primary');
    if (ctaButton) {
        ctaButton.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
            this.style.boxShadow = '0 12px 30px rgba(255, 144, 0, 0.5)';
        });
        
        ctaButton.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = '0 5px 15px rgba(255, 144, 0, 0.3)';
        });
    }
});
