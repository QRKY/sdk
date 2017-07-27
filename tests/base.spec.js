/*jslint node: true, indent: 2, nomen:true */
/*global describe, it, expect, beforeEach, afterEach, emit */
'use strict';
var constructor, events, passedOpts, constructorData, main, sortedJSON;

sortedJSON = require('../src/lib/sortedJSON');
main = require('../src/main');

constructor = function (mockHttp) {
  var constructor = main(mockHttp);
  return constructor({});
};

describe('sortedJSON', function () {
  it('Base', function () {
    expect(true).toBe(true);
  });
});
