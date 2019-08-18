/*jslint indent: 2, maxlen: 80, node: true */
/* -*- tab-width: 2 -*- */
'use strict';

require('./shared').compareConsoleLogToFixture(function usageTest(console) {
  //#u
  var sortedJson = require('sortedjson'), pets = {
    dog: { sounds: [ 'woof' ],            colors: [ 'grey', 'white' ] },
    cat: { colors: [ 'white', 'orange' ], sounds: [ 'meow', 'purr' ]  },
    ant: { colors: [ 'red', 'black' ] },
  };
  console.log(sortedJson(pets));
  //#r
}, module);
