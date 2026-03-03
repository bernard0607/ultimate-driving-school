document.addEventListener('DOMContentLoaded', function() {
    // Animate stats counter when scrolled into view
    const animateOnScroll = function() {
        const statItems = document.querySelectorAll('.stat-item');
        
        statItems.forEach(item => {
            const statNumber = item.querySelector('.stat-number');
            const target = parseInt(item.getAttribute('data-count'));
            const suffix = item.hasAttribute('data-suffix') ? item.getAttribute('data-suffix') : '';
            const duration = 2000; // Animation duration in milliseconds
            const stepTime = 50; // Time between each step
            
            const isInViewport = function(element) {
                const rect = element.getBoundingClientRect();
                return (
                    rect.top >= 0 &&
                    rect.left >= 0 &&
                    rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
                    rect.right <= (window.innerWidth || document.documentElement.clientWidth)
                );
            };
            
            const animateValue = function(start, end, duration, element) {
                let startTimestamp = null;
                const step = (timestamp) => {
                    if (!startTimestamp) startTimestamp = timestamp;
                    const progress = Math.min((timestamp - startTimestamp) / duration, 1);
                    const current = Math.floor(progress * (end - start) + start);
                    element.textContent = current + suffix;
                    if (progress < 1) {
                        window.requestAnimationFrame(step);
                    }
                };
                window.requestAnimationFrame(step);
            };
            
            const handleScroll = function() {
                if (isInViewport(item) && !item.classList.contains('counted')) {
                    item.classList.add('counted');
                    animateValue(0, target, duration, statNumber);
                    // Remove the scroll event listener after animation starts
                    window.removeEventListener('scroll', handleScroll);
                }
            };
            
            // Initial check in case the element is already in view
            handleScroll();
            
            // Add scroll event listener
            window.addEventListener('scroll', handleScroll);
        });
    };
    
    // Play video on click
    const initVideoPlayer = function() {
        const playButton = document.querySelector('.play-button');
        if (playButton) {
            playButton.addEventListener('click', function() {
                const videoWrapper = this.closest('.video-wrapper');
                const videoPlaceholder = videoWrapper.querySelector('.video-placeholder');
                const videoOverlay = videoWrapper.querySelector('.video-overlay');
                
                // Replace the image with an iframe
                const videoId = 'dQw4w9WgXcQ'; // Example YouTube video ID
                const iframe = document.createElement('iframe');
                iframe.setAttribute('src', `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`);
                iframe.setAttribute('frameborder', '0');
                iframe.setAttribute('allow', 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture');
                iframe.setAttribute('allowfullscreen', '');
                iframe.style.position = 'absolute';
                iframe.style.top = '0';
                iframe.style.left = '0';
                iframe.style.width = '100%';
                iframe.style.height = '100%';
                
                // Clear the placeholder content and add iframe
                videoPlaceholder.innerHTML = '';
                videoPlaceholder.appendChild(iframe);
                
                // Hide the play button and overlay
                this.style.display = 'none';
                if (videoOverlay) videoOverlay.style.display = 'none';
            });
        }
    };
    
    // Smooth scrolling for anchor links
    const initSmoothScrolling = function() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                e.preventDefault();
                
                const targetId = this.getAttribute('href');
                if (targetId === '#') return;
                
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    const headerOffset = 80; // Adjust for fixed header height
                    const elementPosition = targetElement.offsetTop - headerOffset;
                    
                    window.scrollTo({
                        top: elementPosition,
                        behavior: 'smooth'
                    });
                }
            });
        });
    };
    
    // Add hover effects to feature cards
    const initHoverEffects = function() {
        const featureCards = document.querySelectorAll('.feature-card');
        
        featureCards.forEach(card => {
            card.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-10px) scale(1.02)';
            });
            
            card.addEventListener('mouseleave', function() {
                this.style.transform = 'translateY(0) scale(1)';
            });
        });
    };
    
    // Mobile menu functionality
    const initMobileMenu = function() {
        const mobileToggle = document.querySelector('.mobile-menu-toggle');
        const mainNav = document.querySelector('.main-nav');
        const mobileOverlay = document.querySelector('.mobile-nav-overlay');
        
        if (mobileToggle && mainNav && mobileOverlay) {
            mobileToggle.addEventListener('click', function() {
                const isOpen = mainNav.classList.contains('active');
                
                if (isOpen) {
                    mainNav.classList.remove('active');
                    mobileOverlay.classList.remove('active');
                    this.setAttribute('aria-expanded', 'false');
                } else {
                    mainNav.classList.add('active');
                    mobileOverlay.classList.add('active');
                    this.setAttribute('aria-expanded', 'true');
                }
            });
            
            // Close menu when clicking overlay
            mobileOverlay.addEventListener('click', function() {
                mainNav.classList.remove('active');
                mobileOverlay.classList.remove('active');
                mobileToggle.setAttribute('aria-expanded', 'false');
            });
        }
    };
    
    // Clock functionality
    const updateClock = function() {
        const now = new Date();
        let hours = now.getHours();
        const minutes = String(now.getMinutes()).padStart(2, '0');
        const seconds = String(now.getSeconds()).padStart(2, '0');
        const ampm = hours >= 12 ? 'PM' : 'AM';
        
        hours = hours % 12;
        hours = hours ? hours : 12; // Convert 0 to 12 for 12 AM
        
        const timeString = `${hours}:${minutes}:${seconds}`;
        const timeElement = document.getElementById('current-time');
        const ampmElement = document.getElementById('am-pm');
        
        if (timeElement) {
            timeElement.textContent = timeString;
            timeElement.style.color = '#ffffff'; // Ensure white color for footer
        }
        if (ampmElement) {
            ampmElement.textContent = ampm;
            ampmElement.style.color = '#e0e0e0'; // Light color for footer
        }
    };
    
    // Form validation for contact forms
    const initFormValidation = function() {
        const forms = document.querySelectorAll('form');
        
        forms.forEach(form => {
            form.addEventListener('submit', function(e) {
                let isValid = true;
                const requiredFields = form.querySelectorAll('[required]');
                
                requiredFields.forEach(field => {
                    if (!field.value.trim()) {
                        isValid = false;
                        field.classList.add('error');
                    } else {
                        field.classList.remove('error');
                    }
                });
                
                if (!isValid) {
                    e.preventDefault();
                    // Show error message
                    const errorDiv = document.createElement('div');
                    errorDiv.className = 'form-error';
                    errorDiv.textContent = 'Please fill in all required fields.';
                    errorDiv.style.cssText = `
                        background: #f44336;
                        color: white;
                        padding: 10px;
                        border-radius: 5px;
                        margin-bottom: 15px;
                        text-align: center;
                    `;
                    
                    form.insertBefore(errorDiv, form.firstChild);
                    
                    // Remove error message after 5 seconds
                    setTimeout(() => {
                        if (errorDiv.parentNode) {
                            errorDiv.parentNode.removeChild(errorDiv);
                        }
                    }, 5000);
                }
            });
        });
    };
    
    // Initialize animations for new sections
    const initNewSectionsAnimations = function() {
        // Animate founder message on scroll
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };
        
        const sectionObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, observerOptions);
        
        // Observe founder message section
        const founderMessage = document.querySelector('.founder-message');
        if (founderMessage) {
            founderMessage.style.opacity = '0';
            founderMessage.style.transform = 'translateY(30px)';
            founderMessage.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
            sectionObserver.observe(founderMessage);
        }
        
        // Observe mission/vision cards
        const mvCards = document.querySelectorAll('.mv-card');
        mvCards.forEach((card, index) => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(30px)';
            card.style.transition = `opacity 0.8s ease ${index * 0.2}s, transform 0.8s ease ${index * 0.2}s`;
            sectionObserver.observe(card);
        });
        
        // Observe value items with staggered animation
        const valueItems = document.querySelectorAll('.value-item');
        valueItems.forEach((item, index) => {
            item.style.opacity = '0';
            item.style.transform = 'translateY(30px)';
            item.style.transition = `opacity 0.8s ease ${index * 0.1}s, transform 0.8s ease ${index * 0.1}s`;
            sectionObserver.observe(item);
        });
    };
    
    // Add parallax effect to hero image (DISABLED - keeping image static)
    const initParallaxEffect = function() {
        // Parallax effect disabled - keeping hero image static
        console.log('Hero image parallax effect disabled');
    };
    
    // Add hover effects for founder credentials
    const initFounderCredentials = function() {
        const credentialItems = document.querySelectorAll('.credential-item');
        credentialItems.forEach(item => {
            item.addEventListener('mouseenter', function() {
                this.style.transform = 'translateX(5px)';
                this.style.color = '#0a4a0a';
            });
            
            item.addEventListener('mouseleave', function() {
                this.style.transform = 'translateX(0)';
                this.style.color = '#6b7280';
            });
        });
    };
    
    // Add typing effect for hero title
    const initTypingEffect = function() {
        const heroTitle = document.querySelector('.hero-title');
        if (heroTitle) {
            const text = heroTitle.textContent;
            heroTitle.textContent = '';
            let index = 0;
            
            const typeWriter = () => {
                if (index < text.length) {
                    heroTitle.textContent += text.charAt(index);
                    index++;
                    setTimeout(typeWriter, 50);
                }
            };
            
            setTimeout(typeWriter, 500);
        }
    };
    
    // Initialize all functionality
    const initAll = function() {
        animateOnScroll();
        initVideoPlayer();
        initSmoothScrolling();
        initHoverEffects();
        initMobileMenu();
        initFormValidation();
        initNewSectionsAnimations();
        initParallaxEffect();
        initFounderCredentials();
        initTypingEffect();
        
        // Start clock
        updateClock();
        setInterval(updateClock, 1000);
    };
    
    // Initialize everything when DOM is ready
    initAll();
});
