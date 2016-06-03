'use strict';

const modalTemplate = `
			<div class="md-content">
				<h3>Modal Dialog</h3>
				<div>
					<p>This is a modal window. You can do the following things with it:</p>
					<ul>
						<li><strong>Read:</strong> modal windows will probably tell you something important so don't forget to read what they say.</li>
						<li><strong>Look:</strong> a modal window enjoys a certain kind of attention; just look at it and appreciate its presence.</li>
						<li><strong>Close:</strong> click on the button below to close the modal.</li>
					</ul>
					<button class="md-close">Close me!</button>
				</div>
			</div>
`

class Pongstgrm {
  constructor (element, options) {
    this.element = element
    this.options = Object.assign({
      access_id:    undefined,
      access_token: undefined,

      // Display Options
      show:       'recent',
      count:      5,
      likes:      true,
      comments:   true,
      timestamp:  true,
      flexbox:    false,

      paginate: 'infinite'
    }, options)

    this.overlay  = document.querySelector('.md-overlay')
    this.toggle   = document.querySelectorAll('.md-trigger')

    this.authenticate() && this.buildMedia();



  }

  authenticate () {
    const access_id    = this.options.access_id
    const access_token = this.options.access_token

    if ((access_id !== undefined) && (typeof access_id === 'string') &&
        (access_token !== undefined) && (typeof access_token === 'string')) {
      this.fetchData()
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
      .append('<div class="pongstgrm-media"/>')
      .append('<div class="pongstgrm-paginate"/>')
      .end()

    $(document).on('click', '.md-trigger', function (e) {
      var target = $(e.currentTarget).attr('data-modal')
      $(`#${target}`).addClass('md-show md-perspective')


    })
  }

  fetchData () {
    const plugin = this
    const target = $(plugin.element, '.pongstgrm-media')
    const opts = this.options
    const inst = 'https://api.instagram.com/v1/tags/nofilter/media/recent/'
    const endp = `${inst}?access_token=${opts.access_token}`

    let fetch = $.ajax(endp, {dataType: 'jsonp'})

    fetch
      .done(function (data) {
        data.data.forEach((e) => plugin.thumbnail(e))
      })
      .fail(function (err) {
        console.log(err)
      })
  }

  thumbnail (data) {
    const thumbnail = `
    <a class="media md-trigger md-setperspective" data-modal="${data.id}" href="#">
      <img src="${data.images.thumbnail.url}" alt="${data.caption ? data.caption.text : ''}"
      <span class="media-btn media-btn-like"></span>
      <span class="media-btn media-btn-comment"></span>
    </a>`

    const modal = `
    <div class="md-modal md-effect-19" id="${data.id}"
      <div class="md-content">
        <h3>Modal Dialog</h3>
        <div>
          <p>This is a modal window. You can do the following things with it:</p>
          <ul>
            <li><strong>Read:</strong> modal windows will probably tell you something important so don't forget to read what they say.</li>
            <li><strong>Look:</strong> a modal window enjoys a certain kind of attention; just look at it and appreciate its presence.</li>
            <li><strong>Close:</strong> click on the button below to close the modal.</li>
          </ul>
          <button class="md-close">Close me!</button>
        </div>
      </div></div>`

    $(this.element, '.pongstgrm-media').append(thumbnail)
    $('body').append(modal)
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
