/*jslint indent:2, regexp:true*/
'use strict';
var httpRequest = require('./httpRequest'),
  sortedJSON    = require('./sortedJSON'),
  Promise       = global.Promise || require('promise-polyfill');

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
    var path, opts, hasBody, data, deferred = defer();

    data = spec.body ? sortedJSON(spec.body) : '';
    cb = typeof cb === 'function' ? cb : false;

    path = this.sign(spec.path, data || '');
    if (spec.query && spec.query !== '') {
      path += '&' + spec.query;
    }

    opts = {
      host    : this.domain,
      port    : this.port,
      timeout : this.timeout,
      protocol: this.protocol,
      path    : path,
      method  : spec.method || 'GET'
    };
    hasBody = ['POST', 'PUT'].indexOf(opts.method) > -1;

    if (!hasBody && spec.hasOwnProperty('body')) {
      throw new Error('Only POST and PUT request can send a body data');
    }

    if (hasBody) {
      opts.body = data;
    }

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

