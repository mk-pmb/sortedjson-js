/*jslint indent: 2, maxlen: 80, node: true */
/* -*- tab-width: 2 -*- */
'use strict';

var eq = require('equal-pmb'),
  univeil = require('univeil'),
  sortedJson = require('../');

(function testUniveil() {
  var input, json;
  input = {
    zero: 0,
    one: 1,
    four: 4,
    devCtrl: '\x90',
    nbsp: '\xA0',
  };

  // First, default jsonifier for reference:
  json = sortedJson(input, null, 2);
  // NB: The control characters are encoded verbatim.
  eq.lines(json, [
    '{',
    '  "devCtrl": "' + String.fromCharCode(0x90) + '",',
    '  "four": 4,',
    '  "nbsp": "' + String.fromCharCode(0xA0) + '",',
    '  "one": 1,',
    '  "zero": 0',
    '}',
  ]);

  // Now with a custom jsonifier:
  json = sortedJson(input, null,

    // sortedjson shall have the least possible assumptions about what
    // kinds of indentation options a custom jsonifier might understand.
    // For example, in this case, -1 means to strip even more whitespace
    // than sortedJson's negative indent magic:
    -1,

    { stfy: univeil.jsonify });
  // NB: The control characters are encoded as Unicode escapes.
  eq(json, '{"devCtrl": "\\' + 'u00' + '90", "four": 4, "nbsp": "\\'
    + 'u00' + 'A0", "one": 1, "zero": 0}');
  // Check it works as a preset:
  eq.lines(sortedJson.preset(-1, { stfy: univeil.jsonify })(input), json);

}());
