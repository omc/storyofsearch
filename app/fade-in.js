function showImages(el) {
var windowHeight = jQuery( window ).height();
$(el).each(function(){
    var thisPos = $(this).offset().top;

    var topOfWindow = $(window).scrollTop();
    if (topOfWindow + windowHeight - 200 > thisPos ) {
      console.log("topOfWindow calc")
      $(this).addClass("fadeIn");
    }
});
}

// if the image in the window of browser when the page is loaded, show that image
$(document).ready(function(){
  console.log("show images")
  showImages('.illustration');
});

// if the image in the window of browser when scrolling the page, show that image
$(window).scroll(function() {
  console.log("show images on scroll")
  showImages('.illustration');
});
