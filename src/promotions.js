/*jslint node: true, indent:2, regexp:true*/
'use strict';

module.exports = function (qrk, request) {

  qrk.userPromotionsGet = function (spec, cb) {
    var path;

    spec = spec || {};

    path = '/users/' + (spec.user || '') + '/promotions';

    return request.call(this, {
      path    : path,
      method  : 'GET'
    }, cb);
  };

  qrk.userPromotionsAdd = function (spec, cb) {
    var path;

    spec = spec || {};

    path = '/users/' + (spec.user || '') + '/promotions';

    return request.call(this, {
      path    : path,
      method  : 'POST',
      body    : {
        code: spec.code || ''
      }
    }, cb);
  };
};
