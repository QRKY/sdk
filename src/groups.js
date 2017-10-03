/*jslint node: true, indent:2, regexp:true*/
'use strict';

module.exports = function (qrk, request) {

  qrk.userGroupsGet = function (spec, cb) {
    var path;

    spec = spec || {};

    path = '/users/' + (spec.user || '') + '/groups';

    path = spec.group ? (path + '/' + spec.group) : path;

    return request.call(this, {
      path    : path,
      method  : 'GET'
    }, cb);
  };

  qrk.userGroupsCreate = function (spec, cb) {
    var path;

    spec = spec || {};

    path = '/users/' + (spec.user || '') + '/groups';

    return request.call(this, {
      path    : path,
      method  : 'POST',
      body    : {
        name: spec.name || '',
        members: spec.members || [],
        description: spec.description || []
      }
    }, cb);
  };

  qrk.userGroupsUpdate = function (spec, cb) {
    var path;

    spec = spec || {};

    path = '/users/' + (spec.user || '') + '/groups/' + spec.group;

    return request.call(this, {
      path    : path,
      method  : 'PUT',
      body    : {
        name: spec.name || '',
        members: spec.members || null,
        description: spec.description || []
      }
    }, cb);
  };

  qrk.userGroupsRemove = function (spec, cb) {
    var path;

    spec = spec || {};

    path = '/users/' + (spec.user || '') + '/groups/' + spec.group;

    return request.call(this, {
      path    : path,
      method  : 'DELETE'
    }, cb);
  };
};
