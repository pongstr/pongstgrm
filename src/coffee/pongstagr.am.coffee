do ->
  'use strict'

  Pongstagram = (element, options) ->
    this.element = if element then element else '<div/>'
    this.options = $.extend {}, Pongstagram.DEFAULT, options
    this.instgrm = 'https://api.instagram.com/v1'
    this.authenticate()
    return this

  Pongstagram.VERSION = '0.1.0'
  Pongstagram.DEFAULT = {
    # User Authentication
    accessId:     undefined   # {String}: Access ID acquired from Instagram.
    accessToken:  undefined   # {String}: Access token acquired from Instagram.

    # Display Options
    show:         'recent'    # {String}: possible options are feed, likes, media, profile and tag.
    count:        5           # {Number}: default number of media to be displayed.
    likes:        true        # {Boolean}: show/hide likes count.
    comments:     true        # {Boolean}: show/hide comments
    timestamp:    true        # {Boolean}: show/hide media timestamp.
    flexbox:      true        # {Boolean|String}: if true/false

    # Plugin Components
    avatar_size:  64          # {String}: profile picture dimensions in square format e.g., (128 == 128x128 pixels)
    cover_photho: undefined   # {String}: valid image uri
  }



  # Kicstart the Plugin
  Pongstagram.prototype.start = () ->
    that    = this
    baseUrl = '/users/'
    mediaFn = {}

    flex = if typeof @options.flexbox == 'boolean' then 'flexbox' else @options.flexbox

    getMedia = (endpoint, callback) ->
      $.get endpoint, ((data) ->
        if that.mode == 'profile'
          console.log that.mode, data
          return callback and callback(data)

        if that.mode == 'tag'
          console.log that.mode, data
          return callback and callback(data)

        if that.mode == 'gallery'
          console.log that.mode, data
          return callback and callback(data)
      ), 'jsonp'

    mediaFn.recent = () ->
      that.mode = 'gallery'
      baseUrl += "self/media/recent?" + $.param
        count: that.options.count
        access_token: that.options.accessToken

      getMedia "#{that.instgrm}#{baseUrl}", (data) ->
        $(that.element).append "<pre>#{JSON.stringify data.data, null, 2}</pre>"

    $(@element).addClass "pongstagram #{flex}"
    mediaFn[that.options.show] and mediaFn[that.options.show]()

  # Authenticate to Instagram
  Pongstagram.prototype.authenticate = () ->
    info = "%cInstagram Access ID and Token to access your media.
      You may access public media by using `{ show: \'tag-you-like\' }"

    if @options.accessId != undefined or @options.accessToken != undefined
      @start()
      return true
    else
      console.info info, 'color:green'
      return false

  # Plugin Definition
  $.fn.pongstgrm = (option) ->
    opt = $.extend {}, $.fn.pongstgrm.default, option
    i = 0
    while i < arguments.length
      if typeof arguments[i] == 'function'
        opt.callback = arguments[i]()
      if typeof arguments[i] == 'object'
        opt[arguments[i]]
      i++
    return this.each () ->
      new Pongstagram($(this)[0], opt)
      return

  # Plugin default Options
  $.fn.pongstgrm.options = Pongstagram.DEFAULT
  return
