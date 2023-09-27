/*jslint indent: 2, maxlen: 80, node: true */
/* -*- tab-width: 2 -*- */
'use strict';

var eq = require('equal-pmb'),
  sortedJson = require('../');

(function testWhitespace() {
  var input = { a: 1, b: [2] }, json;

  json = sortedJson(input, null, 0);
  eq.lines(json, '{"a":1,"b":[2]}');

  json = sortedJson(input, null, -2);
  eq.lines(json, [
    '{ "a": 1,',
    '  "b": [',
    '    2',
    '  ]',
    '}',
  ]);

  json = sortedJson(input, null, -1);
  eq.lines(json, [
    '{"a": 1,',
    ' "b": [',
    '  2',
    ' ]',
    '}',
  ]);

  json = sortedJson(input, null, 1);
  eq.lines(json, [
    '{',
    ' "a": 1,',
    ' "b": [',
    '  2',
    ' ]',
    '}',
  ]);

  json = sortedJson(input, null, 2);
  eq.lines(json, [
    '{',
    '  "a": 1,',
    '  "b": [',
    '    2',
    '  ]',
    '}',
  ]);

  json = sortedJson(input, null, 4);
  eq.lines(json, [
    '{',
    '    "a": 1,',
    '    "b": [',
    '        2',
    '    ]',
    '}',
  ]);

}());
