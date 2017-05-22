/*jslint indent:2*/
/*global unescape */
'use strict';

module.exports = function (str) {
  return unescape(encodeURIComponent(str));
};
