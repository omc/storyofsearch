var $ = require('jquery');
// Cache reference to window and animation items

var $animation_els = $('.fade-animation');
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
      setTimeout(function(){ $el.addClass('fade-animation-in-view'); }, 100);
    } else {
      $el.removeClass('fade-animation-in-view');
    }
  })
};
