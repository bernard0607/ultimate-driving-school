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
    const playButton = document.querySelector('.play-button');
    if (playButton) {
        playButton.addEventListener('click', function() {
            const videoWrapper = this.closest('.video-wrapper');
            const videoPlaceholder = videoWrapper.querySelector('.video-placeholder');
            const videoOverlay = videoWrapper.querySelector('.video-overlay');
            
            // Replace the image with an iframe
            const videoId = '0bLffJ0ea9g';
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
            
            // Clear the placeholder content and add the iframe
            videoPlaceholder.innerHTML = '';
            videoPlaceholder.appendChild(iframe);
            
            // Hide the play button and overlay
            this.style.display = 'none';
            if (videoOverlay) videoOverlay.style.display = 'none';
        });
    }
    
    // Initialize animations
    animateOnScroll();
    
    // Add smooth scrolling for anchor links
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
});
