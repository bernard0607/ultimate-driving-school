/*

Ultimate Driving School

Professional Driving School in Kenya

*/

/* Google Maps
------------------------------------------------*/
var map = '';
var center;

function initialize() {
  var mapOptions = {
    zoom: 14,
    center: new google.maps.LatLng(37.769725, -122.462154),
    scrollwheel: false,
    draggable:false
  };

  map = new google.maps.Map(document.getElementById('GoogleMap'),  mapOptions);

  google.maps.event.addDomListener(map, 'idle', function() {
    calculateCenter();
  });

  google.maps.event.addDomListener(window, 'resize', function() {
    map.setCenter(center);
  });
}

function calculateCenter() {
  center = map.getCenter();
}

function loadGoogleMap(){
  var script = document.createElement('script');
  script.type = 'text/javascript';
  script.src = 'https://maps.googleapis.com/maps/api/js?v=3.exp&sensor=false&' + 'callback=initialize';
  document.body.appendChild(script);
}

/* onScroll function
----------------------------------------*/
function onScroll(event){
  var scrollPosition = $(document).scrollTop();
  $('nav li a').each(function () {
    var currentLink = $(this);
    var refElement = $(currentLink.attr("href"));
    if (refElement.position().top <= scrollPosition && refElement.position().top + refElement.height() > scrollPosition) {
      $('nav ul li').removeClass("active");
      currentLink.parent().addClass("active");
    }
    else{
      currentLink.parent().removeClass("active");
    }
  });
}

/* Animate stats counter when element is in viewport
--------------------------------------------*/
function animateStats() {
    $('.stat-number').each(function() {
        var $this = $(this);
        var countTo = parseInt($this.attr('data-count')) || parseInt($this.text().replace(/[^0-9]/g, ''));
        var suffix = $this.attr('data-suffix') || '';
        
        if ($this.hasClass('counted')) return;
        
        $({ countNum: 0 }).animate(
            { countNum: countTo },
            {
                duration: 2000,
                easing: 'swing',
                step: function() {
                    // For percentages, round to 0 decimal places
                    var displayNum = (suffix === '%') ? 
                        Math.floor(this.countNum) : 
                        Math.floor(this.countNum).toLocaleString();
                    $this.text(displayNum + suffix);
                },
                complete: function() {
                    $this.text(countTo.toLocaleString() + suffix);
                    $this.addClass('counted');
                }
            }
        );
    });
}

/* Check if element is in viewport
--------------------------------------------*/
function isInViewport(element) {
    var rect = element.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

/* Handle scroll events for stats animation
--------------------------------------------*/
function handleScrollForStats() {
    $('.stat-number').each(function() {
        if (isInViewport(this) && !$(this).hasClass('counted')) {
            animateStats();
        }
    });
}

/* HTML Document is loaded and DOM is ready.
--------------------------------------------*/
$(document).ready(function(){
    // Initialize stats animation
    handleScrollForStats();
    
    // Add scroll event listener for stats animation
    $(window).scroll(function() {
        handleScrollForStats();
    });
  //slider
  var sudoSlider = $("#slider").sudoSlider({
   effect: "fade",
   pause: 3000,
   auto:true,
   continuous:true
 });

  //mobilemenu
  $('.mobile').click(function(){
    var $self = $(this);
    $('.menumobile').slideToggle( function(){
      $self.toggleClass('closed');
    });
  });

  //navigation script
  $('.Navigation ul li a').click(function(){
    $('.menumobile').removeAttr("style");
    $('#mobile_sec .mobile').removeClass("closed");
  });

  $('a.slicknav_btn').click(function(){
    $(".mobilemenu ul").css({"display":"block"});
  });

  //tab
  $(".tabLink").each(function(){
    $(this).click(function(){
      tabeId = $(this).attr('id');
      $(".tabLink").removeClass("activeLink");
      $(this).addClass("activeLink");
      $(".tabcontent").addClass("hide");
      $("#"+tabeId+"-1").removeClass("hide");
      return false;
    });
  });
  $('a[href*=#]:not([href=#])').click(function() {
    if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'')
      || location.hostname == this.hostname)
    {
      var target = $(this.hash),
      headerHeight = $(".primary-header").height() + 5; // Get fixed header height
      target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
      if (target.length)
      {
        $('html,body').animate({
          scrollTop: target.offset().top + 2
        }, 600);
        return false;
      }
    }
  });	

  //Header Small
  window.addEventListener('scroll', function(e){
    var distanceY = window.pageYOffset || document.documentElement.scrollTop,
    shrinkOn = 50;
    
    if (distanceY > shrinkOn) {
      $('header').addClass("smaller");
    } else {
      $('header').toggleClass("smaller");
    }
  });
  
  loadGoogleMap();

}); 

$(document).on("scroll", onScroll);

// Complete page is fully loaded, including all frames, objects and images
$(window).load(function() {
  // Remove preloader
  // https://ihatetomatoes.net/create-custom-preloading-screen/
  $('body').addClass('loaded');
});

