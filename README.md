Pongstagr.am - jQuery Instagram Plugin v2.0.33
==============================================
by Pongstr [twiz.tickler@gmail.com | www.pongstr.com ]
Free to use, Code license under Apache v2.0
http://www.apache.org/licenses/LICENSE-2.0

Pongstagr.am is a jQuery plugin that lets you display your Instagram photos to your website.

## Requirements: Instagram Authentication
For the most part, Instagram's API only requires the use of a client_id. A client_id simply associates your server, script, or program with a specific application. However, some requests require authentication - specifically requests made on behalf of a user. Authenticated requests require an access_token. These tokens are unique to a user and should be stored securely. Access tokens may expire at any time in the future. more here: http://instagram.com/developer/authentication/
  
  1. jQuery 1.8+, the plugin should also work with 1.4+ but it's not tested.
  
  2. Zurb's Reveal Modal Plugin to display Image details, comments and likes when
     a thumbnail is clicked. Pongstagr.am works best if you are using Zurb's 
     Foundation front-end framework. Get it here: http://foundation.zurb.com/ 
  
  3. User ID - If you have zero idea what your user id is, you may head to this 
     link:http://jelled.com/instagram/lookup-user-id 
  
  4. Access Token - If you have zero idea what your access token is, you may head to this
     link: http://jelled.com/instagram/access-token make sure you follow the instructions 
     on the " How do I get my client id?" link. 
       
## How to use the plugin. Super easy, here's how:

### jQuery must be initialised first and so as the plugin:

    <script src='//ajax.googleapis.com/ajax/libs/jquery/1.8.3/jquery.min.js'></script>
    <script src='path/to/js/foundation.reveal.js'></script>
    <script src='path/to/js/pongstagr.am.js'></script>
      
and that's it! all we need now is a call to the plugin, you may continue reading :)

    $('div#selector').pongstgrm({
       user_id      : 'your_user_id_goes_here',
       access_token : 'your.access.token.goes.here'
    });

this vanilla call to the plugin will display the recent media you've uploaded.

      
    $('div#selector').pongstgrm({
      user_id      : insta_id,
      access_token : insta_token,
      show         : 'feed'       // options: 'recent', 'feed' or  'liked'
    }); 
  
this call will display your instagram feed, these are the images that
had been uploaded by the people you are following.

the available options are: 'recent', 'feed' or 'liked'.
 * recent: displays your recent instagram media.
 * feed  : displays the media uploaded by the people you follow.
 * liked : displays the media you liked.

## More Options

  * count - is an integer value, options range from 1(minimum value) to 40(maximum value),
            by default, instagram only lets you display 40 photos, you may use the 'pager'
            option to enable pagination or the 'load more' button.
            
  * resoultion - is a string value, it lets you choose the big image's resolution 
                 if this option is not set, it displays the standard resolution. available options are: 
                 'low_resoulution' which is 306 x 306 (width x height)
                 'standard_resolution' which is 612 x 612 (width x height)
                 
  * pager - true or false value. enable/disable the button that paginates or loads
            more images that were uploaded by you or the people you are following.
            
## Example of the plugin's full use:

    $('div#selector').pongstgrm({
       user_id      : 'your_user_id_goes_here',
       access_token : 'your.access.token.goes.here',
       show         : 12,
       resolution   : 'standard_resolution',
       pager        : true
    });
    
unfortunately, you'll have to declare your user_id and access_token everytime
you call on the plugin. This plugin is open-sourced so if you'd like to make
improvements you may do so by forking it here. :)