/*!
 * jQuery Pongstagr.am Plugin 
 * Copyright (c) 2013 Pongstr Ordillo
 * Version: 2.0.6
 * Code license under Apache License v2.0
 * http://www.apache.org/licenses/LICENSE-2.0
 * Requires: jQuery v1.9 and Bootstrap 3.2 js
 */

;(function ($, window, document, undefined){
  
  "use strict";
  
  function renderHTML( targetElement, request, pager ){
    var galleryList      = '<ul class="thumbnails"></ul>',
        galleryContainer = '<div class="row-fluid">' + galleryList + '</div>',
        paginateTarget   = $(targetElement).attr('id'),
        paginateBtn      = '<div class="row-fluid"><a href="javascript:void(0);" data-paginate="'+ paginateTarget +'" class="span4 offset4 btn btn-large btn-block btn-success">Load More</a></div>';

    $( targetElement ).append( galleryContainer ); 
    
    if ( pager === null || pager === true ){
      $( targetElement ).after( paginateBtn );
    }      
  }
  
  function renderModal( imageOwner, imageId, imageTitle, imageUrl, imgUser ){

    var modal  = '<div id="' + imageId + '" class="modal hide fade" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">';
        modal += '<div class="modal-header">';
        modal += '<button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>';
        modal += '</div><!-- end of .modal-header -->';
        modal += '<div class="modal-body">';
        modal += '<div class="row-fluid">';
    
        modal += '<div class="modal-img"><img src="' + imageUrl +'" alt="' + imageTitle + '" /></div>';

        modal += '<div class="modal-comments">';
        modal += '<div id="user-caption" class="row-fluid">';
        modal += '<div class="span2 text-center"><a href="http://www.instagram.com/' + imageOwner + '"><img src="' + imgUser + '" alt="" class="img-polaroid" style="width: 32px; height: 32px; margin-right: 10px; vertical-align: middle;" /></a></div>';
        modal += '<div class="span10"><a href="http://www.instagram.com/' + imageOwner + '">' + imageOwner + '</a>&nbsp;' + imageTitle + '</div>';
        modal += '</div><!-- end of .row-fluid -->';
        modal += '</div>';

        modal += '</div><!-- end of .modal-fluid -->';
        modal += '</div><!-- end of .modal-body -->';
        modal += '</div><!-- end of .modal -->';
                
    $('body').append( modal ); //*! Append modal window to body 
    
    $('#' + imageId ).on('hidden', function(){
      $(this).remove();
    });
  }

  function imagePreLoader( imageId ){
    var $image    = $( imageId ),
         spinner  = imageId + '-ldr',
         preloadr = 0,
         total    = $image.length;          
    $image.hide();
    $image.load(function(){
      if ( ++preloadr === total ){
        $image.fadeIn('fast');
        $(spinner).fadeOut('fast').remove();
      }
    });
  }

  function ajaxRequest( endpoint, targetElement ){
    $.ajax({
      method   : "GET"    ,
      url      : endpoint ,
      cache    : true     ,
      dataType : "jsonp"  ,
      success  : function(data){

        var injectTo = '#' + $(targetElement).attr('id');    
                
        $.each( data.data, function( key, value ){

          var thumbnail  = value.images.low_resolution.url, 
              imgCaption = ( value.caption !== null ) ? ( value.caption.text !== null ) ? value.caption.text : '' : value.user.username,
              comments   = ( value.comments.count !== null ) ? value.comments.count : '0',
              likes      = ( value.likes.count !== null ) ? value.likes.count : '0',
              imageUrl   = value.images.standard_resolution.url,
              imageId    = value.id,
              imgUser    = value.user.profile_picture,
              imageOwner = value.user.username;
                            
          var thumbBlock  = '<li class="span3">';
              thumbBlock += '<div class="thumbnail">';
              thumbBlock += '<div id="'+ imageId +'-thmb-ldr" class="loader"></div>';
              thumbBlock += '<a href="#" class="btn btn-mini btn-info btn-likes"><i class="icon-heart icon-white"></i> &nbsp;' + likes + '</a>';
              thumbBlock += '<a href="#" class="btn btn-mini btn-info btn-comments"><i class="icon-comment icon-white"></i> &nbsp;' + comments + '</a>';
              thumbBlock += '<a href="#" role="button" data-toggle="modal" data-reveal-id="' + imageId + '"><img src="' + thumbnail + '" alt="' + imgCaption + '" id="' + value.id + '-thmb" /></a>';
              thumbBlock += '</div>';
              thumbBlock += '</li>';
          
          // Inject Thumbnaisl to container              
          $( injectTo + ' .thumbnails' ).append( thumbBlock );
          
          // Preload images
          imagePreLoader( '#' + imageId + '-thmb' );
          
          $('[data-reveal-id="' + imageId + '"]').click(function(){
                        
            $('.modal').attr('id', imageId );
            
            renderModal( imageOwner, imageId, imgCaption, imageUrl, imgUser );
            
            $.each( value.comments.data, function( group, key ){
              var commentBlock  = '<div class="row-fluid">';
                  commentBlock += '<div class="span2 text-center"><img src="' + key.from.profile_picture + '" style="width: 36px; height: 36px; margin-right: 10px; vertical-align: middle;" class="img-polaroid" /></div>';
                  commentBlock += '<div class="span10">';
                  commentBlock += '<a href="http://www.instagram.com/' + key.from.username + '"><strong>' + key.from.username + '</strong></a><br />';
                  commentBlock +=  key.text;
                  commentBlock += '</div>';
                  commentBlock += '</div><!-- end of .row-fluid -->';
              
              $('#user-caption').after(commentBlock);
            });            

            $('#' + imageId ).modal(); //*! fire modal window
          });
        });

        paginate( data.pagination.next_url, injectTo ); //*! paginate through images
      }
    });
  }

  function paginate( nextUrl, targetElement ){
    
    var pagBtn = $(targetElement).attr('id');
    
    if ( nextUrl === undefined || nextUrl === null ) {
      $('[data-paginate="' + pagBtn + '"]').click(function(event){
        event.preventDefault();
        $(this)
          .removeClass('btn-success')
          .addClass('disabled btn-secondary');
      });
    } else {
      $('[data-paginate="' + pagBtn + '"]').click(function(event){
        event.preventDefault();
          ajaxRequest( nextUrl, targetElement );  //*! Load Succeeding Pages.
          $(this).unbind(event);   //*! Unbind all attached events.
      });
    }
  }
  
  function requestData ( request, count, accessID, accessToken, targetElement, pager ){
    var $apiRequest   = 'https://api.instagram.com/v1/users/',  
        $requestCount = ( count !== null ) ?  
          '?count=' +  count + '&access_token=' + accessToken :
          '?count=' +    8   + '&access_token=' + accessToken ,
        loadBtnData  = ( request === null ) ? 'recent' : request ;
    
    if ( request === null || request === 'recent' ){
      var $recentMedia = $apiRequest + accessID + '/media/recent' + $requestCount; 
          // Load Recent Media
          ajaxRequest( $recentMedia, targetElement );
    }
    
    if ( request === 'liked' ){
      var $likedMedia = $apiRequest + 'self/media/liked' + $requestCount;
          // Load Liked Media
          ajaxRequest( $likedMedia, targetElement );
    }

    if ( request === 'feed' ){
      var $feedMedia = $apiRequest + 'self/feed' + $requestCount;
          // Load User Feed
          ajaxRequest( $feedMedia, targetElement );
    }
        
    renderHTML( targetElement, loadBtnData, pager );
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
        requestData( option.show, option.count, option.accessId, option.accessToken, element, option.pager );
      }
    });  //*! end return this.each;
  };     //*! end $.fn.pongstagrm;
   
  // Pongstagram Default Options
  $.fn.pongstgrm.defaults = {

    // User Authentication
    accessId     : null,  // instsagram user-id
    accessToken  : null,  // instagram access-token

    // Display options
    show         : null,  // string,  options: 'recent', 'feed', 'liked', 'user'
    count        : null,  // integer, options: 1(min) - 40(max), instagram limits the maximum number of photos to 40
    resolution   : null,  // string,  options: 'low_resolution', 'standard_resolution'
    pager        : null   // boolean, options:  true or false (enables/disable load more button)
    
  };
   
 })(jQuery, window, document);