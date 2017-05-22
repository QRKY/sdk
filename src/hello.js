/*jslint indent:2, regexp:true*/
'use strict';

module.exports = function (qrk, request) {

  qrk.sayHello = function (spec, cb) {
    var path;

    spec = spec || {};

    /*
     * If this was a POST or PUT request, you should create a `data` object
    body = {
      name: spec.some_value,
      some_param: spec.other_value
    };
    */

    // Create the path to the API request, include properties from `spec` as needed
    path = '/';

    // Include a `body : body` if this is a PUT or POST request
    return request.call(this, {
      path    : path,
      method  : 'GET'
    }, cb);
  };
};
