/*jslint indent: 2, maxlen: 80, node: true */
/* -*- tab-width: 2 -*- */
'use strict';

var EX = module.exports, eq = require('equal-pmb'),
  stripBom = require('strip-bom'),
  rrfs = require('read-resolved-file-sync')(require);

EX.expected = stripBom(rrfs(module.filename + 'on')).replace(/\s+$/, '');

EX.actual = (function () {
  function console() {
    console.text += Array.prototype.slice.call(arguments).join(' ');
  }
  console.log = console;
  console.text = '';
  //#u
  var sortedJson = require('sortedjson'), pets = {
    dog: { sounds: [ 'woof' ],            colors: [ 'grey', 'white' ] },
    cat: { colors: [ 'white', 'orange' ], sounds: [ 'meow', 'purr' ]  },
    ant: { colors: [ 'red', 'black' ] },
  };
  console.log(sortedJson(pets));
  //#r
  return console.text;
}());

EX.compare = function () {
  eq(EX.actual.split('\n'), EX.expected.split('\n'));
};

if (require.main === module) { EX.compare(); }
