
+function ($) { 'use strict'

  var Pongstgrm = function (element, options) {
    this.element  = element
    this.options  = options

    return this
  }


  Pongstgrm.defaults = {

    // USER AUTHENTICATION
      accessId:     null
    , accessToken:  null

    // DISPLAY OPTIONS
    , count:       8
    , likes:       true
    , comments:    true
    , timestamp:   true
    , effects:    'scaling'
    , show:       'recent'
  }


  Pongstgrm.prototype.start = function () {
    console.log('testtttting')
  };


  $.fn.pongstgrm = function (option) {
    var options  = $.extend({}, Pongstgrm.defaults, option)

    return this.each(function () {
      var media = new Pongstgrm($(this)[0], options)
          media.start()
    })
  }


}(window.jQuery);