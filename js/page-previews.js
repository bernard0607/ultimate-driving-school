// Page Previews Enhanced JavaScript
document.addEventListener('DOMContentLoaded', function() {
    
    // Intersection Observer for Page Preview Cards Animation
    const pagePreviewCards = document.querySelectorAll('.page-preview-card');
    const quickActionsSection = document.querySelector('.quick-actions');
    
    const previewObserverOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const previewObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animation = 'slideInUp 0.6s ease-out forwards';
                previewObserver.unobserve(entry.target);
            }
        });
    }, previewObserverOptions);
    
    // Observe all page preview cards
    pagePreviewCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.animationDelay = `${index * 0.1}s`;
        previewObserver.observe(card);
    });
    
    // Observe quick actions section
    if (quickActionsSection) {
        quickActionsSection.style.opacity = '0';
        const quickActionsObserver = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.animation = 'fadeInScale 0.8s ease-out forwards';
                    quickActionsObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.2 });
        
        quickActionsObserver.observe(quickActionsSection);
    }
    
    // Enhanced Hover Effects for Page Preview Cards
    pagePreviewCards.forEach(card => {
        const image = card.querySelector('.page-preview-image img');
        const icon = card.querySelector('.page-preview-icon');
        const button = card.querySelector('.page-preview-button');
        
        card.addEventListener('mouseenter', function() {
            // Add subtle parallax effect to image
            if (image) {
                image.style.transform = 'scale(1.1) translateY(-5px)';
            }
            
            // Rotate and scale icon
            if (icon) {
                icon.style.transform = 'scale(1.2) rotate(10deg)';
            }
            
            // Add glow effect to button
            if (button) {
                button.style.boxShadow = '0 8px 30px rgba(10, 74, 10, 0.4)';
            }
        });
        
        card.addEventListener('mouseleave', function() {
            // Reset image transform
            if (image) {
                image.style.transform = 'scale(1) translateY(0)';
            }
            
            // Reset icon transform
            if (icon) {
                icon.style.transform = 'scale(1) rotate(0deg)';
            }
            
            // Reset button shadow
            if (button) {
                button.style.boxShadow = '0 4px 15px rgba(10, 74, 10, 0.2)';
            }
        });
        
        // Add click ripple effect
        card.addEventListener('click', function(e) {
            const ripple = document.createElement('div');
            ripple.className = 'ripple-effect';
            ripple.style.cssText = `
                position: absolute;
                border-radius: 50%;
                background: rgba(255, 255, 255, 0.6);
                transform: scale(0);
                animation: ripple 0.6s ease-out;
                pointer-events: none;
                z-index: 1000;
            `;
            
            const rect = card.getBoundingClientRect();
            const size = 20;
            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = (e.clientX - rect.left - size / 2) + 'px';
            ripple.style.top = (e.clientY - rect.top - size / 2) + 'px';
            
            card.style.position = 'relative';
            card.appendChild(ripple);
            
            setTimeout(() => ripple.remove(), 600);
        });
    });
    
    // Quick Action Buttons Enhanced Interactions
    const quickActionButtons = document.querySelectorAll('.quick-action-btn');
    
    quickActionButtons.forEach(button => {
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
        
        // Add loading state on click
        button.addEventListener('click', function(e) {
            if (!this.classList.contains('loading')) {
                this.classList.add('loading');
                const originalContent = this.innerHTML;
                
                // Show loading state
                this.innerHTML = '<i class="fas fa-spinner fa-spin"></i><span>Loading...</span>';
                this.style.pointerEvents = 'none';
                
                // Reset after a short delay (simulating navigation)
                setTimeout(() => {
                    this.innerHTML = originalContent;
                    this.classList.remove('loading');
                    this.style.pointerEvents = 'auto';
                }, 1000);
            }
        });
    });
    
    // Smooth Scroll for internal links
    const internalLinks = document.querySelectorAll('a[href^="#"]');
    
    internalLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            if (href !== '#' && document.querySelector(href)) {
                e.preventDefault();
                
                const target = document.querySelector(href);
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });
    
    // Add CSS for animations
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideInUp {
            from {
                opacity: 0;
                transform: translateY(50px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
        
        @keyframes fadeInScale {
            from {
                opacity: 0;
                transform: scale(0.9);
            }
            to {
                opacity: 1;
                transform: scale(1);
            }
        }
        
        @keyframes ripple {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }
        
        .page-preview-card {
            transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        }
        
        .page-preview-image img {
            transition: all 0.6s ease;
        }
        
        .page-preview-icon {
            transition: all 0.3s ease;
        }
        
        .page-preview-button {
            transition: all 0.3s ease;
        }
        
        .quick-action-btn {
            transition: all 0.3s ease;
        }
        
        .quick-action-btn i {
            transition: transform 0.3s ease;
        }
        
        .quick-action-btn.loading {
            opacity: 0.7;
            cursor: not-allowed;
        }
        
        /* Enhanced hover states */
        .page-preview-card:hover {
            z-index: 10;
        }
        
        .page-preview-card:hover .page-preview-content {
            transform: translateY(-2px);
        }
        
        /* Mobile optimizations */
        @media (max-width: 768px) {
            .page-preview-card {
                transition: all 0.3s ease;
            }
            
            .page-preview-card:hover {
                transform: translateY(-5px) scale(1.01);
            }
        }
    `;
    document.head.appendChild(style);
    
    // Performance optimization - Lazy loading for images
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    if (img.dataset.src) {
                        img.src = img.dataset.src;
                        img.removeAttribute('data-src');
                        imageObserver.unobserve(img);
                    }
                }
            });
        });
        
        // Observe all preview images
        const previewImages = document.querySelectorAll('.page-preview-image img[data-src]');
        previewImages.forEach(img => imageObserver.observe(img));
    }
    
    // Add keyboard navigation support
    document.addEventListener('keydown', function(e) {
        // Tab navigation enhancement
        if (e.key === 'Tab') {
            const focusedElement = document.activeElement;
            
            // Add focus indicators for better accessibility
            if (focusedElement.classList.contains('page-preview-button') || 
                focusedElement.classList.contains('quick-action-btn')) {
                focusedElement.style.outline = '3px solid var(--secondary-color, #ff9000)';
                focusedElement.style.outlineOffset = '2px';
            }
        }
    });
    
    // Remove focus outlines on mouse interaction
    document.addEventListener('mousedown', function() {
        const buttons = document.querySelectorAll('.page-preview-button, .quick-action-btn');
        buttons.forEach(btn => {
            btn.style.outline = 'none';
        });
    });
    
    // Analytics tracking for page preview interactions
    pagePreviewCards.forEach(card => {
        const button = card.querySelector('.page-preview-button');
        if (button) {
            button.addEventListener('click', function() {
                const pageName = card.querySelector('.page-preview-title').textContent;
                
                // Track page preview clicks (if analytics is available)
                if (typeof gtag !== 'undefined') {
                    gtag('event', 'page_preview_click', {
                        'page_name': pageName,
                        'button_text': this.querySelector('span').textContent
                    });
                }
                
                console.log(`Page preview clicked: ${pageName}`);
            });
        }
    });
});
