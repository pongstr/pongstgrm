/*! ========================================================================== 
 * Pongstagr.am v3.0.0 jQuery Plugin | http://pongstr.github.io/pongstagr.am/ 
 * ========================================================================== 
 * Copyright (c) 2013 Pongstr Ordillo. Licensed under MIT License. 
 * Requires: Bootstrap 3 CSS, jQuery 1.10.x and Bootstrap 3 JS 
 * ========================================================================= */

$(window).load(function () { "use strict"; 

  window.prettyPrint && prettyPrint()

  var headerHeight = $('header').outerHeight();

  $(window).scroll( function (){
    ($(window).scrollTop() > headerHeight) ?
      $('[role=navigation]').addClass('navbar-fixed-top') :
      $('[role=navigation]').removeClass('navbar-fixed-top')
  })


  function Pongstr (option) {
    var userid   = '679256982'
    var usrtoken = '679256982.401c5ac.0a183542db5f4ae1b51caae21acadc1e'

    $(option.target).pongstgrm({
        accessId:     userid
      , accessToken:  usrtoken
      , show:         option.show
      , count:        option.count
    })
  }

  Pongstr({ target: '#profile', show: 'profile' })
  Pongstr({ target: '#recent', show: 'recent', count: 4 })
  Pongstr({ target: '#likes' , show: 'liked' , count: 4 })
  Pongstr({ target: '#feed'  , show: 'feed'  , count: 4 })
  Pongstr({ target: '#tags'  , show: 'nofilter', count: 4 })


  $('[data-hash=slide]').each(function () {
    $(this).on('click', function (e) {
      e.preventDefault()

      var  target = $(this).attr('href')
        , $target = $(target)
        ,  offset = ($(this).data('hash-offset') === undefined) ? 100 : $(this).data('hash-offset') 

      $('html, body').stop().animate({
        'scrollTop': $target.offset().top - offset
        }, { duration: 1250, easing: 'easeInOutExpo'}, function() {
          window.location.hash = target
        return false
      })
    })
  })

});