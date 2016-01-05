do ->
  'use strict'

  Pongstgrm = (element, options) ->
    this.element = if element then element else '<div/>'
    this.options = $.extend {}, Pongstgrm.DEFAULT, options
    this.instgrm = 'https://api.instagram.com/v1'
    this.authenticate()
    return this

  Pongstgrm.VERSION = '0.1.0'
  Pongstgrm.DEFAULT = {
    # User Authentication
    accessId:     undefined   # {String}: Access ID acquired from Instagram.
    accessToken:  undefined   # {String}: Access token acquired from Instagram.

    # Display Options
    show:         'recent'    # {String}: possible options are liked, recent, profile and tag.
    count:        5           # {Number}: default number of media to be displayed.
    likes:        true        # {Boolean}: show/hide likes count.
    comments:     true        # {Boolean}: show/hide comments
    timestamp:    true        # {Boolean}: show/hide media timestamp.
    flexbox:      true        # {Boolean|String}: if true/false it uses the built-in flexbox in the css, otherwise it will use custom-styles set for that selector

    # Plugin Components
    avatar_size:  64          # {String}: profile picture dimensions in square format e.g., (128 == 128x128 pixels)
    cover_photho: undefined   # {String}: valid image uri
  }

  Pongstgrm.prototype.html = () ->
    that = this

    ###
    # @name thumb
    # @desc render thumbnail markup
    # @params context, is the media's metadata
    # @returns rendered HTML string that is injected to the plugin container
    ###
    @thumb = (context) ->
      likes_count = if context.likes.count >= 2 then 'Likes' else 'Like'
      likes_html  = that.options.likes and "
        <span class='pongstgrm-likes'>
          <i class='pongstgrm-icon-like'></i>&nbsp;
          <small>#{context.likes.count}</small>
        </span>"

      comments_count = if context.comments >= 2 then 'Comment' else 'Comments'
      comments_html  = that.options.comments and "
        <span class='pongstgrm-comments'>
          <i class='pongstgrm-icon-chat'></i>&nbsp;
          <small>#{context.comments.count}</small>
        </span>"

      video = if context.type == 'video' then "
        <span class='pongstgrm-item-video'>
          <i class='pongstgrm-icon-play'></i>
        </span>" else ""

      created = that.options.timestamp and "
        #{new Date(context.created_time * 1000).toDateString()}"

      return "
        <div class='pongstgrm-item'>
          <div class='pongstgrm-item-content'>
            <small class='pongstgrm-item-date'>#{created}</small>
            <img class='pongstgrm-img-responsive' alt=''
              src='#{context.images.low_resolution.url}'
              width='#{context.images.low_resolution.width}'
              height='#{context.images.low_resolution.height}'>#{video}
            <div class='pongstgrm-item-toolbar'>
              #{likes_html} &nbsp; &nbsp; #{comments_html}
            </div>
          </div>
        </div>"

    @modal = (context) ->
    @video = (context) ->
    return { @thumb, @modal, @video }

  # Kicstart the Plugin
  Pongstgrm.prototype.initialize = () ->
    that = this
    that.gallery  = {}
    that.instgrm += '/users/'
    flexbox = if typeof @options.flexbox == 'boolean' then 'flexbox' else @options.flexbox

    getMedia = (endpoint, callback) ->
      $.get endpoint, ((data) ->
        if that.mode == 'profile'
          return callback and callback(data)
        if that.mode == 'gallery'
          data.data.forEach (e, i, a) ->
            $(that.element).append that.html().thumb(e)
          return callback and callback(data)
      ), 'jsonp'

    ###
    # @name
    # @desc
    # @params
    # @returns
    ###
    @gallery.feed = () ->
      that.mode = 'gallery'
      that.instgrm += 'self/feed?' + $.param
        count: that.options.count
        access_token: that.options.access_token
      return getMedia "#{that.instgrm}", (data) ->
        return

    ###
    # @name Liked Media
    # @desc
    #   Get the list of recent media liked by the owner of the access_token.
    #   https://www.instagram.com/developer/endpoints/users/#get_users_feed_liked
    # @params
    #   - ACCESS_TOKEN:	A valid access token.
    #   - COUNT:	Count of media to return.
    #   - MAX_LIKE_ID:	Return media liked before this id.
    # @returns {String}
    #   an HTML string with the media context. The HTML is
    #   appended to the element container. $('#selector').pongstgrm()
    ###
    @gallery.liked = () ->
      that.mode     = 'gallery'
      that.instgrm += 'self/media/liked?' + $.param
        count: that.options.count
        access_token: that.options.accessToken
      return getMedia "#{that.instgrm}", (data) ->
        $(that.element).append "<pre>#{JSON.stringify data.data, null, 2}</pre>"
        return

    ###
    # @name
    # @desc
    # @params
    # @returns
    ###
    @gallery.profile = () ->
      that.mode     = 'profile'
      that.instgrm += "#{that.options.accessId}?" + $.param
        access_token: that.options.accessToken
      return getMedia "#{that.instgrm}", (data) ->
        $(that.element).append "<pre>#{JSON.stringify data.data, null, 2}</pre>"

    ###
    # @name Recent Media
    # @desc
    #   Get the most recent media published by the owner of the access_token
    #   https://www.instagram.com/developer/endpoints/users/#get_users_media_recent_self
    # @params
    #   - ACCESS_TOKEN: A valid access token
    #   - COUNT: Count of media to return
    #   - MIN_ID: (not used in this fn)
    #   - MAX_ID: (not used in this fn)
    # @returns {String}
    #   an HTML string with the media context. The HTML is
    #   appended to the element container. $('#selector').pongstgrm()
    ###
    @gallery.recent = () ->
      that.mode     = 'gallery'
      that.instgrm += 'self/media/recent?' + $.param
        count: that.options.count
        access_token: that.options.accessToken
      getMedia "#{that.instgrm}", (data) ->
        $(that.element).append "<pre>#{JSON.stringify data.data, null, 2}</pre>"



    $(@element).addClass "pongstgrm #{flexbox}"
    @gallery[that.options.show] and @gallery[that.options.show]()

  # Authenticate to Instagram
  Pongstgrm.prototype.authenticate = () ->
    if @options.accessId != undefined or @options.accessToken != undefined
      @initialize()
      return true
    else
      console.info "%cInstagram Access ID and Token to access your media.
        You may access public media by using `{ show: \'tag-you-like\' }", 'color:green'
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
      new Pongstgrm($(this)[0], opt)
      return

  # Plugin default Options
  $.fn.pongstgrm.options = Pongstgrm.DEFAULT
  return
