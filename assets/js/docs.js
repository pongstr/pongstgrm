/* ==========================================================================
 * jQuery Pongstagr.am Plugin v3.0.0
 * ==========================================================================
 * Copyright (c) 2013 Pongstr Ordillo. MIT License
 * Requires: jQuery v1.10.2 and Bootstrap 3.0.0
 * ========================================================================= */

$(window).load(function () { "use strict"; 

  window.prettyPrint && prettyPrint()

  var headerHeight = $('header').outerHeight();

  $(window).scroll( function (){
    ($(window).scrollTop() > headerHeight) ?
      $('body, .page-heading').addClass('sticky') :
      $('body, .page-heading').removeClass('sticky')
  })


  $('[data-hash=slide]').each(function () {
    $(this).on('click', function (e) {
      e.preventDefault()

      var  target = $(this).attr('href')
        , $target = $(target)
        ,  offset = ($(this).data('hash-offset') == undefined) ? 160 : $(this).data('hash-offset') 

      $('html, body').stop().animate({
        'scrollTop': $target.offset().top - offset
        }, { duration: 1250, easing: 'easeInOutExpo'}, function() {
          window.location.hash = target
        return false
      })
    })
  })


  function Pongstr (option) {
    var userid   = '39666111'
    var usrtoken = '39666111.1fb234f.c3901000b4944a549fd5fd2310c63780'

    $(option.target).pongstgrm({
        accessId:     userid
      , accessToken:  usrtoken
      , show:         option.show
      , count:        option.count
    })
  }

  Pongstr({ target: '#recent', show: 'recent', count: 4 })
  Pongstr({ target: '#likes' , show: 'liked' , count: 4 })
  Pongstr({ target: '#feed'  , show: 'feed'  , count: 4 })
  Pongstr({ target: '#tags'  , show: 'icloud', count: 4 })
});