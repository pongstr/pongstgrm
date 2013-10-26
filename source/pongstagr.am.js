/*!==========================================================================
 * jQuery Pongstagr.am Plugin v3.0.0 Documentation Stylesheet
 * ==========================================================================
 * Copyright (c) 2013 Pongstr Ordillo. MIT License
 * Requires: jQuery v1.10.2 and Bootstrap 3.0.0
 * ========================================================================= */

+function ($) { "use strict"; 

  // 
  var Pongstgrm = function (element) {
    this.element = $(element)  
  }


  Pongstgrm.defaults = {

    // USER AUTHENTICATION
    // ===========================
      accessId:     null
    , accessToken:  null

    // DISPLAY OPTIONS
    // ===========================
    , show:    'recent'
    , count:    8
    , likes:    true
    , comments: true

    // HTML OPTIONS
    // ===========================
    , column:     'col-xs-6 col-sm-3 col-md-3 col-lg-3'
    , likeico:    'glyphicon glyphicon-heart'
    , videoico:   'glyphicon glyphicon-play'
    , commentico: 'glyphicon glyphicon-comment'
    , preload:    'spinner'
    , button:     'btn btn-lg btn-success pull-right'
    , buttontext: 'Load more'    
  }


  
}(window.jQuery);