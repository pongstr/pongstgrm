/*!
 * Pongstagr.am v2.0 - Instagram Plugin
 * Original author: @pongstr
 * Further changes, comments: @pongstr
 * Licensed under the MIT license
 */

;(function ( $, window, document, undefined ) {

  $.fn.pongstgrm = function( options ){
    // Plugin default options
    var options = $.extend({}, $.fn.pongstgrm.defaults, options );

    return this.each( function( i, element ){
      // Begin plugin actions here.
      
      // First off, user authentication needed,
      // validate user_id and access_token options.
      if ( options.user_id === null || options.access_token === null ){
          console.log(' \"user_id\"\ & \"access_token\" must be set to access Instagram API.');
        } else {
          load_content( options.display_type );
      } //*! end user authentication.    

      // Load specific content type function.
      function load_content( content_type ){
        // URL Constructor
        var display = content_type;
            api_url = 'https://api.instagram.com/v1/users/';
            
        switch ( display ){
          
          case 'recent_media':
            var check_count  = ( options.media_count != null ) ? "/media/recent?count=" + options.media_count + "&": "/media/recent?";
                recent_media = api_url + options.user_id + check_count + "access_token=" + options.access_token;
                console.log( recent_media );
            break;
            
          case 'user_profile':
            var user_profile = api_url + options.user_id + "/?access_token=" + options.access_token;
                ajx( user_profile );
            console.log( user_profile );
            break;
          
          case 'user_feed' : 
            var check_count = ( options.media_count != null ) ? "/self/feed?count=" + options.media_count + "&access_token=" + options.access_token: "/self/feed?access_token=" + options.access_token;
                user_feed   = api_url + check_count;
                ajx( user_feed );
            break;
          
          case 'user_liked_media':
            var check_count      = ( options.media_count != null ) ? "/self/media/liked?count=" + options.media_count + "&access_token=" + options.access_token : "/sefl/media/liked?access_token=" + options.access_token;
                user_liked_media = api_url + check_count;
                ajx( user_liked_media );
            break;
            
          default:
            var check_count  = ( options.media_count != null ) ? "/media/recent?count=" + options.media_count + "&": "/media/recent?";
                recent_media = api_url + options.user_id + check_count + "access_token=" + options.access_token;
                ajx( recent_media );
        }
      }
      // Ajax Request
      function ajx( api_request ){
        var request_url = api_request;
        $.ajax({
          method       : "GET"          ,
          url          : request_url    ,
          dataType     : "jsonp"        ,
          jsonp        : "callback"     ,
          jsonCallback : "jsonpcallback",
          success      : function(data){
            // Display the right loop for the right display type.
            if ( options.display_type !== 'user_profile' ){
                $.each( data.data, function( key, value){
                   $( element ).append( "<div class='three columns last'><a href='#'>" + value.user.username + "</a><br /><img class='instaImg' src='" + value.images.low_resolution.url + "' /></div>" );              
                });              
                // Pagination next url
                var next_page = data.pagination.next_url;
                // load more photos
                load_more( options.more_button, next_page );
              } else {
                // User Profile Data
                var user_info = data.data;

                // User Information
                var username  = user_info.username;
                    fullname  = user_info.full_name;
                    website   = user_info.webiste;
                    picture   = user_info.profile_picture;
                    biography = user_info.bio;

                // Media Counts
                var media     = user_info.counts.media;
                    followers = user_info.counts.followed_by;
                    following = user_info.counts.follows;
            }
          }          
        });
      }
      
      // Load more requests button
      function load_more( button_selector, pagination ){
        // Check if pagination is defined, if not disable button & exit.
        if ( pagination === undefined ){
            $( button_selector ).addClass('secondary').css({ cursor: 'default', opacity: '0.4' });
          } else { 
            $( button_selector ).click(function(event){
               ajx( pagination );
               $(this).unbind(event);
            });
        }
      }      
    });
  };
  
  // Default Options
  $.fn.pongstgrm.defaults = {
    // User Authentication
    user_id        : null,
    access_token   : null,
    
    // Display Option
    display_type   : null,
    media_count    : 4,
    more_button    : null,

    // Presentation
    img_resolution : null,
    modal_lightbox : null

  }

})( jQuery, window, document );