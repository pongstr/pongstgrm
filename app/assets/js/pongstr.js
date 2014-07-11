
+function ($) { 'use strict'

  var Pongstgrm = function (element, options) {
    this.element  = element
    this.options  = options
    this.toggle   = '[data-toggle=_modal]'

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
    , like:               true
    , mute:               true
    , button:             true
    , counts:             true
    , preload:            true
    , comment:            true
    , picture:            64
    , profile_bg_img:     null
    , profile_bg_color:   '#d9534f'
  };

  // HTML Markup
  Pongstgrm.prototype.template = function (options, target) {
    var _image = $(document.createElement('img'))
          .attr({ src: options.data.thumbnail, alt: options.data.caption })

      , _spinner = $(document.createElement('span'))
          .attr({ class: 'spinner' })

      , _likes  = !options.likes ? '' : $(document.createElement('span'))
          .attr({ class: 'icon icon-like' })

      , _comment = !options.comments ? '' : $(document.createElement('span'))
          .attr({ class: 'icon icon-comment'})

      , _type = $(document.createElement('span'))
          .attr({ class: 'icon icon-video' })

    var thumbnail = $(document.createElement('div'))
          .attr({ id: options.data.id, 'data-toggle': '_modal' })
          .append(_spinner, _likes, _comment, _type, _image)

    $(target).append(thumbnail)

    return
  };

  // Modal Window
  Pongstgrm.prototype.modal = function (options) {
    var $trigger  = $('#' + options.data.id)
      , _modal    = $(document.createElement('div')).attr({ class: '_modal' })
      , _close    = $(document.createElement('button')).attr({ class: '_close' })
      , _backdrop = $(document.createElement('div')).attr({ class: '_backdrop' }).append(_modal)

    var _image  = $(document.createElement('img'))
          .attr({ src: options.data.image, alt: options.data.caption }),
        _video  = '<video width="100%" height="auto">'
        _video += '<source src="'+ options.data.video +'" type="video/mp4">'
        _video += '</video>'

    $trigger.on('click', function (e) {
      $('body')
        .append(_backdrop)
        .addClass('active')

      setTimeout (function () {
        $('._modal, ._backdrop').addClass('in')
        $('._modal').append(_close)
      }, 100)

      options.data.type !== 'video' ?
        $('._modal').append(_image) :
          navigator.userAgent.match(/webkit/i) || navigator.userAgent.match(/(iPod|iPhone|iPad)/) ?
            $('._modal').append(video) : $('._modal').append(_image);

      e.preventDefault()
    })

      $(document).on('click', '._close', function (e) {
        $('body').removeClass('active')
        $('._modal, ._backdrop').removeClass('in')

        setTimeout(function () {
          $(_backdrop).remove()
        }, 500)

        e.preventDefault()
      })

    return
  };

  // Lazyloading Images
  Pongstgrm.prototype.lazyload = function (option) {
    var $image = $('#' + option.data.id + ' > img')
      ,  start = 0

    $image.one('load', function () {
      ++start === $image.length &&
        $image.addClass('in')
        $('.spinner').fadeOut()
    }).each(function () {
      this.complete && $(this).load()
    })
  };

  // Begin Photostream
  Pongstgrm.prototype.start = function () {
    var $element = $(this.element)
      ,  options = this.options
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

        Pongstgrm.prototype.template (defaults, $element)
        Pongstgrm.prototype.lazyload (defaults)
        Pongstgrm.prototype.modal (defaults)
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

  $.fn.pongstgrm.defaults = Pongstgrm.options

}(window.jQuery);
