// Enhanced Blog Page JavaScript
document.addEventListener('DOMContentLoaded', function() {
    
    // Blog Category Filter Functionality
    const categoryButtons = document.querySelectorAll('.blog-category-btn');
    const blogCards = document.querySelectorAll('.blog-card');
    
    categoryButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Remove active class from all buttons
            categoryButtons.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to clicked button
            this.classList.add('active');
            
            const category = this.textContent.trim().toLowerCase();
            
            // Filter blog cards based on category
            blogCards.forEach(card => {
                const cardCategories = card.querySelector('.blog-category-badge').textContent.toLowerCase();
                
                if (category === 'all posts' || cardCategories.includes(category)) {
                    card.style.display = 'block';
                    // Add entrance animation
                    card.style.opacity = '0';
                    card.style.transform = 'translateY(30px)';
                    
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0)';
                    }, 100);
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });
    
    // Enhanced Hover Effects for Blog Cards
    blogCards.forEach(card => {
        const image = card.querySelector('.blog-image img');
        const overlay = card.querySelector('.blog-overlay');
        const readIcon = card.querySelector('.blog-read-icon');
        
        card.addEventListener('mouseenter', function() {
            if (image) {
                image.style.transform = 'scale(1.1)';
            }
            if (overlay) {
                overlay.style.opacity = '1';
            }
            if (readIcon) {
                readIcon.style.transform = 'scale(1)';
            }
        });
        
        card.addEventListener('mouseleave', function() {
            if (image) {
                image.style.transform = 'scale(1)';
            }
            if (overlay) {
                overlay.style.opacity = '0';
            }
            if (readIcon) {
                readIcon.style.transform = 'scale(0)';
            }
        });
        
        // Click ripple effect
        card.addEventListener('click', function(e) {
            const ripple = document.createElement('div');
            ripple.className = 'blog-ripple';
            ripple.style.cssText = `
                position: absolute;
                border-radius: 50%;
                background: rgba(255, 255, 255, 0.3);
                transform: scale(0);
                animation: blogRipple 0.8s ease-out;
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
    
    // Newsletter Form Handling
    const newsletterForm = document.querySelector('.blog-newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const emailInput = this.querySelector('.blog-newsletter-input');
            const submitBtn = this.querySelector('.blog-newsletter-btn');
            const originalBtnText = submitBtn.innerHTML;
            
            if (!emailInput.value) {
                emailInput.style.borderColor = 'red';
                emailInput.placeholder = 'Please enter your email address';
                return;
            }
            
            // Show loading state
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> <span>Subscribing...</span>';
            submitBtn.disabled = true;
            
            // Simulate API call
            setTimeout(() => {
                submitBtn.innerHTML = originalBtnText;
                submitBtn.disabled = false;
                emailInput.value = '';
                
                // Show success message
                const successMessage = document.createElement('div');
                successMessage.style.cssText = `
                    background: linear-gradient(135deg, #4ade80, #22c55e);
                    color: white;
                    padding: 15px 20px;
                    border-radius: 10px;
                    margin-top: 15px;
                    font-family: 'Poppins', sans-serif;
                    text-align: center;
                    animation: slideInUp 0.5s ease-out;
                `;
                successMessage.textContent = 'Successfully subscribed! Check your email for confirmation.';
                newsletterForm.appendChild(successMessage);
                
                setTimeout(() => {
                    successMessage.remove();
                }, 3000);
            }, 1500);
        });
    }
    
    // Intersection Observer for Blog Cards Animation
    const blogObserverOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const blogObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animation = 'fadeInUp 0.6s ease-out forwards';
                blogObserver.unobserve(entry.target);
            }
        });
    }, blogObserverOptions);
    
    // Observe all blog cards
    blogCards.forEach(card => {
        card.style.opacity = '0';
        blogObserver.observe(card);
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
        
        @keyframes blogRipple {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }
        
        .blog-card {
            transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        }
        
        .blog-ripple {
            animation: blogRipple 0.8s ease-out;
        }
        
        @keyframes slideInUp {
            from {
                opacity: 0;
                transform: translateY(30px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
        
        .blog-card:hover {
            z-index: 10;
        }
        
        /* Mobile optimizations */
        @media (max-width: 768px) {
            .blog-card:hover {
                transform: translateY(-5px) scale(1.02);
            }
        }
        
        @media (hover: none) {
            .blog-card:hover {
                transform: none;
            }
        }
    `;
    document.head.appendChild(style);
    
    // Search Functionality (if needed)
    const searchInput = document.querySelector('.blog-search-input');
    if (searchInput) {
        searchInput.addEventListener('input', function(e) {
            const searchTerm = e.target.value.toLowerCase();
            
            blogCards.forEach(card => {
                const title = card.querySelector('.blog-title').textContent.toLowerCase();
                const excerpt = card.querySelector('.blog-excerpt').textContent.toLowerCase();
                
                if (searchTerm === '' || title.includes(searchTerm) || excerpt.includes(searchTerm)) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    }
    
    // Lazy Loading for Images
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
        
        const blogImages = document.querySelectorAll('.blog-image img[data-src]');
        blogImages.forEach(img => imageObserver.observe(img));
    }
    
    // Social Sharing Functions
    const shareButtons = document.querySelectorAll('.share-btn');
    shareButtons.forEach(button => {
        button.addEventListener('click', function() {
            const platform = this.getAttribute('title');
            const url = window.location.href;
            const title = document.querySelector('h1').textContent;
            
            let shareUrl = '';
            
            switch(platform) {
                case 'Share on Facebook':
                    shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}&t=${encodeURIComponent(title)}`;
                    break;
                case 'Share on Twitter':
                    shareUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`;
                    break;
                case 'Share on WhatsApp':
                    shareUrl = `https://wa.me/?text=${encodeURIComponent(`${title} ${url}`)}`;
                    break;
                case 'Copy Link':
                    navigator.clipboard.writeText(url);
                    this.innerHTML = '<i class="fas fa-check"></i>';
                    setTimeout(() => {
                        this.innerHTML = '<i class="fas fa-link"></i>';
                    }, 2000);
                    return;
            }
            
            if (shareUrl) {
                window.open(shareUrl, '_blank', 'width=600,height=400');
            }
        });
    });
    
    // Reading Progress Indicator (for individual blog pages)
    const readingProgress = document.querySelector('.reading-progress');
    if (readingProgress) {
        window.addEventListener('scroll', () => {
            const windowHeight = window.innerHeight;
            const documentHeight = document.documentElement.scrollHeight;
            const scrollTop = window.pageYOffset;
            const scrollPercentage = (scrollTop / (documentHeight - windowHeight)) * 100;
            
            readingProgress.style.width = scrollPercentage + '%';
        });
    }
    
    console.log('Enhanced blog page loaded successfully!');
});
