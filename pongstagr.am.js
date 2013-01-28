/*!
 * Pongstagr.am v2.0 - Instagram Plugin
 * 
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
      
      // First off, user authentication needed, validate 'user_id' and 'access_token' options.
      if ( options.user_id === null || options.access_token === null ){
          // !!! Console log error message !!!
          console.log(' \"user_id\"\ & \"access_token\" must be set to access Instagram API.');
        } else {   

          // Load Content
          load_content( options.show );
          
      } //*! end user authentication.    



      function load_content( content_type ){
        // Instagram API URL
        var api_url = 'https://api.instagram.com/v1/users/';
        
        // Append Button Function
        function add_ons(){
          var btn_id   = ( options.show == null ) ? "recent_media-btn" : options.show + "-btn";
              btn_html = "<div class='row pongstgrm-btn'><a href='javascript:void(0);' id='" + btn_id + "' class='four columns centered btn btn-success btn-large'>Load More Photos</a></div>";
          
          $(element).after( btn_html );
          
          var reveal  = "<div id='' class='reveal-modal large " + options.show +"-modal'>";
              reveal += "<div class='row'>";
              reveal += "<div class='six columns modal-image'></div>";
              reveal += "<div class='six columns modal-content'></div>";
              reveal += "</div>";
              reveal += "<a href='javascript:void(0);' class='close-reveal-modal'>&#215;</a></div>";
          
          $('body').append( reveal );
        }
        
        if ( content_type === null || content_type === 'recent'){

            // Load Recent Media
            var check_count = ( options.media_count != null ) ? "/media/recent?count=" + options.media_count + "&": "/media/recent?";
                endpoint    = api_url + options.user_id + check_count + "access_token=" + options.access_token;
            
            // Load Request
            ajx( endpoint );
            add_ons();

            return true;
            
          } else if ( content_type === 'user'){
            
            // Load User Information
            var endpoint = api_url + options.user_id + "/?access_token=" + options.access_token;
            
            // Load Request
            ajx( endpoint );            
            return true;
            
          } else if ( content_type === 'feed' ){
            
            // Load User Feed
            var check_count = ( options.media_count != null ) ? "/self/feed?count=" + options.media_count + "&access_token=" + options.access_token: "/self/feed?access_token=" + options.access_token;
                endpoint    = api_url + check_count;

            // Load Request
            ajx( endpoint );
            add_ons();

            return true;

          } else if ( content_type === 'liked' ){
            
            // Load User Liked Media
            var check_count = ( options.media_count != null ) ? "/self/media/liked?count=" + options.media_count + "&access_token=" + options.access_token : "/sefl/media/liked?access_token=" + options.access_token;
                endpoint    = api_url + check_count;

            // Load Request
            ajx( endpoint );
            add_ons();
            
            return true;
        }        
      } //*! end load_content

      function ajx( api_endpoint ){
        $.ajax({
          method       : "GET"          ,
          url          : api_endpoint    ,
          cache        : true           ,
          dataType     : "jsonp"        ,
          jsonp        : "callback"     ,
          jsonCallback : "jsonpcallback",
          success      : function(data){
            
            if ( options.show !== 'user_profile' ){

                // Iterate through api data
                $.each( data.data, function( key, value){
                  // Thumbnail Images and stats
                  var thumb_likes    = ( value.likes.count ) ? "<div class='six columns mobile-two alignleft'><i class='icon-heart'></i> &nbsp;<strong>" + value.likes.count + "</strong></div>" : "<div class='six columns mobile-two alignleft'><i class='icon-heart'></i> &nbsp;<strong>0</strong></div>";
                      thumb_comments = ( value.comments.count ) ? "<div class='six columns mobile-two alignright'><i class='icon-comment'></i> &nbsp;<strong>" + value.comments.count  + "</strong></div>" : "<div class='six columns mobile-two alignright'><i class='icon-comment'></i> &nbsp;<strong>0</strong></div>";
                      thumb_img      = ( value.images.low_resolution.url ) ? "<a href='javascript:void(0);' data-reveal-id='" + value.id + "' class='th'><img src='" + value.images.low_resolution.url + "' alt='' /><div class='stats'>" + thumb_likes + thumb_comments + "</div></a>" : "";
                  
                  // User Feed | Media Liked : Show media owner
                  var media_user = ( options.show !== 'recent_media') ? "<div class='twelve columns user'><i class='icon-user'></i> &nbsp;<strong>" + value.user.username + "</strong></div>" : "";

                  // Thumbnail Block
                  var thumblock  = "<div class='three mobile-two columns'>";
                      thumblock += media_user;
                      thumblock += thumb_img;
                      thumblock += "</div><!-- end of .three.columns -->";
                       
                  // Append Thumbnail Block
                  $( element ).append( thumblock );
                  
                  $('[data-reveal-id="'+ value.id +'"]').click(function(){
                    $('.' + options.show + '-modal' ).attr('id', value.id );
                    // Captions Check
                    caption = ( value.caption != null ) ? (value.caption.text != null ) ? "<h4>" + value.caption.text + "</h4><hr />" : "<h4>" + value.username + "</h4><hr />" : "";
                                      
                    // Modal Image Block
                    var imageblock    = "<img src='" + value.images.standard_resolution.url + "' alt='' width='"+ value.images.standard_resolution.width +"' height='"+ value.images.standard_resolution.height +"' />";
                        contentblock  =  "<div class='row'><div class='twelve columns'>" + caption + "</div></div>";
                        contentblock += "<div class='row'>" + thumb_likes + thumb_comments + "</div>";

                    $('#' + value.id ).reveal({
                      animationSpeed: 200,
                      closeOnBackgroundClick: false,
                      dismissModalClass: 'close-reveal-modal',
                      open: function(){
                        $('.' + options.show + '-modal .modal-content').append( contentblock );
                        $('.' + options.show + '-modal .modal-image').append( imageblock );                        
                      },
                      close: function(){
                        $('.modal-content, .modal-image').empty();
                      }
                    });
                    
                  });
                  
                  $('.close-reveal-modal').click(function(){
                    $('.modal-content, .modal-image').empty();
                  });

                });

                // Pagination next url
                var next_page = data.pagination.next_url;
                    next_btn  = ( options.show == null ) ? "recent_media-btn" : options.show + "-btn";
                
                // Load more media when button is clicked
                load_more( next_btn, next_page );
                
                // Slide comment/likes up and down
                $('.th').hover(function(){
                  $('.stats', this).show().animate({ position: 'absolute', left: '0', bottom: '5px'}, 150);
                }, function(){
                  $('.stats', this).animate({ position: 'absolute', left: '0', bottom: '-50px'}, 150).hide();
                });
                
                //
                

              } else {
                var user_info = data.data;
                // Load
                console.log( user_info.username + '\'s Profile Information');
            }
          }          
        });
      }
      
      // Load more requests button
      function load_more( button_selector, pagination ){
        // Check if pagination is defined, if not disable button & exit.
        if ( pagination === undefined ){
            $( '#' + button_selector ).removeClass('btn-success').css({ cursor: 'default', opacity: '0.3', boxShadow: 'none' });
          } else { 
            $( '#' + button_selector ).click(function(event){
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
    show        : null,
    media_count : 4
  }

})( jQuery, window, document );
