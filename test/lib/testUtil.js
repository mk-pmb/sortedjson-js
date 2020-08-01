/*jslint indent: 2, maxlen: 80, node: true */
/* -*- tab-width: 2 -*- */
'use strict';

var EX = {}, eq = require('equal-pmb'), stripBom = require('strip-bom'),
  rrfs = require('read-resolved-file-sync')(require),
  arrSlc = Array.prototype.slice;

EX.captureFakeConsole = function (f) {
  var output = '', result;
  function cons() { output += arrSlc.call(arguments).join(' '); }
  cons.log = cons;
  result = f(cons);
  if (result !== undefined) { output += result; }
  return output;
};


EX.compareConsoleLogToFixture = function cmp(actual, fixtPath) {
  if (fixtPath.filename) { fixtPath = fixtPath.filename + 'on'; }
  var expected = stripBom(rrfs(fixtPath)).replace(/\s+$/, '');
  if (actual.apply) { actual = EX.captureFakeConsole(actual); }
  eq.lines(actual, expected);
};



module.exports = EX;
