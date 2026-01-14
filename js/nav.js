/**
 * Modern Navigation for Ultimate Defensive Driving School
 * Handles mobile menu toggle, smooth scrolling, and active link highlighting
 */

document.addEventListener('DOMContentLoaded', function() {
    // DOM Elements
    const header = document.querySelector('.main-header');
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const mobileNavOverlay = document.querySelector('.mobile-nav-overlay');
    const navLinks = document.querySelectorAll('.nav-link');
    const mainNav = document.querySelector('.main-nav');
    const skipLink = document.querySelector('.skip-link');
    const mainContent = document.querySelector('main') || document.querySelector('.LayoutFrame');
    
    // Track mobile menu state
    let isMenuOpen = false;
    
    // Toggle mobile menu
    function toggleMobileMenu() {
        isMenuOpen = !isMenuOpen;
        
        // Toggle menu classes
        mainNav.classList.toggle('active', isMenuOpen);
        mobileNavOverlay.classList.toggle('active', isMenuOpen);
        mobileMenuToggle.classList.toggle('active', isMenuOpen);
        document.body.style.overflow = isMenuOpen ? 'hidden' : '';
        
        // Update aria-expanded attribute
        mobileMenuToggle.setAttribute('aria-expanded', isMenuOpen);
        
        // Focus management
        if (isMenuOpen) {
            // Focus first link when opening menu
            const firstNavLink = mainNav.querySelector('.nav-link');
            if (firstNavLink) firstNavLink.focus();
        } else {
            // Return focus to menu button when closing
            mobileMenuToggle.focus();
        }
    }
    
    // Close mobile menu when clicking outside
    function handleClickOutside(event) {
        if (isMenuOpen && !mainNav.contains(event.target) && !mobileMenuToggle.contains(event.target)) {
            toggleMobileMenu();
        }
    }
    
    // Handle keyboard navigation
    function handleKeyDown(event) {
        // Close menu on Escape key
        if (event.key === 'Escape' && isMenuOpen) {
            toggleMobileMenu();
        }
        
        // Trap focus inside mobile menu when open
        if (isMenuOpen) {
            const focusableElements = 'a[href], button:not([disabled]), input, select, textarea, [tabindex]:not([tabindex="-1"])';
            const focusableContent = mainNav.querySelectorAll(focusableElements);
            const firstFocusableElement = focusableContent[0];
            const lastFocusableElement = focusableContent[focusableContent.length - 1];
            
            if (event.key === 'Tab') {
                if (event.shiftKey) {
                    // Shift + Tab
                    if (document.activeElement === firstFocusableElement) {
                        lastFocusableElement.focus();
                        event.preventDefault();
                    }
                } else {
                    // Tab
                    if (document.activeElement === lastFocusableElement) {
                        firstFocusableElement.focus();
                        event.preventDefault();
                    }
                }
            }
        }
    }
    
    // Smooth scroll to target section
    function smoothScroll(target) {
        const targetElement = document.querySelector(target);
        if (!targetElement) return;
        
        const headerHeight = header.offsetHeight;
        const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - (headerHeight + 10);
        
        window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
        });
        
        // Close mobile menu if open
        if (isMenuOpen) {
            toggleMobileMenu();
        }
    }
    
    // Update active link based on scroll position
    function updateActiveLink() {
        const scrollPosition = window.scrollY + 200; // Add offset for better UX
        
        document.querySelectorAll('section[id]').forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                // Remove active class from all links
                navLinks.forEach(link => {
                    link.classList.remove('active');
                });
                
                // Add active class to corresponding link
                const activeLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);
                if (activeLink) {
                    activeLink.classList.add('active');
                }
            }
        });
    }
    
    // Handle header scroll effects
    function handleScroll() {
        // Add/remove scrolled class to header
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
        
        // Update active link
        updateActiveLink();
    }
    
    // Event Listeners
    mobileMenuToggle.addEventListener('click', toggleMobileMenu);
    mobileNavOverlay.addEventListener('click', toggleMobileMenu);
    document.addEventListener('click', handleClickOutside);
    document.addEventListener('keydown', handleKeyDown);
    
    // Handle nav link clicks
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const target = this.getAttribute('href');
            
            // Only handle anchor links
            if (target.startsWith('#')) {
                e.preventDefault();
                smoothScroll(target);
                
                // Update URL without page jump
                if (history.pushState) {
                    history.pushState(null, null, target);
                } else {
                    location.hash = target;
                }
            }
        });
    });
    
    // Handle skip link
    if (skipLink && mainContent) {
        skipLink.addEventListener('click', (e) => {
            e.preventDefault();
            mainContent.setAttribute('tabindex', '-1');
            mainContent.focus();
            // Remove tabindex after focus is set
            setTimeout(() => mainContent.removeAttribute('tabindex'), 1000);
        });
    }
    
    // Handle scroll events with throttling
    let isScrolling;
    window.addEventListener('scroll', function() {
        // Clear our timeout throughout the scroll
        window.clearTimeout(isScrolling);
        
        // Set a timeout to run after scrolling ends
        isScrolling = setTimeout(function() {
            handleScroll();
        }, 100);
    }, { passive: true });
    
    // Initial setup
    handleScroll();
    updateActiveLink();
    
    // Handle initial page load with hash in URL
    if (window.location.hash) {
        const targetElement = document.querySelector(window.location.hash);
        if (targetElement) {
            setTimeout(() => {
                const headerHeight = header.offsetHeight;
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
            // Reset mobile menu on desktop
            if (window.innerWidth > 1024 && isMenuOpen) {
                toggleMobileMenu();
            }
        }, 250);
    });
});
