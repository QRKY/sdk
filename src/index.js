/*jslint indent:2, regexp:true*/
/*global XMLHttpRequest*/
(function (global) {
  'use strict';
  var httpRequest = require('./lib/httpRequest'),
    main = require('./main')(httpRequest);

  if (global.hasOwnProperty('window') && global.window === global) {
    global.Qrk = main;
  } else {
    module.exports = main;
  }

}(this));
