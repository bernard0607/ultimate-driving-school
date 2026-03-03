// Enhanced Hero Section JavaScript
document.addEventListener('DOMContentLoaded', function() {
    
    // Typewriter Effect
    class TypeWriter {
        constructor(element, text, speed = 100) {
            this.element = element;
            this.text = text;
            this.speed = speed;
            this.index = 0;
            this.isDeleting = false;
            this.init();
        }
        
        init() {
            this.element.textContent = '';
            this.type();
        }
        
        type() {
            const current = this.index;
            const fullText = this.text;
            
            if (this.isDeleting) {
                this.element.textContent = fullText.substring(0, current - 1);
                this.index--;
            } else {
                this.element.textContent = fullText.substring(0, current + 1);
                this.index++;
            }
            
            let typeSpeed = this.isDeleting ? this.speed / 2 : this.speed;
            
            if (!this.isDeleting && this.index === fullText.length) {
                typeSpeed = 2000; // Pause at end
                this.isDeleting = true;
            } else if (this.isDeleting && this.index === 0) {
                this.isDeleting = false;
                typeSpeed = 500; // Pause before retyping
            }
            
            setTimeout(() => this.type(), typeSpeed);
        }
    }
    
    // Initialize typewriter effect
    const typewriterElement = document.querySelector('.typewriter');
    if (typewriterElement) {
        const text = typewriterElement.getAttribute('data-text');
        new TypeWriter(typewriterElement, text, 100);
    }
    
    // Particle System
    class ParticleSystem {
        constructor(container) {
            this.container = container;
            this.particles = [];
            this.particleCount = 50;
            this.init();
        }
        
        init() {
            for (let i = 0; i < this.particleCount; i++) {
                this.createParticle();
            }
        }
        
        createParticle() {
            const particle = document.createElement('div');
            particle.className = 'particle';
            
            // Random properties
            const size = Math.random() * 4 + 1;
            const startX = Math.random() * window.innerWidth;
            const duration = Math.random() * 15 + 10;
            const delay = Math.random() * 5;
            
            particle.style.width = `${size}px`;
            particle.style.height = `${size}px`;
            particle.style.left = `${startX}px`;
            particle.style.animationDuration = `${duration}s`;
            particle.style.animationDelay = `${delay}s`;
            particle.style.opacity = Math.random() * 0.5 + 0.2;
            
            this.container.appendChild(particle);
            this.particles.push(particle);
        }
    }
    
    // Initialize particle system
    const particleContainer = document.getElementById('hero-particles');
    if (particleContainer) {
        new ParticleSystem(particleContainer);
    }
    
    // Smooth Scroll for scroll down indicator
    const scrollDown = document.querySelector('.scroll-down');
    if (scrollDown) {
        scrollDown.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    }
    
    // Parallax Effect for Hero Shapes
    function handleParallax() {
        const scrolled = window.pageYOffset;
        const shapes = document.querySelectorAll('.hero-shape-1, .hero-shape-2, .hero-shape-3, .hero-shape-4');
        
        shapes.forEach((shape, index) => {
            const speed = (index + 1) * 0.5;
            const yPos = -(scrolled * speed);
            shape.style.transform = `translateY(${yPos}px)`;
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
    
    // Button Hover Effects
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px) scale(1.02)';
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
    
    // Feature Item Animations on Scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const featureObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animation = 'fadeInUp 0.6s ease-out forwards';
                featureObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Observe feature items
    const featureItems = document.querySelectorAll('.feature-item');
    featureItems.forEach((item, index) => {
        item.style.opacity = '0';
        item.style.animationDelay = `${index * 0.1}s`;
        featureObserver.observe(item);
    });
    
    // Loading Animation
    window.addEventListener('load', function() {
        const loadingElement = document.getElementById('hero-loading');
        if (loadingElement) {
            setTimeout(() => {
                loadingElement.style.display = 'none';
            }, 1000);
        }
    });
    
    // Mouse Move Effect for Hero Section
    const heroSection = document.querySelector('.hero-section');
    if (heroSection) {
        heroSection.addEventListener('mousemove', function(e) {
            const mouseX = e.clientX / window.innerWidth - 0.5;
            const mouseY = e.clientY / window.innerHeight - 0.5;
            
            const shapes = document.querySelectorAll('.hero-shape-1, .hero-shape-2, .hero-shape-3, .hero-shape-4');
            shapes.forEach((shape, index) => {
                const speed = (index + 1) * 20;
                const x = mouseX * speed;
                const y = mouseY * speed;
                shape.style.transform = `translate(${x}px, ${y}px)`;
            });
        });
        
        heroSection.addEventListener('mouseleave', function() {
            const shapes = document.querySelectorAll('.hero-shape-1, .hero-shape-2, .hero-shape-3, .hero-shape-4');
            shapes.forEach(shape => {
                shape.style.transform = 'translate(0, 0)';
            });
        });
    }
    
    // Performance optimization - Reduce particles on mobile
    function isMobile() {
        return window.innerWidth <= 768;
    }
    
    if (isMobile() && particleContainer) {
        // Reduce particle count on mobile
        const particles = particleContainer.querySelectorAll('.particle');
        particles.forEach((particle, index) => {
            if (index > 10) {
                particle.remove();
            }
        });
    }
    
    // Add CSS for additional animations
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
        
        .feature-item {
            transition: all 0.3s ease;
        }
        
        .btn {
            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }
    `;
    document.head.appendChild(style);
});
