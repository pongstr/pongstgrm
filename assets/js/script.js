// Enable Syntax Highlighter
SyntaxHighlighter.all();

// Script to get the project page working
$(window).load(function(){
 
 // Scroll through internal links
  $('.top-bar a[href^="#"]').bind('click.smoothscroll',function (e) {
    e.preventDefault();
    
    var location = $(this).attr('href');
    
    if ( location == '#'){ } else {
        var target = this.hash, $target = $(target);
        
        $('html, body').stop().animate({
            'scrollTop': $target.offset().top
          }, 200, 'swing', function () {
            window.location.hash = target;
        });
        $('.row').removeAttr('style');
        $(location).css({ paddingTop: '50px'})
    }
  });
      
       
  var insta_id = 39666111;
      insta_token = '39666111.1fb234f.c3901000b4944a549fd5fd2310c63780';
  
  // Demo Recent Media
  $('#recent-media').pongstgrm({
    user_id      : insta_id,
    access_token : insta_token,
    count: 8
  });
  
  // Demo User Feed
  $('#user-feed').pongstgrm({
    user_id      : insta_id,
    access_token : insta_token,
    show : 'feed',
    count: 5,
    pager: false
  });  
  
  // Demo User Likes
  $('#user-likes').pongstgrm({
    user_id      : insta_id,
    access_token : insta_token,
    show : 'liked',
    count: 4,
    resolution: 'low_resolution'
  });
  
    
});