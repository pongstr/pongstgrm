/*!
 * jQuery Pongstagr.am Plugin 
 * Examples and documentation at: http://pongstr.com/projects/pongstagr.am
 * Copyright (c) 2013 Pongstr Ordillo
 * Version: 2.0.32
 * Code license under Apache License v2.0
 * http://www.apache.org/licenses/LICENSE-2.0
 * Requires: jQuery v1.8 and Reveal Plugin
 */

;(function ($, window, document, undefined){
  
  "use strict";
  
  function renderHTML( targetElement, request ){
    var galleryList      = '<ul class="thumbnails"></ul>',
        galleryContainer = '<div class="row-fluid">' + galleryList + '</div>',
        paginateBtn      = '<div class="row-fluid"><a href="#" data-paginate="'+ request +'-pages" class="span6 offset3 btn btn-large btn-block btn-success">Load More</a></div>';

    $( targetElement ).append( galleryContainer );  
    $( targetElement ).after( paginateBtn );  
  }
  

  function ajaxRequest( endpoint ){
    $.ajax({
      method   : "GET"    ,
      url      : endpoint ,
      cache    : true     ,
      dataType : "jsonp"  ,
      success  : function(data){
        
        $.each( data.data, function( key, value){

          var thumbnail  = value.images.low_resolution.url, 
          // ( value.images.standard_resolution.url ) ? value.images.standard_resolution.url : value.images.low_resolution.url,
              caption    = ( value.caption !== null ) ? ( value.caption.text !== null ) ? value.caption.text : '' : value.user.username,
              nextUrl    = data.pagination.next_url,
              // comments   = ( value.comments.count   ) ? value.comments.count : '0',
              
              thumbBlock  = '<li class="span3"><div class="thumbnail">';
              thumbBlock += '<img src="' + thumbnail + '" alt="' + caption + '" />';
              thumbBlock += '</div></li>';
              
          $('.thumbnails').append( thumbBlock );
          
        });
        
        paginate( data.pagination.next_url );
      }
    });
  }

  function paginate( nextUrl ){
    if ( nextUrl !== undefined || nextUrl !== null ) {
      $('.btn').click(function(event){
        
        ajaxRequest( nextUrl ); // Load Succeeding Pages.
        
       $(this).unbind(event);   // Unbind all attached events.
      });
    } else {
      $('.btn').click(function(){
        
      });
    }
  }
  
  function requestData ( request, count, accessID, accessToken, targetElement ){
    var $apiRequest   = 'https://api.instagram.com/v1/users/',  
        $requestCount = ( count !== null ) ?  
          '?count=' +  count + '&access_token=' + accessToken :
          '?count=' +    8   + '&access_token=' + accessToken ,
        loadBtnData  = ( request === null ) ? 'recent' : request ;
    
    if ( request === null || request === 'recent' ){
      var $recentMedia = $apiRequest + accessID + '/media/recent' + $requestCount; 
          // Load Recent Media
          ajaxRequest( $recentMedia, request );
    }
    
    if ( request === 'liked' ){
      var $likedMedia = $apiRequest + 'self/media/liked' + $requestCount;
          // Load Liked Media
          ajaxRequest( $likedMedia );
    }

    if ( request === 'feed' ){
      var $feedMedia = $apiRequest + 'self/feed' + $requestCount;
          // Load User Feed
          ajaxRequest( $feedMedia );
    }
    renderHTML( targetElement, loadBtnData );
  }

  function accessDetails( accessID, accessToken ){
    if ( accessID !== null || accessToken !== null ) {
        return true;
      } else {
          console.log('Please check whether your Access ID and Access Token if it\'s valid.' );
          console.log('You may visit http://instagram.com/developer/authentication/ for more info.');
        return false;
    }
  }

  $.fn.pongstgrm = function( options ){
    // Plugin Options
    var option  = $.extend({}, $.fn.pongstgrm.defaults, options);
    
    return this.each( function(i, element){
      
      if ( accessDetails( option.accessId, option.accessToken ) !== false ){
        requestData( option.show, option.count, option.accessId, option.accessToken, element );
        
      }
      
    });  //*! end return this.each;
  };     //*! end $.fn.pongstagrm;
   
  // Pongstagram Default Options
  $.fn.pongstgrm.defaults = {

    // User Authentication
    accessId     : null,  // instsagram user-id
    accessToken  : null,  // instagram access-token

    // Display options
    show         : null,    // string,  options: 'recent', 'feed', 'liked', 'user'
    count        : null,    // integer, options: 1(min) - 40(max), instagram limits the maximum number of photos to 40
    resolution   : null,    // string,  options: 'low_resolution', 'standard_resolution'
    pager        : null     // boolean, options:  true or false (enables/disable load more button)

  };
   
 })(jQuery, window, document);