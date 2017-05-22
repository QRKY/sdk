/*jslint indent:2, node:true, regexp:true*/
'use strict';

module.exports = function (httpRequest) {
  var qrk = {},
    constructor,
    request = require('./lib/apiRequest')(httpRequest),
    createSigner  = require('./lib/signer');


  constructor = function (spec) {
    var that = Object.keys(qrk).reduce(function (obj, key) {
      obj[key] = qrk[key];
      return obj;
    }, {});

    that.sign = createSigner(spec.hash);
    that.username = spec.username;
    that.domain = spec.domain || 'api.qrk.mx';
    if (spec.port) {
      that.port = spec.port;
    }
    that.protocol = spec.protocol || 'https';
    return that;
  };
  require('./hello')(qrk, request);

  return constructor;
};
