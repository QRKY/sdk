/*jslint node: true, indent:2, regexp:true*/
'use strict';

module.exports = function (spec, obj) {
  var attrname, base;

  spec = spec || {};
  obj = obj || {};
  base = {
    host : spec.domain || 'api.qrk.mx',
    protocol : spec.protocol || 'https',
    timeout : spec.timeout || 5000
  };

  for (attrname in obj) {
    if (obj.hasOwnProperty(attrname)) {
      base[attrname] = obj[attrname];
    }
  }
  return base;
};
