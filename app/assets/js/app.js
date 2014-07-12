+function ($) {
  function Pongstr (option) {
  /*! Although I've created a application test account on instagram,
   * I'd like to ask nicely that you use your own access id and token
   * and use your own media/feed from you or the the people you follow.
   *
   * I'd really appreciate that! Thank you!
   *
   */
    var userid   = '679256982'
    var usrtoken = '679256982.401c5ac.0a183542db5f4ae1b51caae21acadc1e'

    $(option.target).pongstgrm({
        accessId:         userid
      , accessToken:      usrtoken
      , show:             option.show
      , count:            option.count
      , profile_bg_img:   'http://pongstr.github.io/pongstagr.am/assets/img/img.jpg'
      , profile_bg_color: '#4F405F'
    })

  }

  // Pongstr({ target: '#profile', show: 'profile' })
  // Pongstr({ target: '#recent',  show: 'recent',   count: 4 })
  // Pongstr({ target: '#likes' ,  show: 'liked' ,   count: 4 })
  // Pongstr({ target: '#feed'  ,  show: 'feed'  ,   count: 4 })
  Pongstr({ target: '#feed'  ,  show: 'nofilter', count: 2 })

}(window.jQuery);
