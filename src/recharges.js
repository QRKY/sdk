/*jslint indent:2, regexp:true*/
'use strict';

module.exports = function (qrk, request) {

  qrk.userRechargeGet = function (spec, cb) {
    var path;

    spec = spec || {};

    path = '/users/' + (spec.user || '') + '/balance/charge';

    return request.call(this, {
      path    : path,
      method  : 'GET'
    }, cb);
  };

  qrk.oxxoRechargeCreate = function (spec, cb) {
    var path;

    spec = spec || {};

    path = '/users/' + (spec.user || '') + '/balance/charge';

    return request.call(this, {
      path    : path,
      body    : {
        amount: spec.amount || 0
      },
      method  : 'POST'
    }, cb);
  };

  qrk.oxxoRechargeRemove = function (spec, cb) {
    var path;

    spec = spec || {};

    path = '/users/' + (spec.user || '') + '/balance/charge/' + (spec.recharge || '');

    return request.call(this, {
      path    : path,
      method  : 'DELETE'
    }, cb);
  };
};
