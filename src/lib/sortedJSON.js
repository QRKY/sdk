/*jslint indent:2, regexp:true*/
'use strict';

module.exports = function sortedJSON(that) {
  var list;
  if (['boolean', 'number', 'string'].indexOf(typeof that) > -1) {
    return JSON.stringify(that);
  }
  if (that === undefined) {
    return 'undefined';
  }
  if (Array.isArray(that)) {
    list = that.map(function (item) {
      return sortedJSON(item);
    });
    return "[" + list.join(',') + "]";
  }
  if (typeof that === 'object' && that !== null) {
    list = Object.keys(that).sort().reduce(function (arr, key) {
      var value = sortedJSON(that[key]);
      if (value !== 'undefined') {
        arr.push('"' + key + '":' + value);
      }
      return arr;
    }, []);
    return "{" + list.join(',') + "}";
  }
};

