Pongstagr.am - Instagram Plugin
==============================================
by Pongstr [twiz.tickler@gmail.com | www.pongstr.com ]
Free to use, Code license under Apache v2.0
http://www.apache.org/licenses/LICENSE-2.0

## Plugin Requirements

  1. jQuery 1.9+
  2. bootstrap-modal.js (or bootstrap.js || bootstrap.min.js )

## Usage:

  1. User ID - If you have zero idea what your user id is, you may head to this 
     link: http://jelled.com/instagram/lookup-user-id 
  
  2. Access Token - If you have zero idea what your access token is, you may head to this
     link: http://jelled.com/instagram/access-token make sure you follow the instructions 
     on the " How do I get my client id?" link. 

 ```jQuery``` ***must be initialised first and so as*** ```bootstrap-modal.js``` plugin:

  ```html
  <script src='//ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js'></script>
  <script src='path/to/js/bootstrap.min.js'></script>  
  <script src='path/to/js/pongstagr.am.js'></script>  
  ```

  Display recently uploaded media (displays 8 images):
  
  ```html
  $('div#selector').pongstgrm({
      accessId     : YourAccessID,
      accessToken  : YourAccessToken
  });
  ```
  
  ***Other options:***
  ```html
  show       : null,    // string,  options: 'recent', 'feed', 'liked', 'user'
  count      : null,    // integer, options: 1(min) - 40(max), instagram limits the maximum number of photos to 40
  pager      : null     // boolean, options:  true or false (enables/disable load more button)
  ```
  
  ***Usage Example:***

  ```html
  <script src='//ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js'></script>
  <script src='path/to/js/bootstrap-modal.js'></script>  
  <script src='path/to/js/pongstagr.am.js'></script>
  
  <script>
    $(document).ready(function(){
      
      $('selectore').pongstgrm({
        accessId    : YourAccessID,
        accessToken : YourAccessToken,
        show        : 'liked',
        count       : 8,
        pager       : true
      });
      
    });
  </script>
  ```

  ***Some Notes:***
  
  In order to add the nice smooth transitions to the modal boxes, you may add
  ```bootstrap-transition.js``` before ```bootstrap-modal.js``` or you may just
  use the entire plugin included in Bootstrap v2.3.2 by replacing it with 
  ```bootstrap.js or bootstrap.min.js```