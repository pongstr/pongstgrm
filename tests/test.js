
$(function () { 'use strict';

  module('Pongstagr.am Plugin Definition')

  test('should be defined on jquery object', function () {
    ok($(document.body).pongstgrm, 'pongstagrm method is defined.')
  })

  test('should return jquery collection containing the element', function () {
    var $element = $('<div />')
    var $plugin  = $element.pongstgrm()

    ok($element instanceof $, 'returns jquery collection')
    strictEqual($plugin[0], $element[0], 'collection contains element')
  })

  test('should expose default settings and have valid values', function () {
    ok($.fn.pongstgrm.defaults, 'default options are defined')
    ok(typeof $.fn.pongstgrm.defaults.show === 'string', 'String: Shows what time of media should be displayed.')
    ok(typeof $.fn.pongstgrm.defaults.likes === 'boolean', 'Boolean: Enable/Disable media "Likes" display.')
    ok(typeof $.fn.pongstgrm.defaults.count === 'number', 'Number: Shows how many items will be displayed.')
    ok(typeof $.fn.pongstgrm.defaults.accessId === 'string', 'Access ID must be string')
    ok(typeof $.fn.pongstgrm.defaults.timestamp === 'boolean', 'Boolean: Enable/Disable media "Timestamp" display.')
    ok(typeof $.fn.pongstgrm.defaults.accessToken === 'string', 'Access Token must be string')
  })

});