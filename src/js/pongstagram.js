
+function ($) { 'use strict';

  var Pongstagram = function (element, option) {
    this.element = element || '';
    this.options = option;

    return this
  };

  Pongstagram.VERSION = '0.1.0';

  // Default Options
  Pongstagram.defaults = {
    // user authentication
      accessId:     null
    , accessToken:  null

    // display options
    , count:       8                // integer: default number of media to be displayed initially
    , likes:       true             // boolean: show/hide likes count
    , comments:    true             // boolean: show/hide comments
    , timestamp:   true             // boolean: show/hide media timestamp
    , show:       'recent'          // string:  possible options are feed, likes, media, profile and tag

    // plugin components
    , btn_like:           true      // boolean: show/hide like button
    , btn_mute:           true      // boolean: show/hide mute button (for video)
    , btn_comment:        true      // boolean: show/hide comment field
    , profile_bg_img:     null      // string:  valid image uri
    , profile_picture:    64        // integer: profile picture dimensions e.g., (128 == 128x128 pixels)
    , profile_bg_color:   '#d9534f' // string: hex value of profile's background-color
  };


  Pongstagram.prototype.utils = {
    stringify: function (object) {
      var urlstring = []

      for (var key in object) {
        (object.hasOwnProperty(key)) &&
          urlstring.push(encodeURIComponent(key) + '=' + encodeURIComponent(object[key]))
      }

      return urlstring.join('&')
    }
  };

  Pongstagram.prototype.template = {
    thumbnail: function () {
      console.log('thumbnail')
    },
    modal: function () {

    },
    paginator: function () {

    }
  };

  Pongstagram.prototype.media = function (endpoint) {
    var pongstr = this
      , options = this.options

    function iterateMedia (data) {
      $.each(data.data, function (a, b) {
        b.created_time = new Date(b.created_time * 1000).toDateString()
        console.log(b)
      })
    }

    $.ajax({
        url:      endpoint
      , cache:    true
      , method:   'GET'
      , dataType: 'jsonp'
      , success:  function (data) {
          (options !== 'profile') ?
            iterateMedia(data) : null
      }
    })

    return this
  };

  Pongstagram.prototype.start = function () {
    var pongstr   = this
      , options   = this.options
      , instagram = 'https://api.instagram.com/v1/'

    function endpoint (endpoint) {
      if (!endpoint) {
        instagram += 'users/' + options.accessId
        instagram += pongstr.utils.stringify({ access_token: options.accessToken })
      }

      if (endpoint) {
        instagram += endpoint
        instagram += pongstr.utils.stringify({
          count: options.count,
          access_token: options.accessToken
        })
      }

      pongstr.media(instagram)
      return
    }

    var typemedia = {
      feed: function () {
        return endpoint('users/self/media/liked?')
      },
      liked: function () {
        return endpoint('users/self/media/liked?')
      },
      profile: function () {
        return endpoint()
      },
      recent: function () {
        return endpoint('users/'+ options.accessId +'/media/recent?')
      }
    }

    if (['feed', 'liked', 'profile', 'recent'].indexOf(options.show) == options.show)
      console.log(options.show)
      // typemedia[options.show] && typemedia[options.show]()
    else
      endpoint('tags/' + options.show + '/media/recent?')


    return this;
  };

  Pongstagram.prototype.authenticate = function (callback) {
    var access = (this.options.accessId || '' &&
                  this.options.accessToken || '') ? true : false
    if (access)
      this.start(); return true

    if (!access)
      console.log('%cPongstagr.am requires an Instagram Access ID and Token to access your media.','color:red')
      console.log('%cYou may access public media by using `{show: \'tag-you-like\'}`.','color:green')
      return false
  };



  // Plugin Definition
  $.fn.pongstgrm = function (option) {
    var options = $.extend({}, $.fn.pongstgrm.defaults, option)

    return this.each(function () {
      var pongstagrm = new Pongstagram($(this)[0], options)
          pongstagrm.authenticate()
    })
  };

  // Plugin default Options
  $.fn.pongstgrm.defaults = Pongstagram.defaults;


}(jQuery);
