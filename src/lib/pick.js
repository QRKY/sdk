/*jslint indent:2*/
'use strict';

module.exports = function pick(arr, obj) {
  return arr.reduce(function (a, b) {
    a[b] = obj[b];
    return a;
  }, {});
};

