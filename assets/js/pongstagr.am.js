/*! Pongstagr.am - jQuery Instagram Plugin v1.0
 *  by Pongstr [twiz.tickler@gmail.com | www.pongstr.com ]
 *  Free to use under the MIT license.
 *  http://www.opensource.org/licenses/mit-license.php
 *
 *  Special Thanks to: 
 *    - GAPiangco          [ http://www.gapiangco.com/ ]
 *    - Benjamin Bjurstrom [ http://jelled.com/ ]
 */

(function($){

  /*! jQuery Reveal Plugin 1.0  www.ZURB.com
   * Copyright 2010, ZURB Free to use under the MIT license.
   * http://www.opensource.org/licenses/mit-license.php */  
  (function(e){e("a[data-reveal-id]").live("click",function(t){t.preventDefault();var n=e(this).attr("data-reveal-id");e("#"+n).reveal(e(this).data())});e.fn.reveal=function(t){var n={animation:"fadeAndPop",animationspeed:300,closeonbackgroundclick:true,dismissmodalclass:"close-reveal-modal"};var t=e.extend({},n,t);return this.each(function(){function a(){s=false}function f(){s=true}var n=e(this),r=parseInt(n.css("top")),i=n.height()+r,s=false,o=e(".reveal-modal-bg");if(o.length==0){o=e('<div class="reveal-modal-bg" />').insertAfter(n)}n.bind("reveal:open",function(){o.unbind("click.modalEvent");e("."+t.dismissmodalclass).unbind("click.modalEvent");if(!s){f();if(t.animation=="fadeAndPop"){n.css({top:e(document).scrollTop()-i,opacity:0,visibility:"visible"});o.fadeIn(t.animationspeed/2);n.delay(t.animationspeed/2).animate({top:e(document).scrollTop()+r+"px",opacity:1},t.animationspeed,a())}if(t.animation=="fade"){n.css({opacity:0,visibility:"visible",top:e(document).scrollTop()+r});o.fadeIn(t.animationspeed/2);n.delay(t.animationspeed/2).animate({opacity:1},t.animationspeed,a())}if(t.animation=="none"){n.css({visibility:"visible",top:e(document).scrollTop()+r});o.css({display:"block"});a()}}n.unbind("reveal:open")});n.bind("reveal:close",function(){if(!s){f();if(t.animation=="fadeAndPop"){o.delay(t.animationspeed).fadeOut(t.animationspeed);n.animate({top:e(document).scrollTop()-i+"px",opacity:0},t.animationspeed/2,function(){n.css({top:r,opacity:1,visibility:"hidden"});a()})}if(t.animation=="fade"){o.delay(t.animationspeed).fadeOut(t.animationspeed);n.animate({opacity:0},t.animationspeed,function(){n.css({opacity:1,visibility:"hidden",top:r});a()})}if(t.animation=="none"){n.css({visibility:"hidden",top:r});o.css({display:"none"})}}n.unbind("reveal:close")});n.trigger("reveal:open");var u=e("."+t.dismissmodalclass).bind("click.modalEvent",function(){n.trigger("reveal:close")});if(t.closeonbackgroundclick){o.css({cursor:"pointer"});o.bind("click.modalEvent",function(){n.trigger("reveal:close")})}e("body").keyup(function(e){if(e.which===27){n.trigger("reveal:close")}})})}})(jQuery)  

})(this.jQuery);

