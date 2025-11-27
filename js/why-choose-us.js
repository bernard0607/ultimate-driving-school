document.addEventListener('DOMContentLoaded', function() {
    // Tab functionality
    const tabs = document.querySelectorAll('.tab');
    const tabPanes = document.querySelectorAll('.tab-pane');
    
    // Initialize first tab as active if none is active
    if (tabs.length > 0 && !document.querySelector('.tab.active')) {
        tabs[0].classList.add('active');
        const firstTabId = tabs[0].getAttribute('data-tab');
        if (firstTabId) {
            document.getElementById(firstTabId)?.classList.add('active');
        }
    }
    
    // Tab click handler
    tabs.forEach(tab => {
        tab.addEventListener('click', function(e) {
            e.preventDefault();
            const tabId = this.getAttribute('data-tab');
            
            // Remove active class from all tabs and panes
            tabs.forEach(t => t.classList.remove('active'));
            tabPanes.forEach(p => p.classList.remove('active'));
            
            // Add active class to clicked tab and corresponding pane
            this.classList.add('active');
            if (tabId) {
                const targetPane = document.getElementById(tabId);
                if (targetPane) {
                    targetPane.classList.add('active');
                }
            }
        });
    });
    
    // Animate numbers in stats
    const animateNumbers = () => {
        const numberElements = document.querySelectorAll('.stat-number, .badge-number');
        
        const animate = (element, target, duration = 2000) => {
            const start = 0;
            const increment = target / (duration / 16); // 60fps
            let current = start;
            
            const updateNumber = () => {
                current += increment;
                if (current < target) {
                    // Format number with commas if it's a large number
                    const displayValue = Math.ceil(current).toLocaleString();
                    element.textContent = displayValue;
                    requestAnimationFrame(updateNumber);
                } else {
                    element.textContent = target.toLocaleString();
                }
            };
            
            updateNumber();
        };
        
        const observer = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const numberElement = entry.target;
                    let targetNumber;
                    
                    // Handle different number formats (with % or +)
                    if (numberElement.textContent.includes('%')) {
                        targetNumber = parseInt(numberElement.textContent);
                    } else if (numberElement.textContent.includes('+')) {
                        targetNumber = parseInt(numberElement.textContent.replace('+', ''));
                    } else {
                        targetNumber = parseInt(numberElement.textContent.replace(/,/g, ''));
                    }
                    
                    // Only animate if we have a valid number
                    if (!isNaN(targetNumber)) {
                        // Set initial value to 0
                        if (numberElement.textContent.includes('%')) {
                            numberElement.textContent = '0%';
                        } else if (numberElement.textContent.includes('+')) {
                            numberElement.textContent = '0+';
                        } else {
                            numberElement.textContent = '0';
                        }
                        
                        // Start animation
                        animate(numberElement, targetNumber);
                    }
                    
                    // Stop observing once animated
                    observer.unobserve(numberElement);
                }
            });
        }, { threshold: 0.5 }); // Trigger when 50% of the element is visible
        
        // Observe all number elements
        numberElements.forEach(element => {
            observer.observe(element);
        });
    };
    
    // Initialize animations when the page loads
    if (document.querySelector('.stat-number, .badge-number')) {
        animateNumbers();
    }
    
    // Add hover effect for feature cards
    const featureCards = document.querySelectorAll('.feature-card');
    featureCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px)';
            this.style.boxShadow = '0 20px 40px rgba(0,0,0,0.1)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = '0 10px 30px rgba(0,0,0,0.05)';
        });
    });
    
    // Play button functionality
    const playButton = document.querySelector('.play-button');
    if (playButton) {
        playButton.addEventListener('click', function() {
            // You can add video modal functionality here
            alert('Video playback would start here. In a real implementation, this would open a modal with a video player.');
        });
    }
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
