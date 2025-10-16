document.addEventListener('DOMContentLoaded', function() {
    // Animate stats counter when scrolled into view
    const animateStats = function() {
        const statNumbers = document.querySelectorAll('.stat-number');
        const statsSection = document.querySelector('.stats-container');
        
        if (!statsSection) return;
        
        const isInViewport = function(element) {
            const rect = element.getBoundingClientRect();
            return (
                rect.top <= (window.innerHeight * 0.9) &&
                rect.bottom >= 0
            );
        };
        
        const startCounting = function() {
            statNumbers.forEach(stat => {
                const target = parseInt(stat.getAttribute('data-count'));
                const duration = 2000; // 2 seconds
                const step = Math.ceil(target / (duration / 16)); // 60fps
                let current = 0;
                
                const updateCount = () => {
                    current += step;
                    if (current >= target) {
                        stat.textContent = target + (stat.getAttribute('data-count') === '100' ? '%' : '+');
                        return;
                    }
                    stat.textContent = current + (stat.getAttribute('data-count') === '100' ? '%' : '+');
                    requestAnimationFrame(updateCount);
                };
                
                updateCount();
            });
        };
        
        let animationStarted = false;
        
        const handleScroll = function() {
            if (isInViewport(statsSection) && !animationStarted) {
                animationStarted = true;
                startCounting();
                window.removeEventListener('scroll', handleScroll);
            }
        };
        
        // Initial check in case stats are already in view
        handleScroll();
        
        // Add scroll event listener
        window.addEventListener('scroll', handleScroll);
    };
    
    // Initialize animations
    animateStats();
    
    // Add hover effect for feature cards
    const featureCards = document.querySelectorAll('.feature-card');
    
    featureCards.forEach(card => {
        // Add hover effect
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px)';
            this.style.boxShadow = '0 15px 40px rgba(0, 0, 0, 0.1)';
            this.querySelector('.feature-icon').style.transform = 'scale(1.1) rotate(5deg)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = '0 5px 20px rgba(0, 0, 0, 0.05)';
            this.querySelector('.feature-icon').style.transform = 'scale(1) rotate(0)';
        });
    });
    
    // Add animation for feature cards when they come into view
    const animateOnScroll = function() {
        const cards = document.querySelectorAll('.feature-card');
        
        const isInViewport = function(element) {
            const rect = element.getBoundingClientRect();
            return (
                rect.top <= (window.innerHeight * 0.8) &&
                rect.bottom >= 0
            );
        };
        
        const handleScroll = function() {
            cards.forEach((card, index) => {
                if (isInViewport(card) && !card.classList.contains('animate')) {
                    // Add staggered animation delay based on index
                    card.style.animationDelay = `${index * 0.1}s`;
                    card.classList.add('animate');
                }
            });
        };
        
        // Initial check in case cards are already in view
        handleScroll();
        
        // Add scroll event listener
        window.addEventListener('scroll', handleScroll);
    };
    
    // Initialize animations
    animateOnScroll();
});
