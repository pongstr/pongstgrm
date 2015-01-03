
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
    , profile_picture:    64        // number: profile picture dimensions in square format e.g., (128 == 128x128 pixels)
    , profile_bg_color:   '#d9534f' // string: hex value of profile's background-color
  };

  Pongstagram.prototype.thumbnail = function (data) {
    var
      pongstr = this
    , options = this.options
    , markup  = {};

    markup.date = $('<span>', {
      class: 'item-date',
      text: data.created_time
    })

    markup.image = $('<img/>', {
        src: data.images.low_resolution.url
      , alt: data.caption ? data.caption.text : ''
      , class: 'p-container-thumbnail'
    }).hide()

    markup.likes = $('<span/>', {
      class: 'item-like',
      text: data.likes.count
    })

    markup.comments = $('<span/>', {
      class: 'item-comments',
      text: data.comments.count
    })

    markup.stats = $('<div/>')
      .addClass('item-stats')
      .append(markup.comments, markup.likes)

    markup.image.one('load', function () {
      var $image = $(this)
        ,  start = 0
      ++start === $image.length &&
        $image.fadeIn()
    })

    $('<div/>', { class: 'p-container-item' })
      .append(markup.date, markup.image, markup.stats)
      .appendTo(pongstr.element)

    return this
  };

  Pongstagram.prototype.paginator = function () {
    var
      pongstr = this
    , options = this.options
    , pgrblck = $('<div/>')
    , pgrbttn = $('<button/>')

    pgrbttn
      .html('<span>more</span>')
      .addClass('p-paginator-button')
      .end()

    pgrblck
      .append(pgrbttn)
      .addClass('p-paginator-block')
      .insertAfter(pongstr.element)
      .end()

    pgrbttn.on('click', function (e) {
      var next = $(pongstr.element).data('nextPage')

      if (!next)
        pgrbttn.attr('disabled', 'disabled')
      else
        pongstr.media(next)

      e.preventDefault()
    })
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

  Pongstagram.prototype.media = function (endpoint) {
    var
      pongstr = this
    , options = this.options

    function iterateMedia (data) {
      data.pagination.next_url = !$.isEmptyObject(data.pagination.next_url) ?
        data.pagination.next_url : null

      $(pongstr.element)
        .data('nextPage', data.pagination.next_url)

      $.each(data.data, function (a, b) {
        b.created_time = new Date(b.created_time * 1000).toDateString()
        pongstr.thumbnail(b)
      })
    }

    $.ajax({
        url:      endpoint
      , cache:    true
      , method:   'GET'
      , dataType: 'jsonp'
      , success:  function (data) {
        if (options.show !== 'profile')
          iterateMedia(data)
      }
    })

    return this
  };

  Pongstagram.prototype.start = function () {
    var
      pongstr = this
    , options = this.options
    , instagram = 'https://api.instagram.com/v1/'

    var typemedia = {
      feed: function () {
        return endpoint('users/self/feed?')
      },
      liked: function () {
        return endpoint('users/self/media/liked?')
      },
      recent: function () {
        return endpoint('users/'+ options.accessId +'/media/recent?')
      },
      profile: function () {
        return endpoint()
      },
      tag: function () {
        return endpoint('tags/' + options.show + '/media/recent?')
      }
    };

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

      pongstr.paginator()
      pongstr.media(instagram)

      return
    }

      $(pongstr.element)
        .data('paginate', options.show)
        .addClass('p-container-flexbox')

    typemedia[options.show] && typemedia[options.show]()

    return this
  };

  Pongstagram.prototype.authenticate = function (callback) {
    var
      access = (this.options.accessId || '' &&
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
  $.fn.pongstgrm.defaults = Pongstagram.defaults

}(jQuery);
