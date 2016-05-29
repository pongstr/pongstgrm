'use strict';

class Pongstgrm {
  constructor (element, options) {
    this.element = element
    this.options = {
      access_id:    undefined,
      access_token: undefined,

      // Display Options
      show:       'recent',
      count:      5,
      likes:      true,
      comments:   true,
      timestamp:  true,
      flexbox:    false
    }

    Object.assign(this.options, options);

    // this.authenticate() && this.buildMedia();

    this.buildMedia()
  }

  authenticate () {
    const access_id    = this.options.access_id
    const access_token = this.options.access_token

    if ((access_id !== undefined) && (typeof access_id === 'string') &&
        (access_token !== undefined) && (typeof access_token === 'string')) {
      return true
    } else {
      console.error('A valid Instagram Access ID is necessary to access your media.')
      console.error('A valid Instagram Access Token is necessary to access your media.')
      return false
    }
  }

  buildMedia () {
    let media = this

    $(media.element)
      .addClass('pongstgrm')
      .append('<div class="pongstrm-media-tiles"/>')
      .append('<div class="pongstgrm-paginate"/>')
      .end()
  }
}


// Pugin Definition
$.fn.pongstgrm = function (opts) {
  let options = $.extend({}, opts)

  for (var i = 0; i < arguments.length; i++) {
    if (typeof arguments[i] === 'function')
      options.callback = arguments[i]()
    if (typeof arguments[i] === 'object')
      options = arguments[i]
  }

  return this.each(function () {
    new Pongstgrm($(this)[0], options)
  })
}
