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
   
   $.fn.pongstgrm = function(options){
      // Plugin Options
      var options  = $.extend({}, $.fn.pongstgrm.defaults, options); 
      
      return this.each(function(i, element){
        
         // Do not execute anything unless user_id and access_token is set to 
         // access Instagram API. Otherwise, let's begin with the action.         
         if (options.user_id === null || options.access_token === null ){          
            console.log('\"user_id & \"access_token\" must be sett to access instagram api.');
           } else {
            load_content(options.show);          
         }
         
         // The load content function decides which request to send to send
         // to instagram. Inside this function also adds appends a button 
         function load_content(content_type){

            // Enable/Disable Load more buttons to load more images.
            if ( options.pager == true || options.pager === null ){ add_ons(true, true); } else { add_ons( false, true); }


            // Construct URL
            function url(count_url){
               // api_url: base url request to access Instagram API.
               var api_url = 'https://api.instagram.com/v1/users/';
               
               // check_count reconstructs url when options.count is null or not set
               var check_count = (options.count != null) ? count_url + "?count=" + options.count + "&access_token=" + options.access_token : "?access_token=" + options.access_token; 
              
               // endpoint: is final request url constructed.
               var endpoint_url = api_url + check_count;
               
               // Once the appropriate endpoint is constructed, 
               // ajax_request function 
               ajx_request(endpoint_url);      
            }

            // this statement tells the plugin which type of media to display.
            // the options include user's recent media, profile information,
            // user's feed (photos from friends) and user's liked media.
            if (content_type === null || content_type ==='recent'){
              
                // Request to display User's recent media.
                url(options.user_id + '/media/recent');
                
              } else if (content_type === 'feed'){
                
                // Request to display User's media feed.
                url('/self/feed');
                
              } else if (content_type === 'liked'){
                
                // Request to display User's liked media.
                url('/self/media/liked');
                
              } else if (content_type === 'profile'){
              
            }

         }
         
         // ajx_request function does all ajax request and loads user's
         // instagram media.
         function ajx_request(endpoint){
          $.ajax({
            method   : "GET"    ,
            url      : endpoint ,
            cache    : true     ,
            dataType : "jsonp"  ,
            success  : function(data){
              // Call on to thumbnails function.
              thumbnails(data.data);
              
              // Load more images on to next page url
              paginate(data.pagination.next_url);
            }
          });
         }
         
        // paginate function: gives load more button access to next pages.
        function paginate(pagination){
          var selector = (options.show != null) ? "#" + options.show + "-btn" : "#recent_media-btn";
          // Check if next page is available, if not disable button & exit.
          if (pagination === undefined){
            $('a[id="'+ options.show +'-btn"]').removeClass('btn-success').css({ cursor: 'default', opacity: '0.3', boxShadow: 'none' });
          } else {
            $(selector).click(function(event){
              ajx_request(pagination);
              $(this).unbind(event);
            });
          }
        }
        
        // add_ons function writes the button and the reveal modal plugin. 
        function add_ons(button, reveal){
          if ( button === true ){
          // btn_id variable defaults to 'recent_media-btn' if 
          // show option is not set. btn_html is the markup that is 
          // appended after the plug ins selector.
          var btn_id   = ( options.show === null ) ? "recent_media-btn" : options.show + "-btn";
              btn_html = "<div class='twelve mobile-four columns pongstgrm-btn'><a href='javascript:void(0);' id='" + btn_id + "' class='four columns centered button large success radius'>Load More Photos</a></div>";
          
          // Append btn_html markup after the plugins' selector.
          
            $(element).after(btn_html);
          }
          
          // media prefix for modal container
          var media = (options.show === null ) ? "recent-modal" : options.show + "-modal";
          if ( reveal === true ){
          // reveal varaible is the modal container that is fired when
          // the image thumbnail is clicked. this markup heavily depends
          // on the reveal plugin and its stylesheets.        
          var reveal  = "<div id='' class='reveal-modal large " + media +"'>   \
                         <div class='row'>                                     \
                         <div class='six columns modal-image'></div>           \
                         <div class='six columns modal-content'></div>         \
                         </div>                                                \
                         <a href='javascript:void(0);' class='close-reveal-modal'>&#215;</a></div>";
          
          // Append reveal markup to the document's body.
          
            $('body').append(reveal);
          }
        }
        
        // thumbnails
        function thumbnails(source){              
          if (options.show !== 'user' || options.show === 'recent'){
            // Show User's media, feed and likeds here.
              $.each(source, function(key, value){
                
                // Check caption if its null or empty before displaying it.
                var caption    = ( value.caption != null ) ? (value.caption.text != null ) ? "<h4>" + value.caption.text + "</h4><hr />" : "" : "<h4>@" +  value.user.username + "</h4><hr />";
                    captiontxt = ( value.caption != null ) ? (value.caption.text != null ) ? value.caption.text : "" : "@" +  value.user.username;
                
                // Thumbnail element variables
                // likes: shows how many times the media has been liked.
                // comments: shows how many comments the media has.
                // thumbnail: shows the image thumbnail
                var likes     = (value.likes.count) ? "<div class='six columns mobile-two alignleft'><i class='icon-heart'></i> &nbsp;<strong>" + value.likes.count + "</strong></div>" : "<div class='six columns mobile-two alignleft'><i class='icon-heart'></i> &nbsp;<strong>0</strong></div>";
                    comments  = (value.comments.count) ? "<div class='six columns mobile-two alignright'><i class='icon-comment'></i> &nbsp;<strong>" + value.comments.count  + "</strong></div>" : "<div class='six columns mobile-two alignright'><i class='icon-comment'></i> &nbsp;<strong>0</strong></div>";
                    thumbnail = (value.images.low_resolution.url) ? "<a href='javascript:void(0);' data-reveal-id='" + value.id + "' title='" + captiontxt + "' class='th'><img src='" + value.images.low_resolution.url + "' alt='' /><div class='stats'>" + likes + comments + "</div></a>" : "";
                      
                // media_user: shows media owner for 'User Feed' and 'Liked Media'
                var media_user  = (options.show === 'recent' || options.show === null) ? "" : "<div class='twelve columns user'><i class='icon-user'></i> &nbsp;<strong>" + value.user.username + "</strong></div>";
                    
                // Thumbnail Block
                var thumbblock  = "<div class='three mobile-two columns'>      \
                                    " + media_user + thumbnail + "             \
                                   </div>"; 
                    
                // Append Thumbnail block to plugin's selector.
                $(element).append(thumbblock);

                // Fire Reveal Modal Window
                $('[data-reveal-id="'+ value.id +'"]').click(function(){
                  // Modal selector class 
                  var modal_class = (options.show === null ) ? "recent-modal" : options.show + "-modal";
                      media_owner = "<p><a href='http://www.instagram.com/" + value.user.username + "/'><strong>@" + value.user.username + "</strong></a></p>";
                  // imageblock: block of html for the big image
                  // this condition switches the image resolution from
                  // low_resolution to standard_resolution
                  if (options.resolution === null || options.resolution === 'standard_resolution'){
                      var imageblock = "<img src='" + value.images.standard_resolution.url + "'alt='" + captiontxt + "' width='"+ value.images.standard_resolution.width +"' height='"+ value.images.standard_resolution.height +"' />" + media_owner;
                    } else if ( options.resolution === 'low_resolution'){
                      var imageblock = "<img src='" + value.images.low_resolution.url + "' alt='" + captiontxt + "' width='"+ value.images.low_resolution.width +"' height='"+ value.images.low_resolution.height +"' />" + media_owner;
                  }
                  
                  // Modal contents
                  // !!!todo: separate html markup from data.
                  var contentblock  = "<div class='row'><div class='twelve columns'>" + caption + "</div></div> \
                                       <div class='row'>" + likes + "<div class='six mobile-two columns alignright'><i class='icon-comment'></i> &nbsp;<strong>" + value.comments.count + "</strong></div>" + "</div><br />";
                  
                  // inject the image id to corresponding media's modal container.
                  $('.' + modal_class).attr('id', value.id);
                  
                  // Reveal plugin
                  $('[id="' + value.id + '"]').reveal({
                    animationSpeed: 200,
                    closeOnBackgroundClick: true,
                    dismissModalClass: 'close-reveal-modal',
                    open: function(){
                      // Inject contents to reveal modal.
                      $('.' + modal_class + ' .modal-content').append(contentblock);
                      $('.' + modal_class + ' .modal-image').append(imageblock);
                      
                      $.each( value.comments.data, function( group, key ){
                        // Comments html markup
                        var commentblock  = "<div class='row'>";
                            commentblock += "<div class='twelve  mobile-four columns'>";
                            commentblock += "<div class='two mobile-one columns'><a href='http://www.instagram.com/" + key.from.username + "' title='@" + key.from.username + "'><img src='" +  key.from.profile_picture + "' alt='" +  key.from.username + "'  /></a></div>";
                            commentblock += "<div class='ten mobile-three columns'>";
                            commentblock += "<strong><a href='http://www.instagram.com/" + key.from.username + "' title='@" + key.from.username + "'>" + key.from.username + "</a></strong>";
                            commentblock += "<p>" + key.text + "</p><hr />";
                            commentblock += "</div>";
                            commentblock += "</div></div>";
                        
                        // Inject comments block markup to reveal modal.
                        $('.' + modal_class + ' .modal-content').append(commentblock);
                      });
                    },
                    close: function(){
                      // Empty reveal modal's content container.
                      $('.modal-content, .modal-image').empty();
                    }
                  });

                      $('.close-reveal-modal').click(function(){
                        $('.modal-content, .modal-image').empty();
                      });
                  
                });
              
              });

              // Hover slide effects to show thumbnail's likes and comments.
              $('.th').hover(function(){
                  $('.stats', this).show().animate({ position: 'absolute', left: '0', bottom: '5px'}, 150);
                }, function(){
                  $('.stats', this).animate({ position: 'absolute', left: '0', bottom: '-50px'}, 150).hide();
              });
            } else {
            // Show User profile information here
          }
        }       
      }); //*! end return this.each;
   };     //*! end $.fn.pongstagrm;
   
   // Pongstagram Default Options
   $.fn.pongstgrm.defaults = {
    
    // User Authentication
    user_id      : null,  // instsagram user-id
    access_token : null,  // instagram access-token
    
    // Display options
    show      : null,    // string,  options: 'recent', 'feed', 'liked', 'user'
    count     : null,    // integer, options: 1(min) - 40(max), instagram limits the maximum number of photos to 40
    resolution: null,    // string,  options: 'low_resolution', 'standard_resolution'
    pager     : null     // boolean, options:  true or false (enables/disable load more button)
    
   }
   
 })(jQuery, window, document);