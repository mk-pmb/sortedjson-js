/*jslint indent: 2, maxlen: 80, node: true */
/* -*- tab-width: 2 -*- */
'use strict';

require('./shared').compareConsoleLogToFixture(require('sortedjson')({
  'c': 0,
  'y': 0,
  'b': 0,
  'x': 0,
  '2': 0,
  'a': 0,
  'z': 0,
  '0': 0,
  '00': 0,
  '0x00': 0,
  '4294967295': 0,    // 2^32 - 1
  '': 0,
  '4294967294': 0,    // 2^32 - 2
  '3': 0,
  '1': 0,
  '-1': 0,
  '4': 0
}), module);
