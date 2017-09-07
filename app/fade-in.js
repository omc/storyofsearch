// Cache reference to window and animation items

var $animation_els = $('.illustration');
var $window = $(window);
$window.on('scroll resize', check_if_in_view);

$window.trigger('scroll');

function check_if_in_view() {
  // get current window height
  var window_height = $window.height();
  // get position of the window relative to the full DOM
  var window_top_position = $window.scrollTop();
  // basically, how tall is it?
  var window_bottom_position = (window_top_position + window_height);
  $.each($animation_els, function() {
    var $el = $(this);
    // dimensional height of the illustration, plus padding and border
    var el_height = $el.outerHeight();
    // where the element is relative to DOM
    var el_top_position = $el.offset().top;
    // where the end of the illustration is relative to the DOM
    var el_bottom_position = (el_top_position + el_height);

    // check to see if this current container is within viewport
    if ((el_bottom_position >= window_top_position) && (el_top_position <= window_bottom_position)) {
      // delay fade in for a few ms
      setTimeout(function(){ $el.addClass('in-view'); }, 200);
    } else {
      $el.removeClass('in-view');
    }
  })
}


// function showImages(el) {
// var windowHeight = jQuery( window ).height();
// $(el).each(function(){
//     var thisPos = $(this).offset().top;
//
//     var topOfWindow = $(window).scrollTop();
//     if (topOfWindow + windowHeight - 200 > thisPos ) {
//       console.log("topOfWindow calc")
//       $(this).addClass("fadeIn");
//     }
// });
// }
//
// // if the image in the window of browser when the page is loaded, show that image
// $(document).ready(function(){
//   console.log("show images")
//   showImages('.illustration');
// });
//
// // if the image in the window of browser when scrolling the page, show that image
// $(window).scroll(function() {
//   console.log("show images on scroll")
//   showImages('.illustration');
// });
