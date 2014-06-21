
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
    , show:       'recent'

    // PLUGIN COMPONENTS
    , like:              true
    , mute:              true
    , button:            true
    , counts:             true
    , picture:           64
    , comment:           true
    , preload:           true
    , profile_bg_img:    null
    , profile_bg_color:  '#d9534f'
  };

  // HTML Markup
  Pongstgrm.prototype.template = {
    thumbnail: function (options) {
      var _thumbnail  = '<div id="' + options.data.id + '">'
          _thumbnail += '<img src="'+ options.data.image +'" alt="'+ options.data.caption +'">'
          _thumbnail += '</div>'

      $(options.target).append(_thumbnail)
    }
  };

  // Lazyloading Images
  Pongstgrm.prototype.lazyload = function (option) {
    var $image = $('#' + option.data.id + ' > img')
      ,  start = 0

    $image.hide()

    $image.one('load', function () {
      ++start === $image.length &&
        $(this).fadeIn()
    }).each(function () {
      this.complete && $(this).load()
    })
  };

  Pongstgrm.prototype.start = function () {
    var $element = $(this.element)
      ,  options =  this.options
      ,  apiurl  = 'https://api.instagram.com/v1/users/'
      ,  rcount  = '?count=' +  options.count + '&access_token=' + options.accessToken

    $element
      .attr('data-type', options.show)
      .addClass('pongstagrm')

    function paginate (option) {
      var triggr = $('[data-paginate='+ option.show +']')

      (option.url === undefined || option.url === null) ?
        triggr.on('click', function (e) {
          $(this).attr('disabled', 'disabled')

          e.preventDefault()
        }) :

        triggr.on('click', function(e) {

          e.preventDefault()
        })

      return
    }

    function media (data, option) {
      $.each(data, function (a, b) {
        var newtime = new Date(b.created_time * 1000)
          , created = newtime.toDateString()
          , defaults = {
              dflt: option
            , target: $element
            , data: {
                  id:             b.id
                , type:           b.type
                , video:          b.videos && b.videos.standard_resolution.url
                , image:          b.images.standard_resolution.url
                , caption:        b.caption && b.caption.text
                , username:       b.user.username
                , timestamp:      created
                , thumbnail:      b.images.low_resolution.url
                , likes_count:    b.likes.count
                , comments_count: b.comments.count
                , comments_data:  b.comments.data
                , profile_picture:b.user.profile_picture
              }
          }

        Pongstgrm.prototype.template.thumbnail (defaults)
        Pongstgrm.prototype.lazyload (defaults)

      })

      return
    }

    function ajaxdata (option) {
      $.ajax({
          url      : option.url
        , cache    : true
        , method   : 'GET'
        , dataType : 'jsonp'
        , success  : function(data){
            option.opt.show !== 'profile' ?
              media   (data.data, option.opt) :
              profile (data.data, option.opt)

        }
      })
    }

    switch (options.show) {
      case 'liked':
        ajaxdata({
            url : apiurl + 'self/media/liked' + rcount
          , opt : options
        })
      break

      case 'feed':
        ajaxdata({
            url: apiurl + 'self/feed' + rcount
          , opt: options
        })
      break

      case 'profile':
        ajaxdata({
            url: apiurl + options.accessId + '?access_token=' + options.accessToken
          , opt: options
        })
      break

      case 'recent':
        ajaxdata({
            url: apiurl + options.accessId + '/media/recent' + rcount
          , opt: options
        })
      break

      default:
        ajaxdata({
            url: 'https://api.instagram.com/v1/tags/' + options.show + '/media/recent' + rcount
          , opt: options
        })
    }

    return
  };


  $.fn.pongstgrm = function (option) {
    var options  = $.extend({}, Pongstgrm.defaults, option)

    return this.each(function () {
      var media = new Pongstgrm($(this)[0], options)
          media.start()
    })
  };


}(window.jQuery);
