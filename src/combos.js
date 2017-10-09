/*jslint node: true, indent:2, regexp:true*/
'use strict';

module.exports = function (qrk, request) {

  qrk.userCombosStock = function (spec, cb) {
    var path;

    spec = spec || {};

    path = '/users/' + (spec.user || '') +
      '/insurances/combos/coverage/' + (spec.coverage || '') +
      '/duration/' + (spec.duration || '');

    return request.call(this, {
      path    : path,
      method  : 'GET'
    }, cb);
  };

};
