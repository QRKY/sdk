/*jslint node: true, indent:2, regexp:true*/
'use strict';

module.exports = function (qrk, request) {

  qrk.userTransfer = function (spec, cb) {
    var path;

    spec = spec || {};

    path = '/users/' + (spec.user || '') + '/balance/transfer';

    return request.call(this, {
      path    : path,
      method  : 'POST',
      body    : {
        mail: spec.email,
        amount: spec.amount
      }
    }, cb);
  };

  qrk.userTransferMulti = function (spec, cb) {
    var path;

    spec = spec || {};

    path = '/users/' + (spec.user || '') + '/balance/transfer/multi';

    return request.call(this, {
      path    : path,
      method  : 'POST',
      body    : spec.transfers
    }, cb);
  };
};
