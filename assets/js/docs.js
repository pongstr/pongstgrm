/*! ========================================================================== 
 * Pongstagr.am v3.0.0 jQuery Plugin | http://pongstr.github.io/pongstagr.am/ 
 * ========================================================================== 
 * Copyright (c) 2013 Pongstr Ordillo. Licensed under MIT License. 
 * Requires: Bootstrap 3 CSS, jQuery 1.10.x and Bootstrap 3 JS 
 * ========================================================================= */

$(window).load(function () { "use strict"; 

  window.prettyPrint && prettyPrint()

  var elementHeight = $('body').outerHeight()

  $(window).scroll(function () {
    $(this).scrollTop() > elementHeight + 20 ?
      $('[role=navigation]').addClass('navbar-fixed-top') :
      $('[role=navigation]').removeClass('navbar-fixed-top')
  })

  function Pongstr (option) {
  /*! Although I've created a application test account on instagram,
   * I'd like to ask nicely that you use your own access id and token
   * and use your own media/feed from you or the the people you follow.
   *
   * I'd really appreciate that! Thank you!
   * 
   */
    var userid   = '679256982'
    var usrtoken = '679256982.401c5ac.0a183542db5f4ae1b51caae21acadc1e'

    $(option.target).pongstgrm({
        accessId:         userid
      , accessToken:      usrtoken
      , show:             option.show
      , count:            option.count
      , profile_bg_img:   'http://pongstr.github.io/pongstagr.am/assets/img/img.jpg'
      , profile_bg_color: '#4F405F'
    })

  }

  Pongstr({ target: '#profile', show: 'profile' })
  Pongstr({ target: '#recent',  show: 'recent',   count: 4 })
  Pongstr({ target: '#likes' ,  show: 'liked' ,   count: 4 })
  Pongstr({ target: '#feed'  ,  show: 'feed'  ,   count: 4 })
  Pongstr({ target: '#tags'  ,  show: 'nofilter', count: 4 })


  $('[data-hash=slide]').each(function () {
    $(this).on('click', function (e) {
      e.preventDefault()

      var  target = $(this).attr('href')
        , $target = $(target)
        ,  offset = ($(this).data('hash-offset') === undefined) ? 100 : $(this).data('hash-offset') 

      $target.length !== 0 &&
        $('html, body').stop().animate({
          'scrollTop': $target.offset().top - offset
          }, 500, function() {
            window.location.hash = target
          return false
        })
    })
  })

});