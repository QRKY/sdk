/*jslint indent:2, regexp:true*/
'use strict';
var sortedJSON = require('./sortedJSON');

module.exports = function httpRequest(opts, cb) {
  var http = 'https', request, strBody, xhr, XHR, url;

  strBody = '';
  XHR = global.XMLHttpRequest || false;

  if (opts.body) {
    strBody = typeof opts.body === 'object' ? sortedJSON(opts.body) : opts.body;
  }
  delete opts.body;

  if (!XHR && !global.fetch) {
    http = require(opts.protocol || http);
    opts.protocol += ':';
    opts.headers = opts.headers || {};
    opts.headers['Content-Type'] = 'application/json';
    opts.headers.Accept = 'application/json,*/*';
    opts.headers['Content-Length'] = Buffer.byteLength(strBody);

    request = http.request(opts);
    request.write(strBody);
    request.end();

    request.on('response', function (response) {
      response.body = '';
      response.setEncoding('utf8');
      response.on('data', function (chunk) {
        response.body += chunk;
      });

      response.on('end', function () {
        try {
          response.body = JSON.parse(response.body);
        } catch (e) {
          console.log(e);
        }
        cb(response);
      });
    });
  }

  if (global.fetch) {
    url = (opts.protocol || 'https') + '://' + opts.host + (opts.port ? ':' + opts.port : '') + opts.path;
    opts = {
      method  : opts.method,
      headers : {
        'Content-Type'    : 'application/json;charset=UTF-8',
        Accept            : 'application/json,*/*'
      }
    };

    if (strBody && (opts.method === 'POST' || opts.method === 'PUT')) {
      opts.body = strBody;
    }
    global.fetch(url, opts).then(function (res) {
      if (typeof cb === 'function') {
        cb({ statusCode : res.status, body : res.json() });
      }
    });
  }

  if (XHR && !global.fetch) {
    xhr = new XHR();
    url = (opts.protocol || 'https') + '://' + opts.host + (opts.port ? ':' + opts.port : '') + opts.path;
    xhr.open(opts.method, url, true);
    xhr.onreadystatechange = function () {
      var value;

      if (xhr.readyState !== 4) {
        return;
      }

      try {
        value = JSON.parse(xhr.responseText);
      } catch (e) {
        value = xhr.responseText;
      }

      if (typeof cb === 'function') {
        cb({ statusCode : xhr.status, body : value });
      }
    };
    if (strBody && (opts.method === 'POST' || opts.method === 'PUT')) {
      xhr.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');
      xhr.send(strBody);
    } else {
      xhr.send();
    }
  }
};

