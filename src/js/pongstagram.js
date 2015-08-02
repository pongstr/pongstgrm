+function ($) { 'use strict';

  var Pongstagram = function (element, options) {
    this.element = element || '<div/>'
    this.options = options || Pongstagram.DEFAULTS
    this.instgrm = 'https://api.instagram.com/v1'
    
    this.authenticate()

    return this
  }

  Pongstagram.VERSION = '0.1.0'

  // Default Plugin Ooptions
  Pongstagram.DEFAULTS = {
    // user authentication
      accessId:     ''
    , accessToken:  ''

    // display options
    , count:       1                // number:  default number of media to be displayed
    , likes:       true             // boolean: show/hide likes count
    , comments:    true             // boolean: show/hide comments
    , timestamp:   true             // boolean: show/hide media timestamp
    , show:       'recent'          // string:  possible options are feed, likes, media, profile and tag

    // plugin components
    , btn_like:         true      // boolean: show/hide like button
    , btn_mute:         true      // boolean: show/hide mute button (for video)
    , btn_comment:      true      // boolean: show/hide comment field
    , profile_bg_img:   null      // string:  valid image uri
    , profile_picture:  64        // number:  profile picture dimensions in square format e.g., (128 == 128x128 pixels)
    , profile_bg_color: '#d9534f' // string:  hex value of profile's background-color
  }

  Pongstagram.prototype.markup = function () {


    return this
  }

  Pongstagram.prototype.getMedia = function (url) {
    var that = this

    $.get(url, function (data) {
      if (that.mode == 'profile')
        console.log(that.mode, data)

      if (that.mode == 'tag')
        console.log(that.mode, data)

      if (that.mode == 'gallery')
        console.log(that.mode, data)
    }, 'jsonp');

    return this
  }

  Pongstagram.prototype.start = function () {
    var that  = this
    var media = {}
    var base  = '/users/'

    // Display user's feed
    media.feed = function () {
      that.mode = 'gallery'
      base += 'self/feed?' + $.param({
          count: that.options.count
        , access_token: that.options.accessToken
      })
      that.request = that.instgrm + base
      return that.request
    }

    // Display user's liked media
    media.liked = function () {
      that.mode = 'gallery'
      base += 'self/media/liked?' + $.param({
          count: that.options.count
        , access_token: that.options.accessToken
      })
      that.request = that.instgrm + base
      return that.request
    }

    // Display user's profile
    media.profile = function () {
      that.mode = 'profile'
      base += that.options.accessId + '?'
      base += $.param({ access_token: that.options.accessToken })
      that.request = that.instgrm + base
      return that.request
    }

    // Display user's recent media
    media.recent = function () {
      that.mode = 'gallery'
      base += that.options.accessId
      base += '/media/recent?' + $.param({
          count: that.options.count
        , access_token: that.options.accessToken
      })
      that.request = that.instgrm + base
      return that.request
    }

    // Display user Tag
    media.tag = function () {
      var tags = that.options.show &&
        that.options.show.trim().split(' ');

      that.mode = 'tag'
      tags.forEach(function (e) {
        var path  = that.instgrm + '/tags/'
        path += encodeURIComponent(e.replace(/^\#/g,'').trim())
        path += '/media/recent?' + $.param({
            count: that.options.count
          , access_token: that.options.accessToken
        })
        that.getMedia(path)
      })
      that.request = that.instgrm + base
      return that.request
    }

    that.options.show.match(/^\#(\w+|\d+)/g) ?
      media.tag() : (media[that.options.show] || Object.keys(media).indexOf(that.options.show) !== -1) ?
        media[that.options.show]() && that.getMedia(that.request) : media.tag();

    return true
  }

  Pongstagram.prototype.authenticate = function () {
    var access = (this.options.accessId || '' &&
                  this.options.accessToken || '') ? true : false;
    if (access)
      this.start(); return true

    if (!access)
      console.info('%cPongstagr.am requires an Instagram Access ID and Token to access your media.','color:red')
      console.info('%cYou may access public media by using `{show: \'tag-you-like\'}`.','color:green')
      return false
  }

  // Plugin Definition
  $.fn.pongstgrm = function (option) {
    var opt = $.extend({}, $.fn.pongstgrm.defaults, option)
    return this.each(function () {
      for (var i = 0; i < arguments.length; i++) {
        if (typeof arguments[i] === 'function')
          opt.callback = arguments[i]()

        if (typeof arguments[i] === 'object')
          opt[arguments[i]]
      }

      new Pongstagram($(this)[0], opt)
    })
  }

  // Plugin default Options
  $.fn.pongstgrm.defaults = Pongstagram.DEFAULTS

}(jQuery);