/*! Begin Pongstagr.am Plugin */
$(window).load(function(){


 /* ENTER YOUR USER ID HERE 
  * =====================================================================
  *
  * If you have zero idea what your user id is, you may head to this link
  * http://jelled.com/instagram/lookup-user-id 
  *
  */
  user_id       = "39666111";


 /* ENTER YOU USER ID HERE 
  * =====================================================================
  * 
  * If you have zero idea what your access token is, you may head to this
  * link: http://jelled.com/instagram/access-token make sure you follow 
  * the instructions on the " How do I get my client id?" link.
  *
  */
  access_token = "39666111.1fb234f.c3901000b4944a549fd5fd2310c63780";


  /* ENTER DISPLAY COUNT
   * =====================================================================
   * 
   * How many pictures would you like to show? This depends on how many
   * pictures you have in your instagram account.
   *
   */
  display_count = "200"; 


  /* TARGET PLACEHOLDER 
   * =====================================================================
   *  
   * This is the Target selector of your div in your html where the images 
   * will appear. You must include the '#' or '.' before the selector name.
   * 
   */
  placeholder = "#instagram";


  /* IMAGE CONTAINER CSS CLASS 
   * =====================================================================
   * 
   * This is the selector where each image and image info will be placed
   * this must be a pseudo selector ( it will be a wrong markup if it was 
   * an ID selector), No need to include the '.' at the beginning of the
   * selector name.
   *
   */
  divClass = "imageBlock";


  /* DISPLAY USER INFORMATION 
   * =====================================================================
   *
   * You may decide whether you want to display your Instagram profile 
   * info or not by setting the value to 'True' or 'False'.
   *
   */
  displayUserInfo = true;


  /* NO NEED TO EDIT BEYOND THIS LINE
   * =====================================================================
   * 
   * Unless of course you know what you're doing and would actually want
   * to modify how things are being displayed or presented, You are more 
   * than welcome to do so.
   *
   */

  /*! 'displayUserInfo' Condition: if this is set to 'True', we will display your
   *   User information and details. */
  if ( displayUserInfo == true ) {
    var instagramUser = "https://api.instagram.com/v1/users/" + user_id + "/?access_token=" + access_token ;

    $.ajax({
      type     : "GET",
      dataType : "jsonp",
      cache    : true,
      url      : instagramUser,
      success  : function(data){

        instagram = data.data; 

        for ( var i in instagram.counts ){
           countMedia      = "<h4>" + instagram.counts.media + "<small>Photos</small></h4>";
           countFollowers  = "<h4>" + instagram.counts.followed_by + "<small>Followers</small></h4>";
           countFollows    = "<h4>" + instagram.counts.follows + "<small>Following</small></h4>";
        }

        userInfo  = "<div id='userDetails'>";
        userInfo += "<div class='wrapper'>";
        userInfo += "<div class='userProfileImg'><img src='" + instagram.profile_picture + "' alt='http://www.instagram.com/" + instagram.username + "'></div>";
        userInfo += "<h1>"  + instagram.username + "</h1>";
        userInfo += "<p><strong>" + instagram.full_name + "</strong> " + instagram.bio + " <a href='" + instagram.website + "' title='" + instagram.website + "'>" + instagram.website + "/</a></p>"
        userInfo += countMedia + countFollowers + countFollows ;
        userInfo += "</div>";

        $( userInfo ).insertBefore( placeholder );

      } /*!  end $.ajax success here.            */
    }); /*!  end $.ajax here.                    */
  }     /*! end 'displayUserInfo' condition here */


  /* Request JSON Data from Instagram */
  var instagramMedia = "https://api.instagram.com/v1/users/" + user_id + "/media/recent/?count=" + display_count +"&access_token=" + access_token;


  /* We fetch and iterate through this data using $.ajax method */
  $.ajax({
    type     : "GET",
    dataType : "jsonp",
    cache    : true,
    url      : instagramMedia,
    success  : function(data){

      /*! Begin 'for' loop here, remember the 'display_count' variable sets the
       *  number of image and image-info that will be displayed.
       */
      for ( var i = 0; i < display_count; i++ ){

      /* 'instagram' : Set data source prefix */
      var instagram = data.data[i];

          /* 'caption' : Often when captions are empty, console displays an
           * error and the script stops working, we then create a condition
           * so that if it's null, it'll continue rendering other stuff. */
          caption  = (instagram.caption) ? instagram.caption.text : "";


          /* Build the Image and Image Links html */
          images  = "<div class='" + divClass +"'>";
          images += "<a href='#' data-reveal-id='" + instagram.id + "'>";
          images += "<img src='" + instagram.images.thumbnail.url + "'/>";
          images += "<span>";
          images += "<i class='icon-thumbs-up'></i>&nbsp; <strong>" + instagram.likes.count +" Likes</strong> &nbsp;";
          images += "<i class='icon-chat'></i>&nbsp; <strong>" + instagram.comments.count + "</strong>";
          images += "</span> <br />";
          images += "</a></div>";



          /* Now we append the 'images' html inside the placeholder */
          $( placeholder ).append( images );



          /* Build the Big-Image Modal window using Zurb's Reveal html markup. */
          revealModal  = "<div class='visuallyhidden'>";
          revealModal += "<div id='" + instagram.id + "' class='reveal-modal medium'>";
          revealModal += "<h3 class='heading'>" + instagram.user.username + "&#39;s Instagram Feed</h3>";
          revealModal += "<img src='" +  instagram.images.low_resolution.url  + "' alt='" + caption +"' />";
          revealModal += "<p><span><i class='icon-thumbs-up'></i>&nbsp; <strong>" + instagram.likes.count +" Likes</strong> &nbsp; <i class='icon-chat'></i>&nbsp; <strong>" + instagram.comments.count + " &nbsp; Comments</strong></span></p>";
          revealModal +=  caption;
          revealModal += "<h4><a href='" + instagram.link + "' title=' See it on Instagram '>" + instagram.link + "</a></h4>";
          revealModal += "<a class='close-reveal-modal'>&#215;</a>";
          revealModal += "</div><!--! end of .reveal-modal -->";
          revealModal += "</div><!--! end of .visuallyhidden -->";



          /* And then we add 'revealModal' to the 'placeholder' so jquery Reveal
           * may call it from the page. */
          $( 'body' ).append( revealModal );

      } /*!  end 'for' loop here.     */


      /* Programatically call for Reveal, for some reason it works without this
       * but just to be sure, I've added it in. I haven't really got time to test
       * this on IE browsers. */
      $( '#' + instagram.id ).click(function(e){
        e.preventDefault();
        $( '#' + instagram.id ).reveal();
      });

    }   /*!  end $.ajax success here. */
  });   /*!  end $.ajax here.         */

}); /*! End Pongstagr.am Plugin here */