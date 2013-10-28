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


  var userid   = '39666111'
  var usrtoken = '39666111.1fb234f.c3901000b4944a549fd5fd2310c63780'

  $('#recent').pongstgrm({
    id:    userid,
    token: usrtoken
  })

});