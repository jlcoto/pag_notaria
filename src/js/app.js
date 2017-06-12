$(window).scroll(function() {
  var scrolledY = $(window).scrollTop();
  $('.central-pic').css('background-position', 'left ' + ((scrolledY)) + 'px');
});

