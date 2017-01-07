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

  EX = function sortedJsonStringify(data, replacer, space, sortOpts) {
    sortOpts = (sortOpts || false);
    var negSpace;
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
    data = sortObj(data, sortOpts);
    if (space === undefined) { space = -2; }
    negSpace = (+space < 0);
    if (negSpace) { space = -space; }
    data = (sortOpts.stfy || nativeJsonify)(data, null, space);
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
