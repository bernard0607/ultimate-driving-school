// Enhanced About Us Page JavaScript
document.addEventListener('DOMContentLoaded', function() {
    
    // Animated Counter Class
    class AnimatedCounter {
        constructor(element) {
            this.element = element;
            this.target = parseInt(element.getAttribute('data-count'));
            this.suffix = element.getAttribute('data-suffix') || '';
            this.duration = 2000;
            this.start = 0;
            this.increment = this.target / (this.duration / 16);
            this.current = 0;
            this.isAnimating = false;
        }
        
        animate() {
            if (this.isAnimating) return;
            
            this.isAnimating = true;
            this.current = this.start;
            
            const timer = setInterval(() => {
                this.current += this.increment;
                
                if (this.current >= this.target) {
                    this.current = this.target;
                    clearInterval(timer);
                    this.isAnimating = false;
                }
                
                this.element.textContent = Math.floor(this.current) + this.suffix;
            }, 16);
        }
        
        reset() {
            this.element.textContent = '0' + this.suffix;
            this.current = 0;
            this.isAnimating = false;
        }
    }
    
    // Initialize counters
    const counters = [];
    document.querySelectorAll('.enhanced-stat-number').forEach(counter => {
        counters.push(new AnimatedCounter(counter));
    });
    
    // Intersection Observer for animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Animate expert feature cards
                if (entry.target.classList.contains('expert-feature-card')) {
                    entry.target.style.animation = 'fadeInUp 0.6s ease-out forwards';
                    observer.unobserve(entry.target);
                }
                
                // Animate statistics
                if (entry.target.classList.contains('enhanced-stats-section')) {
                    // Start counter animations
                    counters.forEach(counter => {
                        counter.animate();
                    });
                    observer.unobserve(entry.target);
                }
            }
        });
    }, observerOptions);
    
    // Observe elements
    document.querySelectorAll('.expert-feature-card').forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        observer.observe(card);
    });
    
    const statsSection = document.querySelector('.enhanced-stats-section');
    if (statsSection) {
        observer.observe(statsSection);
    }
    
    // Enhanced hover effects for expert cards
    const expertCards = document.querySelectorAll('.expert-feature-card');
    expertCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            // Add ripple effect
            const ripple = document.createElement('div');
            ripple.className = 'expert-ripple';
            ripple.style.cssText = `
                position: absolute;
                border-radius: 50%;
                background: rgba(74, 222, 128, 0.3);
                transform: scale(0);
                animation: expertRipple 0.8s ease-out;
                pointer-events: none;
                z-index: 1;
            `;
            
            const rect = card.getBoundingClientRect();
            const size = 30;
            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = (event.clientX - rect.left - size / 2) + 'px';
            ripple.style.top = (event.clientY - rect.top - size / 2) + 'px';
            
            card.style.position = 'relative';
            card.appendChild(ripple);
            
            setTimeout(() => ripple.remove(), 800);
        });
    });
    
    // Enhanced hover effects for stat cards
    const statCards = document.querySelectorAll('.enhanced-stat-card');
    statCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            // Add glow effect
            card.style.boxShadow = '0 0 40px rgba(74, 222, 128, 0.3), 0 20px 60px rgba(0, 0, 0, 0.2)';
        });
        
        card.addEventListener('mouseleave', function() {
            card.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.1)';
        });
    });
    
    // Parallax effect for floating elements
    function handleParallax() {
        const scrolled = window.pageYOffset;
        const floatingElements = document.querySelectorAll('.floating-element');
        
        floatingElements.forEach((element, index) => {
            const speed = (index + 1) * 0.5;
            const yPos = -(scrolled * speed);
            element.style.transform = `translateY(${yPos}px)`;
        });
    }
    
    // Throttled scroll handler
    let scrollTimeout;
    window.addEventListener('scroll', function() {
        if (scrollTimeout) {
            window.cancelAnimationFrame(scrollTimeout);
        }
        scrollTimeout = window.requestAnimationFrame(function() {
            handleParallax();
        });
    });
    
    // Add CSS for animations
    const style = document.createElement('style');
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
        
        @keyframes expertRipple {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }
        
        .expert-ripple {
            animation: expertRipple 0.8s ease-out;
        }
        
        .expert-feature-card {
            transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        }
        
        .enhanced-stat-card {
            transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        }
        
        /* Mobile optimizations */
        @media (max-width: 768px) {
            .expert-feature-card:hover {
                transform: translateY(-5px);
            }
            
            .enhanced-stat-card:hover {
                transform: translateY(-5px);
            }
        }
        
        @media (hover: none) {
            .expert-feature-card:hover {
                transform: none;
            }
            
            .enhanced-stat-card:hover {
                transform: none;
            }
        }
    `;
    document.head.appendChild(style);
    
    // Performance optimization - Reduce animations on mobile
    function isMobile() {
        return window.innerWidth <= 768;
    }
    
    if (isMobile()) {
        // Reduce animation duration on mobile
        const styleSheet = document.createElement('style');
        styleSheet.textContent = `
            .expert-feature-card,
            .enhanced-stat-card {
                transition: all 0.2s ease;
            }
            
            @keyframes fadeInUp {
                duration: 0.3s;
            }
        `;
        document.head.appendChild(styleSheet);
    }
    
    console.log('Enhanced About Us page loaded successfully!');
});
