/*jslint node: true, indent:2, regexp:true*/
'use strict';
var pick      = require('./lib/pick');

module.exports = function (qrk, request) {

  qrk.userGet = function (spec, cb) {
    var path;

    path = '/users/' + spec.user;

    return request.call(this, {
      path    : path,
      method  : 'GET'
    }, cb);
  };

  qrk.userUpdate = function (spec, cb) {
    var path;

    spec = spec || {};

    path = '/users/' + (spec.user || '');

    return request.call(this, {
      path    : path,
      method  : 'PUT',
      body    : pick([
        'address',
        'conekta_id',
        'location',
        'name',
        'lastname',
        'lastname2',
        'phone',
        'profile_pic',
        'state',
        'zipcode'
      ], spec)
    }, cb);
  };

  qrk.userBalanceGet = function (spec, cb) {
    var path;

    path = '/users/' + spec.user + '/balance';

    return request.call(this, {
      path    : path,
      method  : 'GET'
    }, cb);
  };

  qrk.userTransactionsGet = function (spec, cb) {
    var path;

    path = '/users/' + spec.user + '/transactions';

    return request.call(this, {
      path    : path,
      method  : 'GET'
    }, cb);
  };

  qrk.userTransactionsTaxableGet = function (spec, cb) {
    var path;

    path = '/users/' + spec.user + '/transactions/taxable';

    return request.call(this, {
      path    : path,
      method  : 'GET'
    }, cb);
  };

  qrk.userS3CredentialsGet = function (spec, cb) {
    var path;

    path = '/users/' + spec.user + '/s3/credentials';

    return request.call(this, {
      path: path,
      method: 'POST',
      body: {
        filename: spec.filename || ''
      }
    }, cb);
  };
};
