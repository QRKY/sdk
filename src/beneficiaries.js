/*jslint node: true, indent:2, regexp:true*/
'use strict';
var pick      = require('./lib/pick');

module.exports = function (qrk, request) {

  qrk.userBeneficiariesGet = function (spec, cb) {
    var path;

    spec = spec || {};

    path = '/users/' + (spec.user || '') + '/beneficiaries';

    path = spec.beneficiary ? (path + '/' + spec.beneficiary) : path;

    return request.call(this, {
      path    : path,
      method  : 'GET'
    }, cb);
  };

  qrk.userBeneficiariesCreate = function (spec, cb) {
    var path;

    spec = spec || {};

    path = '/users/' + (spec.user || '') + '/beneficiaries';

    return request.call(this, {
      path    : path,
      method  : 'POST',
      body    : pick([
        'email',
        'name',
        'lastname',
        'lastname2',
        'phone',
        'relationship'
      ], spec)
    }, cb);
  };

  qrk.userBeneficiariesRemove = function (spec, cb) {
    var path;

    spec = spec || {};

    path = '/users/' + (spec.user || '') + '/beneficiaries/' + spec.beneficiary;

    return request.call(this, {
      path    : path,
      method  : 'DELETE'
    }, cb);
  };
};
