/* ==========================================================================
 * jQuery Pongstagr.am Plugin v3.0.0
 * ==========================================================================
 * Copyright (c) 2013 Pongstr Ordillo. MIT License
 * Requires: jQuery v1.10.2 and Bootstrap 3.0.0
 * ========================================================================= */
 
+function ($) { "use strict"; 

  var Pongstgrm = function (element, options) {
    this.element = element
    this.options = options
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
  }


  // Create HTML Tags
  Pongstgrm.prototype.html = function (opt) {
    var element = document.createElement(opt.tag)
    
      opt.attr && $(element).attr(opt.attr); opt.html && $(element).html(opt.html)
      opt.text && $(element).text(opt.text); opt.css  && $(element).addClass(opt.css)
    
      opt.parent === true && $(element).append(opt.children) 
    
      switch (opt.append) {
        case 'before' : $(opt.target).before(element);  break
        case 'after'  : $(opt.target).after(element);   break      
        case 'append' : $(opt.target).append(element);  break
        case 'prepend': $(opt.target).prepend(element); break
      }

    return element
  }

  // Stream Media from Instagram
  Pongstgrm.prototype.stream = function () {
    var Pongstr = this
      , options = this.options

    // Preload images with a spinner
    function preloadMedia (option) {
      var  imgId = option.id
        ,  loadr = option.id +'-loadr'
        ,  total = $(imgId).length
        ,  preld = 0

      var loadbtn = $('[data-paginate='+option.show+']')
        , btnstat = document.createElement('div')

      $(loadbtn)
        .text('Loading ')
        .append(btnstat)
      $(btnstat)
        .addClass(option.preload)

      $(imgId).hide().load( function () {
        ++preld === total &&
          $(this).fadeIn()
          $(loadr).fadeOut().remove()
          $(loadbtn).text(option.buttontext)
          $(btnstat).fadeOut().remove()
      })
    }

    // Paginate through media stream
    function paginateMedia (option) {
      (option.url === undefined || option.url === null) ? 
        $('[data-paginate='+ option.show +']').on('click', function (e) {
          e.preventDefault()
            $(this)
              .removeClass()
              .addClass('btn btn-default')
              .attr('disabled','disabled')
        }) :
        
        $('[data-paginate='+ option.show +']').on('click', function (e) {
          e.preventDefault(); 
          ajaxdata({ url: option.url, opt: option.opt }); $(this).unbind(e);
        })
      return        
    }

    // Loop Media
    function loopMedia (data, option) {
      $.each(data.data, function (a, b) {

        var caption   = (b.caption !== null) ? b.caption.text : ''
          , timestamp = new Date(b.created_time * 1000)
          , created   = timestamp.toDateString()

        var mediatype      = (b.type === 'video') ? '<span class="type"><i class="'+ option.videoicon +'"></i></span>' : null
          , created_time   = option.timestamp === true  && '<strong>' + created + '</strong>'
          , likes_count    = option.likes === true      && '<span class="likes"><i class="'+ option.likeicon +'"></i> &nbsp;' + b.likes.count + '</span>'
          , comments_count = option.comments === true   && '<span class="comments"><i class="'+ option.commenticon +'"></i> &nbsp;' + b.comments.count + '</span>'

        var thumb = { 
            tag: 'img'
          , attr: { id: b.id+'-thmb', src: b.images.low_resolution.url, alt: caption }
        }

        var preloader = { tag: 'div'
          , attr: {id: b.id+'-thmb-loadr', class: option.preload }
        }

        var link = {
            tag: 'a'
          , attr: {id: b.id+'-trigger', href: '#'+b.id+'-modal', 'data-toggle': 'modal'}
          , parent: true
          , children: Pongstgrm.prototype.html(thumb)
        }

        var thumbnail = { 
              tag: 'div'
            , css: 'thumbnail text-center'
            , parent: true
            , children: [created_time, Pongstgrm.prototype.html(link), Pongstgrm.prototype.html(preloader), mediatype, likes_count, comments_count]
        }

        var column = {
            tag: 'div'
          , css: option.column
          , append: 'append'
          , target: Pongstr.element
          , parent: true
          , children: Pongstgrm.prototype.html(thumbnail)
        }
              
        Pongstgrm.prototype.html(column)
        preloadMedia({ id: '#'+ b.id + '-thmb', show: option.show })         
      })

      paginateMedia({ show: option.show, url: data.pagination.next_url, opt: option })
      
      return
    }

    function loopProfile (data, option) {
      console.log('profile!!')
    }

    // Retrieve Media via ajax
    function ajaxdata (option) {
      $.ajax({
          url      : option.url
        , cache    : true    
        , method   : 'GET'
        , dataType : 'jsonp' 
        , success  : function(data){          
            
            (option.opt.show !== 'profile') ?
              loopMedia(data, option.opt) : loopProfile(data.data, option.opt)
        }
      })
    }

    var apiurl = 'https://api.instagram.com/v1/users/'
    var rcount = '?count=' +  options.count + '&access_token=' + options.accessToken  

    switch (options.show) {
      case "liked":
        var liked = {
            url : apiurl + 'self/media/liked' + rcount
          , opt : options
        }
        ajaxdata(liked)
      break

      case "feed":
        var feed = {
            url: apiurl + 'self/feed' + rcount
          , opt: options
        }

        ajaxdata(feed)
      break

      case "profile":
        var profile = {
            url: apiurl + options.accessId + '?access_token=' + options.accessToken
          , opt: options
        }

        ajaxdata(profile)
      break

      case "recent":
        var recent = {
            url: apiurl + options.accessId + '/media/recent' + rcount
          , opt: options
        }

        ajaxdata(recent)
      break
      
      default:
        var tag = {
            url: 'https://api.instagram.com/v1/tags/' + options.show + '/media/recent' + rcount
          , opt: options
        }
        ajaxdata(tag)
    }

    return
  }


  // Create Media Stream
  Pongstgrm.prototype.create = function () {
    var Pongstr = this
    var element = this.element
    var options = this.options

    $(element)
      .attr('data-type', options.show)
      .addClass('pongstagrm row')

    Pongstr.html({
        tag: 'div'
      , css: 'row'
      , append: 'after'
      , target: element
      , html: '<button class="'+ options.button +'" data-paginate="'+ options.show +'">'+ options.buttontext +'</button>'
    })

    Pongstr.stream()

    return
  }

  // Authentication
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