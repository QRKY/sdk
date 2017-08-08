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
    that.domain = spec.domain || 'api.qrk.mx';
    if (spec.port) {
      that.port = spec.port;
    }
    that.protocol = spec.protocol || 'https';
    return that;
  };

  constructor.login = require('./login')(httpRequest);
  constructor.loginFacebook = require('./loginFacebook')(httpRequest);
  constructor.userCreate = require('./userCreate')(httpRequest);
  require('./user')(qrk, request);
  require('./cards')(qrk, request);
  require('./hello')(qrk, request);

  return constructor;
};
