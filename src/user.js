/*jslint indent:2, regexp:true*/
'use strict';
//
// var pick    = require('./lib/pick');

module.exports = function (qrk, request) {

  qrk.userGet = function (spec, cb) {
    var path;

    path = '/users/' + spec.id;

    return request.call(this, {
      path    : path,
      method  : 'GET'
    }, cb);
  };
};
