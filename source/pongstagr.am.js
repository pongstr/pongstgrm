/* ==========================================================================
 * jQuery Pongstagr.am Plugin v3.0.0
 * ==========================================================================
 * Copyright (c) 2013 Pongstr Ordillo. MIT License
 * Requires: jQuery v1.10.2 and Bootstrap 3.0.0
 * ========================================================================= */
 
+function ($) { "use strict"; 

  var Pongstgrm = function (element, options) {
    this.element  = element
    this.options  = options

    return this
  }

  Pongstgrm.defaults = {

    // USER AUTHENTICATION
    // ===========================
      accessId:     null
    , accessToken:  null


    // DISPLAY OPTIONS
    // ===========================
    , count:       8
    , likes:       true
    , comments:    true
    , timestamp:   true
    , effects:    "scale"
    , show:       "recent"

    // HTML OPTIONS
    // ===========================
    , preload:     "spinner"
    , button:      "btn btn-success pull-right"
    , buttontext:  "Load more"
    , column:      "col-xs-6 col-sm-3 col-md-3 col-lg-3"
    , likeicon:    "glyphicon glyphicon-heart"
    , videoicon:   "glyphicon glyphicon-play"
    , commenticon: "glyphicon glyphicon-comment"
    , picture_size: 64
    , show_counts:  true
  }

  /* HTML TEMPLATES */
  Pongstgrm.prototype.template = {
    loadmore: function (options) {
      var // Load More Pagination Button
        _load  = '<div class="row">'
        _load += '  <button class="'+ options.button +'" data-paginate="'+ options.show +'">'
        _load +=      options.buttontext
        _load += '  </button>'
        _load += '</div>'

      options.insert !== 'before' ? 
        $(options.target).after (_load) :
        $(options.target).before(_load)

      return
    }

    , thumb: function (options) {
        var // Display Options
            _thumbnail  = '<div class="'+ options.dflt.column +'">'
            _thumbnail += ' <div class="thumbnail text-center ' + options.dflt.effects + '">'

          options.dflt.timestamp !== false ?
            _thumbnail += '<strong>'+ options.data.timestamp +'</strong>' : null

            _thumbnail += '   <div class="'+ options.dflt.preload +'" id="'+ options.data.id +'-thmb-loadr" />'
            _thumbnail += '   <a href="#'+ options.data.id +'" id="triggr-'+ options.data.id +'">'
            _thumbnail += '     <img id="'+ options.dflt.show + '-' + options.data.id +'-thmb" src="'+ options.data.thumbnail +'" alt="'+ options.data.caption +'">'
            _thumbnail += '   </a>'

          options.data.type === 'video' ? 
            _thumbnail += '<span class="type"><i class="'+ options.dflt.videoicon +'"></i></span>': null

          options.data.likes !== false ?
            _thumbnail += '<span class="likes"><i class="'+ options.dflt.likeicon +'"></i>&nbsp; '+ options.data.likes_count+'</span>': null

          options.data.comments !== false ? 
            _thumbnail += '<span class="comments"><i class="'+ options.dflt.commenticon +'"></i>&nbsp; '+ options.data.comments_count+'</span>': null

            _thumbnail += ' </div>'
            _thumbnail += '</div>'

        $(options.target).append(_thumbnail)

      return
    }

    , modal: function (options) {
        var modal  = '<div id="'+ options.data.id +'" class="modal fade">'
            modal += '  <div class="modal-dialog">'
            modal += '    <div class="modal-content">'
            modal += '      <div class="modal-body">'
            modal += '        <div class="row">'

            modal += '<div class="media-column">'
            if (options.type !== 'video') {
              // modal += '<div class="'+ options.dflt.preload +'" id="'+ options.data.id +'-full-loadr" />'
              modal += '<img id="'+ options.data.id +'-full" src="'+ options.data.image +'" alt="'+ options.data.caption +'">'
            }

            if (options.type === 'video') {
                modal += '<video controls autoplay width="100%" height="auto">'
                modal += '  <source src="'+ options.data.video +'" type="video/mp4">'
                modal += '</video>'
            }

            modal += '</div>'

            modal += '<div class="media-comment">'
            modal += '  <div class="media">'
            modal += '    <div class="pull-left">'
            modal += '    </div>'
            modal += '    <div class="modal-body" />'
            modal += '  </div>'
            modal += '</div>'

            modal += '        </div>'
            modal += '      </div>'
            modal += '    </div>'
            modal += '  </div>'
            modal += '</div>'

        $('#triggr-' + options.data.id).on('click', function(e) {
          e.preventDefault()

          $('body').append(modal)
          $('#' + options.data.id)
            .modal('show')
            .on('hidden.bs.modal', function() {
              $(this).remove()
            })
        })

      return
    }
  }


  Pongstgrm.prototype.stream = function () {
    var element = this.element
      , options = this.options
      , apiurl  = 'https://api.instagram.com/v1/users/'
      , rcount  = '?count=' +  options.count + '&access_token=' + options.accessToken  

    function preloadMedia (option) {
      var  total = $(option.imgid).length
        ,  start = 0

      $(option.imgid).hide().load( function () {
        ++start === total &&
          $(this).fadeIn()
          $(option.loadr).fadeOut().remove()
      })
      
      return
    }

    function paginate (option) {
      (option.url === undefined || option.url === null) ? 
        $('[data-paginate='+ option.show +']').on('click', function (e) {
            $(this)
              .removeClass()
              .addClass('btn btn-default')
              .attr('disabled','disabled')
          e.preventDefault()
        }) :

        $('[data-paginate='+ option.show +']').on('click', function (e) {
          e.preventDefault()

          ajaxdata({ 
              url: option.url
            , opt: option.opt 
          })

          $(this).unbind(e);
        })

      return
    }

    function media (data, option) {
      $.each(data.data, function (a, b) {
        var // Data Variables
            newtime = new Date(b.created_time * 1000)
          , created = newtime.toDateString()
          , defaults = {
              dflt: option
            , target: element
            , data: {
                  id:             b.id
                , type:           b.type
                , video:          b.videos && b.videos.standard_resolution.url
                , image:          b.images.standard_resolution.url
                , caption:        b.caption && b.caption.text 
                , timestamp:      created
                , thumbnail:      b.images.low_resolution.url
                , likes_count:    b.likes.count
                , comments_count: b.comments.count
                , comments_data:  b.comments.data
              }
          }

        Pongstgrm.prototype.template.thumb (defaults)

        preloadMedia({
            imgid : '#' + option.show + '-' + b.id + '-thmb'
          , loadr : '#' + b.id + '-thmb-loadr'
        })

        Pongstgrm.prototype.template.modal (defaults)

      })
    }

    function profile (data, option) {

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
              media (data, option.opt) :
              profile (data, option.opt)

            option.opt.show !== 'profile' &&
              paginate ({ 
                  show: option.opt.show
                , url:  data.pagination.next_url
                , opt: option.opt
              })
          }
      })

      return
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
  }


  Pongstgrm.prototype.create = function () {
    var element = this.element
      , options = this.options

    $(element)
      .attr('data-type', options.show)
      .addClass('pongstagrm row')


    options.show !== 'profile' &&
      Pongstgrm.prototype.template.loadmore({
          show:       options.show
        , target:     element
        , button:     options.button
        , buttontext: options.buttontext
      })

    this.stream()

    return
  }


  Pongstgrm.prototype.start = function () {
    var option = this.options
    if (option.accessId !== null || option.accessToken !== null) {
      this.create(); return
    }
  }

  // PONGSTAGR.AM PLUGIN DEFINITON
  // =============================
  $.fn.pongstgrm = function (option) {
    var options  = $.extend({}, Pongstgrm.defaults, option)

    return this.each(function () {
      var media = new Pongstgrm($(this)[0], options)
          media.start()
    })
  }


  // PONGSTAGR.AM DEFAULT OPTIONS
  // =============================  
  $.fn.pongstgrm.defaults = Pongstgrm.options

}(window.jQuery);