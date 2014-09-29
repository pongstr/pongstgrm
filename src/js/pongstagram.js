
+function ($) { 'use strict';

  var Pongstagram = function (element, options) {
    this.element = element;
    this.options = options ? options: this.defaults;

    return this
  };


  // Default Options
  Pongstagram.defaults = {
    // user authentication
      accessId:     null
    , accessToken:  null

    // display options
    , count:       8              // integer: default number of media to be displayed initially
    , likes:       true           // boolean: show/hide likes count
    , comments:    true           // boolean: show/hide comments
    , timestamp:   true           // boolean: show/hide media timestamp
    , show:       'recent'        // string:  possible options are feed, likes, media, profile and tag

    // plugin components
    , btn_like:           true      // boolean: show/hide like button
    , btn_mute:           true      // boolean: show/hide mute button (for video)
    , btn_comment:        true      // boolean: show/hide comment field
    , profile_bg_img:     null      // string:  valid image uri
    , profile_picture:    64        // integer: profile picture dimensions e.g., (128 == 128x128 pixels)
    , profile_bg_color:   '#d9534f' // string: hex value of profile's background-color
  };

  Pongstagram.prototype.authenticate = function () {

    return this
  };



  // Plugin Definition

  $.fn.pongstgrm = function (option) {
    var options  = $.extend({}, Pongstagram.defaults, option)

    return this.each(function () {
      var pongstagrm = new Pongstagram($(this)[0], options)
          pongstagrm.authenticate()
    })
  };

  // Plugin default Options
  $.fn.pongstgrm.defaults = Pongstagram.defaults;


  // Data-Api Definition


}(window.jQuery);

