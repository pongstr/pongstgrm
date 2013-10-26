/*! Jekyll Project JS */
$(window).load(function(){
  
  "use strict";

  // Sticky Navbar
  // =============
  $('.sticky').affix();

  // Smooth scroll for internal links
  // ================================
  $('#sidebar a[href^="#"]').on('click',function (e) {
    e.preventDefault();
    var target = this.hash,
       $target = $(target);
       
    $('html, body').stop().animate({
        'scrollTop': $target.offset().top  - 10
    }, { duration: 1250, easing: 'easeInOutExpo'}, function () {
        window.location.hash = target;
        return false;
    });

    // Sub-Pages Navigation
    // ====================
    if ( $('#sidebar a').length > 0 ){
      $('#sidebar a').removeClass('active');
      $(this).addClass('active');
    } 
  });
  
  // Enable Tooltip for Substitue Nav
  // ================================
  $('.substitute-btn a').each(function(){
    $(this).hover(function(){
      $(this).tooltip('show');
    });
  });
  
  
  // Load Instagram Stuff
  // ====================
  // To use this function, the variable target should be the same
  // as your selector i.e., <div id="<target>"> and the variable
  // showValue is the number of media you would like to show i.e., 8
  function loadGram( target, showValue ){
    var usr = '39666111',
        tkn = usr + '.1fb234f.c3901000b4944a549fd5fd2310c63780',
        tgt = '#' + target;
    
    if ( $(tgt).length > 0 ){
      $(tgt).pongstgrm({
        accessId    : usr,
        accessToken : tkn,
        show        : target,
        count       : showValue,
        pager       : true
      });
    }
    
    $('[data-paginate="' + target + '"]')
      .removeClass('btn-success')
      .addClass('btn-danger text-center');
  }
  
  loadGram( 'recent', 4 );
  loadGram( 'liked',  4 );
  loadGram( 'feed',  4 );

  $('#tags').pongstgrm({
    accessId: "39666111",
    accessToken: "39666111.1fb234f.c3901000b4944a549fd5fd2310c63780",
    show: 'ios7',
    count: 4
  })

}); /*! end window.load */

  
// Hide iOS/Android address bar after page loads
// =============================================
if (navigator.userAgent.match(/(iPod|iPhone|iPad)/) ){  
  window.addEventListener("load",function() {
    "use strict";
    setTimeout(function(){
      window.scrollTo(0, 0);
    }, 0);
  });
}