/*jslint indent: 2, maxlen: 80, node: true */
/* -*- tab-width: 2 -*- */
/*globals define:true */
'use strict';

(function (factory) {
  if (('function' === typeof define) && define.amd) { return define(factory); }
  if (('object' === typeof module) && module && module.exports) {
    module.exports = factory();
  }
}(function () {
  var EX, nativeJsonify = JSON.stringify.bind(JSON),
    sortObj = require('deepsortobj');

  function suf0(json) { return json.replace(suf0.rgx, '$1'); }
  suf0.suffix = '\x00';
  suf0.rgx = /(?:\x00|\\u0000)("\s*:)/g;
  // ^- We don't need to care how many backslashes were in front of \u
  //    because the raw quote + colon following it limit matches to
  //    object keys and we suffixed all of them.

  EX = function sortedJsonStringify(data, replacer, space, sortOpts) {
    sortOpts = (sortOpts || false);
    var negSpace, deepSortOpts = sortOpts, unSuf = sortOpts.unsuffixKeys;
    if (!(sortOpts.keyPrefix || sortOpts.keySuffix)) {
      unSuf = suf0;
      deepSortOpts = Object.assign({}, sortOpts, { keySuffix: unSuf.suffix });
    }
    switch (typeof replacer) {
    case 'number':
    case 'string':
      sortOpts = space;
      space = replacer;
      replacer = null;
      break;
    }
    if (replacer) {
      data = JSON.parse(nativeJsonify(data, replacer));
    }
    data = sortObj(data, deepSortOpts);
    if (space === undefined) { space = -2; }
    negSpace = (+space < 0);
    if (negSpace) { space = -space; }
    data = (sortOpts.stfy || nativeJsonify)(data, null, space);
    if (unSuf) { data = unSuf(data); }
    if (negSpace && (data.substr(1, 2) === '\n ')) {
      data = data.slice(0, 1) + data.slice(3);
    }
    return data;
  };


  EX.preset = function (replacer, space, sortOpts) {
    return function (data) { return EX(data, replacer, space, sortOpts); };
  };


  return EX;
}));
