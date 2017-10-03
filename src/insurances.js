/*jslint node: true, indent:2, regexp:true*/
'use strict';

module.exports = function (qrk, request) {

  qrk.userInsurancesGet = function (spec, cb) {
    var path;

    spec = spec || {};

    path = '/users/' + (spec.user || '') + '/insurances';

    path = spec.group ? (path + '/' + spec.group) : path;

    return request.call(this, {
      path    : path,
      method  : 'GET'
    }, cb);
  };

  qrk.userInsurancesStock = function (spec, cb) {
    var path;

    spec = spec || {};

    path = '/users/' + (spec.user || '') +
      '/insurances/types/' + (spec.type || '') +
      '/coverage/' + (spec.coverage || '') +
      '/duration/' + (spec.duration || '') +
      '/amount/' + (spec.amount || '');

    return request.call(this, {
      path    : path,
      method  : 'GET'
    }, cb);
  };

  qrk.userInsurancesPricing = function (spec, cb) {
    var path;

    spec = spec || {};

    path = '/users/' + (spec.user || '') + '/insurances/pricing';

    return request.call(this, {
      path    : path,
      method  : 'POST',
      body    : {
        insurances: spec.insurances || []
      }
    }, cb);
  };

  qrk.userInsurancesCheckout = function (spec, cb) {
    var path;

    spec = spec || {};

    path = '/users/' + (spec.user || '') + '/insurances/checkout';

    return request.call(this, {
      path    : path,
      method  : 'POST',
      body    : {
        insurances: spec.insurances || [],
        type: spec.type || '',
        detail: spec.detail || undefined
      }
    }, cb);
  };
};
