
+function ($) { 'use strict';

  var O_o = function (element, options) {
    this.element  = element
    this.options  = options
    this.toggle   = '[data-toggle=_modal]'

    return this
  }

  O_o.defaults = {
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
  O_o.prototype.markup = function (data, meta, target) {
    var _image = $(document.createElement('img'))
          .attr({ src: data.images.low_resolution.url, alt: meta.caption })

      , _spinner = $(document.createElement('span'))
          .attr({ class: 'spinner' })

      , _likes  = !meta.opt.likes ? null : $(document.createElement('span'))
          .attr({ class: 'icon icon-like' })

      , _comment = !meta.opt.comments ? null : $(document.createElement('span'))
          .attr({ class: 'icon icon-comment'})

      , _type = meta.opt.type === 'video' && $(document.createElement('span'))
          .attr({ class: 'icon icon-video' })

    var thumbnail = $(document.createElement('div'))
          .attr({ id: data.id, 'data-toggle': '_modal' })
          .append(_spinner, _likes, _comment, _type, _image)

    $(target).append(thumbnail)

    return
  };

  O_o.prototype.modal = function (data, meta) {
    var $trigger  = $('#' + data.id)
      ,  modal    = '._modal'
      ,  bckdrp   = '._backdrop'
      , _backdrop = $(document.createElement('div'))
                      .attr({ class: '_backdrop' })

    function soClose (e) {
        $('body').removeClass('active')
        $(bckdrp).removeClass('in')
        $(modal).removeClass('in')

        setTimeout(function () {
          $(modal).remove()
          $(bckdrp).remove()
        }, 500)

      e.preventDefault();
    }


    $trigger.on('click', function (e) {
      var _modal  = $(document.createElement('div'))
                      .attr({ class: '_modal', id: data.id + '_modal'})

        , _close  = $(document.createElement('button'))
                      .attr({ class: '_close' })

        , _image  = $(document.createElement('img'))
                      .attr({ src: data.images.standard_resolution.url, alt: meta.caption })

        , _video  = '<video width="100%" height="auto">'
          _video += '<source src="'+ meta.video +'" type="video/mp4">'
          _video += '</video>'

      $('body')
        .append(_backdrop)
        .addClass('active')

      $(bckdrp)
        .append(_modal)

      setTimeout (function () {
        $(modal)
          .addClass('in')
          .append(_close)

        $(bckdrp)
          .addClass('in')
      }, 100)

      data.type !== 'video' ?
        $(modal).append(_image) :
          navigator.userAgent.match(/webkit/i) || navigator.userAgent.match(/(iPod|iPhone|iPad)/) ?
            $(modal).append(_video) : $(modal).append(_image);

      e.preventDefault()
    })

      $(document)
        .on('click', '._close', function (e) { soClose(e) })
        .on('keydown', function (e) { e.which === 27 && soClose(e) })

    return
  };

  O_o.prototype.lazyload = function (data) {
    var $image = $('#' + data.id + ' img')
      ,  start = 0

    $image.one('load', function () {
      ++start === $image.length &&
        $image.addClass('in')
        $('.spinner').fadeOut()
    }).each(function () {
      this.complete && $(this).load()
    })
  };

  O_o.prototype.instagram = {
    fetch: function (url, options, target) {
      var _ig   = this

      $.ajax({
          url       : url
        , cache     : true
        , method    : 'GET'
        , dataType  : 'jsonp'
        , success  : function(data){
            options.show !== 'profile' ?
            _ig.media(data, options, target) : null
          }
      })

    },
    media: function (data, options, target) {
      var _ig = this

      $.each(data.data, function (a, b) {
        var newtime = new Date(b.created_time * 1000)
          , created = newtime.toDateString()
          , data    = b
          , meta    = {
              opt:          options
            , type:         b.type
            , video:        b.videos && b.videos.standard_resolution.url
            , caption:      b.caption && b.caption.text
            , timestamp:    created
            , profile_img:  b.user.profile_picture
          }

        O_o.prototype.markup(data, meta, target)
        O_o.prototype.modal(data, meta)
        O_o.prototype.lazyload(data)
      })

      _ig.paginate(data.pagination.next_url, options, target)

    },
    paginate: function (data, options, target) {
      var _ig = this

      $('[data-paginate=' + options.show + ']').on('click', function (e) {
        (data === undefined || data === null) ?
          console.log('no more') : _ig.fetch(data, options, target);

        $(this).unbind(e)

        e.preventDefault()
      })
    }
  };

  O_o.prototype.start = function () {
    var o_O   = this
      , $_el  = o_O.element
      , api   = 'https://api.instagram.com/v1/'
      , count = '?count=' + o_O.options.count + '&access_token=' + o_O.options.accessToken
      , btnmo = $(document.createElement('button'))
          .attr({ class: 'loadmore', 'data-paginate': o_O.options.show })
          .html('Load More')
    $(o_O.element)
      .attr({ class: 'pongstagrm', 'data-show': o_O.options.show })

    switch (o_O.options.show) {
      case 'feed':
        o_O.instagram.fetch(api + 'self/feed' + count, o_O.options, $_el)
      break

      case 'liked':
        o_O.instagram.fetch(api + 'self/media/liked' + count, o_O.options, $_el)
      break

      case 'recent':
        o_O.instagram.fetch(api + 'users/' + o_O.options.accessId + '/media/recent' + count, o_O.options, $_el)
      break

      case 'profile':
      break

      default:
        o_O.instagram.fetch(api + 'tags/' + o_O.options.show + '/media/recent' + count, o_O.options, $_el)
      break
    }

    $(o_O.element)
      .after('<div class="loader" />')
    $('.loader').append(btnmo)
  };

  O_o.prototype.auth = function () {
    (this.options.accessId !== null || this.options.accessToken !== null) &&
      this.start(); return;
  }

  // Plugin Definition
  $.fn.pongstgrm = function (option) {
    var options  = $.extend({}, O_o.defaults, option)

    return this.each(function () {
      var o_O = new O_o($(this)[0], options)
          o_O.auth()
    })
  };

  // Default Options
  $.fn.pongstgrm.defaults = O_o.options;

}(window.jQuery);
