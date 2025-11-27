document.addEventListener('DOMContentLoaded', function() {
    // DOM Elements
    const header = document.querySelector('.site-header');
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const primaryNav = document.getElementById('primary-nav');
    const mobileMenuOverlay = document.querySelector('.mobile-menu-overlay');
    const navLinks = document.querySelectorAll('.nav-link');
    const scrollLinks = document.querySelectorAll('a[href^="#"]');
    
    // Toggle mobile menu
    function toggleMobileMenu() {
        const isExpanded = mobileMenuToggle.getAttribute('aria-expanded') === 'true';
        mobileMenuToggle.setAttribute('aria-expanded', !isExpanded);
        primaryNav.classList.toggle('active');
        mobileMenuOverlay.classList.toggle('active');
        document.body.style.overflow = isExpanded ? 'auto' : 'hidden';
        mobileMenuToggle.classList.toggle('active');
    }

    // Close mobile menu when clicking on a link
    function closeMobileMenu() {
        mobileMenuToggle.setAttribute('aria-expanded', 'false');
        primaryNav.classList.remove('active');
        mobileMenuOverlay.classList.remove('active');
        document.body.style.overflow = 'auto';
        mobileMenuToggle.classList.remove('active');
    }

    // Update active nav link based on scroll position
    function updateActiveNavLink() {
        const scrollPosition = window.scrollY + headerHeight;
        
        document.querySelectorAll('section').forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }

    // Smooth scrolling for anchor links
    function smoothScroll(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (!targetElement) return;
        
        const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;
        
        window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
        });
        
        // Close mobile menu if open
        if (primaryNav.classList.contains('active')) {
            closeMobileMenu();
        }
    }

    // Event Listeners
    mobileMenuToggle.addEventListener('click', toggleMobileMenu);
    mobileMenuOverlay.addEventListener('click', closeMobileMenu);
    
    // Close mobile menu when clicking on a nav link
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // Only close if it's a mobile menu
            if (window.innerWidth <= 992) {
                closeMobileMenu();
            }
            
            // Update active state
            navLinks.forEach(l => l.classList.remove('active'));
            this.classList.add('active');
            
            // Smooth scroll
            const targetId = this.getAttribute('href');
            if (targetId.startsWith('#')) {
                e.preventDefault();
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                    
                    // Update URL without page jump
                    if (history.pushState) {
                        history.pushState(null, null, targetId);
                    } else {
                        location.hash = targetId;
                    }
                }
            }
        });
    });
    
    // Handle scroll events with throttling
    let isScrolling;
    window.addEventListener('scroll', function() {
        // Clear our timeout throughout the scroll
        window.clearTimeout(isScrolling);
        
        // Set a timeout to run after scrolling ends
        isScrolling = setTimeout(function() {
            handleScroll();
            updateActiveNavLink();
        }, 66); // 60fps = 16.67ms per frame, ~4 frames = 66ms
    }, { passive: true });
    
    // Initial setup
    handleScroll();
    updateActiveNavLink();
    
    // Handle initial page load with hash in URL
    if (window.location.hash) {
        const targetElement = document.querySelector(window.location.hash);
        if (targetElement) {
            setTimeout(() => {
                window.scrollTo({
                    top: targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight,
                    behavior: 'smooth'
                });
            }, 100);
        }
    }
    
    // Handle browser resize
    let resizeTimer;
    window.addEventListener('resize', function() {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(function() {
            if (window.innerWidth > 992) {
                // Reset mobile menu state on desktop
                document.body.style.overflow = 'auto';
                mobileMenuOverlay.classList.remove('active');
                primaryNav.classList.remove('active');
                mobileMenuToggle.setAttribute('aria-expanded', 'false');
                mobileMenuToggle.classList.remove('active');
            }
        }, 250);
    });
});
