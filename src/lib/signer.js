/*jslint indent:2, regexp:true*/
'use strict';
var sortedJSON = require('./sortedJSON'),
  md5 = require('js-md5');

module.exports = function createSigner(hash) {
  return function (url, body) {
    var strBody = '', signature;

    if (body) {
      strBody = typeof body === 'object' ? sortedJSON(body) : body;
    }
    signature = md5(url + strBody + hash);
    if (url.indexOf('?') > -1) {
      return url + '&signature=' + signature;
    }
    return url + '?signature=' + signature;
  };
};
