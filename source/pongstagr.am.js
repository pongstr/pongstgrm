/* ==========================================================================
 * jQuery Pongstagr.am Plugin v3.0.0
 * ==========================================================================
 * Copyright (c) 2013 Pongstr Ordillo. MIT License
 * Requires: jQuery v1.10.2 and Bootstrap 3.0.0
 * ========================================================================= */
 
+function ($) { "use strict"; 

  var Pongstgrm = function (element, options) {
    this.element = $(element)
    this.options = options
  }

  Pongstgrm.defaults = {

    // USER AUTHENTICATION
    // ===========================
      accessId:     null
    , accessToken:  null


    // DISPLAY OPTIONS
    // ===========================
    , count:     8
    , likes:     true
    , comments:  true
    , timestamp: true
    , show:      "recent"

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

  // Create Media Stream
  Pongstgrm.prototype.create = function () {
    var Pongstr = this
    var element = this.element
    var options = this.options

    $(element)
      .attr('data-type', options.show)
      .addClass('pongstgrm row')

    Pongstr.html({
        tag: 'div'
      , css: 'row'
      , append: 'after'
      , target: element
      , html: '<button class="'+ options.button +'" data-paginate="'+ options.show +'">'+ options.buttontext +'</button>'
    })

    return
  }

  // Authentication
  Pongstgrm.prototype.start = function () {
    var option = this.options
    if (option.accessId !== null || option.accessToken !== null) {
      this.create(); return true
    } else {
       return false
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