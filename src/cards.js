/*jslint indent:2, regexp:true*/
'use strict';

module.exports = function (qrk, request) {

  qrk.userCardsGet = function (spec, cb) {
    var path;

    spec = spec || {};

    path = '/users/' + (spec.user || '') + '/cards';

    return request.call(this, {
      path    : path,
      method  : 'GET'
    }, cb);
  };

  qrk.userCardsCreate = function (spec, cb) {
    var path;

    spec = spec || {};

    path = '/users/' + (spec.user || '') + '/cards';

    return request.call(this, {
      path    : path,
      body    : {
        token: spec.token || ''
      },
      method  : 'POST'
    }, cb);
  };

  qrk.userCardsSetDefault = function (spec, cb) {
    var path;

    spec = spec || {};

    path = '/users/' + (spec.user || '') + '/cards/default';

    return request.call(this, {
      path    : path,
      body    : {
        card_id: spec.card || ''
      },
      method  : 'POST'
    }, cb);
  };

  qrk.userCardsRemove = function (spec, cb) {
    var path;

    spec = spec || {};

    path = '/users/' + (spec.user || '') + '/cards/' + (spec.card || '');

    return request.call(this, {
      path    : path,
      method  : 'DELETE'
    }, cb);
  };
};
