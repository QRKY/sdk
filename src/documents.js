/*jslint node: true, indent:2, regexp:true*/
'use strict';
var pick      = require('./lib/pick');

module.exports = function (qrk, request) {
  qrk.userDocumentsGet = function (spec, cb) {
    var path;

    spec = spec || {};

    path = '/users/' + (spec.user || '') + '/documents';

    return request.call(this, {
      path    : path,
      method  : 'GET'
    }, cb);
  };

  qrk.userDocumentsCreate = function (spec, cb) {
    var path;

    spec = spec || {};

    path = '/users/' + (spec.user || '') + '/documents';

    return request.call(this, {
      path    : path,
      method  : 'POST',
      body    : pick([
        'kind',
        'url'
      ], spec)
    }, cb);
  };

  qrk.userDocumentsRemove = function (spec, cb) {
    var path;

    spec = spec || {};

    path = '/users/' + (spec.user || '') + '/documents/' + (spec.kind || '');

    return request.call(this, {
      path    : path,
      method  : 'DELETE'
    }, cb);
  };
};
