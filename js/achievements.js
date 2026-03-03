// Enhanced Achievements Section JavaScript
document.addEventListener('DOMContentLoaded', function() {
    
    // Animated Counter Class
    class AnimatedCounter {
        constructor(element, target, duration = 2000, suffix = '') {
            this.element = element;
            this.target = target;
            this.duration = duration;
            this.suffix = suffix;
            this.start = 0;
            this.startTime = null;
            this.isAnimating = false;
        }
        
        easeOutQuad(t) {
            return t * (2 - t);
        }
        
        update(currentTime) {
            if (!this.startTime) this.startTime = currentTime;
            
            const elapsed = currentTime - this.startTime;
            const progress = Math.min(elapsed / this.duration, 1);
            
            const easedProgress = this.easeOutQuad(progress);
            const current = Math.floor(this.start + (this.target - this.start) * easedProgress);
            
            // Format number with commas
            const formattedNumber = current.toLocaleString();
            this.element.textContent = formattedNumber + this.suffix;
            
            if (progress < 1) {
                requestAnimationFrame((time) => this.update(time));
            } else {
                this.isAnimating = false;
                // Add completion animation
                this.element.style.transform = 'scale(1.1)';
                setTimeout(() => {
                    this.element.style.transform = 'scale(1)';
                }, 200);
            }
        }
        
        start() {
            if (this.isAnimating) return;
            this.isAnimating = true;
            this.startTime = null;
            requestAnimationFrame((time) => this.update(time));
        }
        
        reset() {
            this.element.textContent = '0' + this.suffix;
            this.isAnimating = false;
            this.startTime = null;
        }
    }
    
    // Initialize counters when they come into view
    const counters = [];
    const counterElements = document.querySelectorAll('.achievement-number');
    
    counterElements.forEach(element => {
        const text = element.textContent;
        const number = parseInt(text.replace(/[^0-9]/g, ''));
        const suffix = text.replace(/[0-9]/g, '');
        
        counters.push(new AnimatedCounter(element, number, 2500, suffix));
    });
    
    // Intersection Observer for triggering animations
    const achievementsSection = document.querySelector('.achievements-section');
    
    if (achievementsSection) {
        const observerOptions = {
            threshold: 0.3,
            rootMargin: '0px 0px -100px 0px'
        };
        
        const achievementsObserver = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // Start counter animations with staggered delays
                    counters.forEach((counter, index) => {
                        setTimeout(() => {
                            counter.start();
                        }, index * 200);
                    });
                    
                    achievementsObserver.unobserve(entry.target);
                }
            });
        }, observerOptions);
        
        achievementsObserver.observe(achievementsSection);
    }
    
    // Enhanced hover effects for achievement cards
    const achievementCards = document.querySelectorAll('.achievement-card');
    
    achievementCards.forEach((card, index) => {
        // Add entrance animation
        card.style.animationDelay = `${index * 0.1}s`;
        
        // Mouse move parallax effect
        card.addEventListener('mousemove', function(e) {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const deltaX = (x - centerX) / centerX;
            const deltaY = (y - centerY) / centerY;
            
            const rotateX = deltaY * 5;
            const rotateY = deltaX * 5;
            
            card.style.transform = `perspective(1000px) rotateX(${-rotateX}deg) rotateY(${rotateY}deg) translateY(-15px) scale(1.05)`;
        });
        
        card.addEventListener('mouseleave', function() {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0) scale(1)';
        });
        
        // Click ripple effect
        card.addEventListener('click', function(e) {
            const ripple = document.createElement('div');
            ripple.className = 'achievement-ripple';
            ripple.style.cssText = `
                position: absolute;
                border-radius: 50%;
                background: rgba(255, 255, 255, 0.3);
                transform: scale(0);
                animation: achievementRipple 0.8s ease-out;
                pointer-events: none;
                z-index: 100;
            `;
            
            const rect = card.getBoundingClientRect();
            const size = 30;
            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = (e.clientX - rect.left - size / 2) + 'px';
            ripple.style.top = (e.clientY - rect.top - size / 2) + 'px';
            
            card.style.position = 'relative';
            card.appendChild(ripple);
            
            setTimeout(() => ripple.remove(), 800);
        });
    });
    
    // CTA Button interactions
    const ctaButtons = document.querySelectorAll('.achievement-cta-btn');
    
    ctaButtons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            const icon = this.querySelector('i');
            if (icon) {
                icon.style.transform = 'scale(1.3) rotate(15deg)';
            }
        });
        
        button.addEventListener('mouseleave', function() {
            const icon = this.querySelector('i');
            if (icon) {
                icon.style.transform = 'scale(1) rotate(0deg)';
            }
        });
        
        // Loading state simulation
        button.addEventListener('click', function(e) {
            if (!this.classList.contains('loading')) {
                this.classList.add('loading');
                const originalContent = this.innerHTML;
                
                // Show loading state
                this.innerHTML = '<i class="fas fa-spinner fa-spin"></i><span>Loading...</span>';
                this.style.pointerEvents = 'none';
                this.style.opacity = '0.7';
                
                // Reset after delay
                setTimeout(() => {
                    this.innerHTML = originalContent;
                    this.classList.remove('loading');
                    this.style.pointerEvents = 'auto';
                    this.style.opacity = '1';
                }, 1500);
            }
        });
    });
    
    // Add floating elements dynamically
    function createFloatingElements() {
        const section = document.querySelector('.achievements-section');
        if (!section) return;
        
        const floatingElements = [
            { class: 'achievement-float-1', delay: 0 },
            { class: 'achievement-float-2', delay: 1000 },
            { class: 'achievement-float-3', delay: 2000 }
        ];
        
        floatingElements.forEach((element, index) => {
            setTimeout(() => {
                const div = document.createElement('div');
                div.className = `achievement-float ${element.class}`;
                section.appendChild(div);
            }, element.delay);
        });
    }
    
    createFloatingElements();
    
    // Add CSS for additional animations
    const style = document.createElement('style');
    style.textContent = `
        @keyframes achievementRipple {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }
        
        .achievement-card {
            transform-style: preserve-3d;
            transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        }
        
        .achievement-number {
            transition: all 0.3s ease;
        }
        
        .achievement-ripple {
            animation: achievementRipple 0.8s ease-out;
        }
        
        .achievement-cta-btn.loading {
            cursor: not-allowed;
        }
        
        /* Enhanced hover states */
        .achievement-card:hover {
            z-index: 10;
        }
        
        .achievement-card:hover .achievement-icon {
            box-shadow: 0 20px 40px rgba(255, 144, 0, 0.3);
        }
        
        /* Mobile optimizations */
        @media (max-width: 768px) {
            .achievement-card:hover {
                transform: translateY(-10px) scale(1.02);
            }
        }
        
        @media (hover: none) {
            .achievement-card {
                transform: none !important;
            }
        }
    `;
    document.head.appendChild(style);
    
    // Performance optimization - reduce animations on lower-end devices
    function isLowEndDevice() {
        return navigator.hardwareConcurrency <= 2 || navigator.deviceMemory <= 2;
    }
    
    if (isLowEndDevice()) {
        // Disable complex animations on low-end devices
        const cards = document.querySelectorAll('.achievement-card');
        cards.forEach(card => {
            card.style.transition = 'all 0.2s ease';
        });
        
        // Reduce floating elements
        const floatingElements = document.querySelectorAll('.achievement-float');
        floatingElements.forEach(element => {
            element.style.display = 'none';
        });
    }
    
    // Keyboard accessibility
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Tab') {
            const focusedElement = document.activeElement;
            
            if (focusedElement.classList.contains('achievement-cta-btn')) {
                focusedElement.style.outline = '3px solid var(--secondary-color, #ff9000)';
                focusedElement.style.outlineOffset = '3px';
            }
        }
    });
    
    // Remove focus outlines on mouse interaction
    document.addEventListener('mousedown', function() {
        const buttons = document.querySelectorAll('.achievement-cta-btn');
        buttons.forEach(btn => {
            btn.style.outline = 'none';
        });
    });
    
    // Analytics tracking for achievement interactions
    if (typeof gtag !== 'undefined') {
        // Track when counters start animating
        const achievementObserver = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    gtag('event', 'achievements_viewed', {
                        'section': 'achievements'
                    });
                    achievementObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });
        
        const achievementsSection = document.querySelector('.achievements-section');
        if (achievementsSection) {
            achievementObserver.observe(achievementsSection);
        }
        
        // Track CTA button clicks
        ctaButtons.forEach(button => {
            button.addEventListener('click', function() {
                const buttonText = this.querySelector('span').textContent;
                gtag('event', 'achievement_cta_click', {
                    'button_text': buttonText,
                    'button_type': this.classList.contains('primary') ? 'primary' : 'secondary'
                });
            });
        });
    }
    
    // Add resize handler for responsive adjustments
    let resizeTimeout;
    window.addEventListener('resize', function() {
        if (resizeTimeout) {
            clearTimeout(resizeTimeout);
        }
        
        resizeTimeout = setTimeout(function() {
            // Recalculate animations if needed
            const width = window.innerWidth;
            if (width <= 768) {
                // Mobile adjustments
                achievementCards.forEach(card => {
                    card.style.transform = 'none';
                });
            }
        }, 250);
    });
    
    console.log('Achievements section enhanced successfully!');
});
