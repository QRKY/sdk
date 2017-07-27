/*jslint indent:2, regexp:true*/
'use strict';
var pick      = require('./lib/pick'),
  Promise     = global.Promise || require('promise-polyfill'),
  R           = require('ramda');

function defer() {
  var deferred, promise;

  deferred = {};
  promise = new Promise(function (resolve, reject) {
    deferred.resolve = resolve;
    deferred.reject  = reject;
  });

  deferred.promise = promise;
  return deferred;
}

module.exports = function (httpRequest) {
  return function (spec, cb) {
    var opts, deferred = defer();

    opts = {
      host    : spec.domain || 'api.qrk.mx',
      protocol: spec.protocol || 'https',
      path    : '/login',
      method  : 'POST',
      body    : R.pick(['email', 'password'], spec)
    };

    httpRequest(opts, function (res) {
      if (res.statusCode >= 200 && res.statusCode < 300) {
        if (cb) {
          cb(null, res.body);
          return;
        }
        deferred.resolve(res.body);
        return;
      }
      if (cb) {
        cb(res.body, null);
      }
      deferred.reject(res.body);
    });

    if (!cb) {
      return deferred.promise;
    }
  };
};
