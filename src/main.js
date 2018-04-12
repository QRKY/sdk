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
    that.timeout = spec.timeout || 5000;
    that.protocol = spec.protocol || 'https';
    return that;
  };

  constructor.login = require('./login')(httpRequest);
  constructor.loginFacebook = require('./loginFacebook')(httpRequest);
  constructor.insurancesGet = require('./insurancesGet')(httpRequest);
  constructor.promotersGet = require('./promotersGet')(httpRequest);
  constructor.combosGet = require('./combosGet')(httpRequest);
  constructor.userCreate = require('./userCreate')(httpRequest);
  require('./password-recovery')(constructor, httpRequest);
  require('./info')(constructor, httpRequest);
  require('./beneficiaries')(qrk, request);
  require('./cards')(qrk, request);
  require('./combos')(qrk, request);
  require('./documents')(qrk, request);
  require('./groups')(qrk, request);
  require('./hello')(qrk, request);
  require('./insurances')(qrk, request);
  require('./promotions')(qrk, request);
  require('./recharges')(qrk, request);
  require('./transfers')(qrk, request);
  require('./user')(qrk, request);

  return constructor;
};
