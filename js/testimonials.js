// Wait for the document to be fully loaded
jQuery(document).ready(function($) {
    console.log('Document ready, initializing testimonial slider...');
    
    // Check if jQuery is loaded
    if (typeof jQuery == 'undefined') {
        console.error('jQuery is not loaded');
        return;
    }
    
    // Check if Slick is loaded
    if (typeof $.fn.slick === 'undefined') {
        console.error('Slick Carousel is not loaded');
        return;
    }
    
    // Initialize the slider
    var $slider = $('.testimonials-slider');
    
    if ($slider.length) {
        console.log('Found testimonial slider, initializing...');
        
        // Initialize Slick Slider with enhanced autoplay settings
        $slider.slick({
            dots: true,
            arrows: true,
            infinite: true,
            speed: 800,  // Slightly slower transition for better visibility
            slidesToShow: 1,
            slidesToScroll: 1,
            autoplay: true,
            autoplaySpeed: 6000,  // 6 seconds between slides
            pauseOnHover: true,
            pauseOnFocus: false,  // Keep autoplaying when window is focused
            waitForAnimate: true, // Wait for animation to complete before next slide
            prevArrow: $('.testimonial-prev'),
            nextArrow: $('.testimonial-next'),
            appendDots: $('.testimonials-dots'),
            dotsClass: 'slick-dots',
            fade: true,
            cssEase: 'cubic-bezier(0.4, 0, 0.2, 1)', // Smoother easing
            responsive: [
                {
                    breakpoint: 992,
                    settings: {
                        arrows: true,
                        dots: true,
                        autoplaySpeed: 6000
                    }
                },
                {
                    breakpoint: 768,
                    settings: {
                        arrows: false,
                        dots: true,
                        autoplaySpeed: 6000
                    }
                }
            ]
        });
        
        console.log('Slick slider initialized successfully');
        
        // Add active class to current slide
        $slider.on('init', function() {
            console.log('Slider initialized');
            $('.slick-current').addClass('slick-active');
        });
        
        // Handle slide changes
        $slider.on('beforeChange', function(event, slick, currentSlide, nextSlide) {
            $('.testimonial-slide').removeClass('slick-active');
        });
        
        $slider.on('afterChange', function(event, slick, currentSlide) {
            $('.slick-current').addClass('slick-active');
        });
        
        // Pause autoplay when hovering over the slider
        $slider.hover(
            function() {
                $(this).slick('slickPause');
            },
            function() {
                $(this).slick('slickPlay');
            }
        );
        
    } else {
        console.error('Testimonial slider element not found');
    }
});
