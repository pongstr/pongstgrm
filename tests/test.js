
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

  test('should expose default settings', function () {
    ok($.fn.pongstgrm.defaults, 'default options are defined')
  })

});