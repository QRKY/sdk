/*jslint indent:2, regexp:true*/
'use strict';

module.exports = function (qrk, request) {

  qrk.userGet = function (spec, cb) {
    var path;

    path = '/users/' + spec.user;

    return request.call(this, {
      path    : path,
      method  : 'GET'
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
};
