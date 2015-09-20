'use strict';

var assert = require('assert');

var isObject = function(candidateObj) {
  return (
    typeof candidateObj === 'object' &&
    candidateObj !== null && // Don't forget javascript thinks null is an object.
    !Array.isArray(candidateObj) // IMHO, arrays are not objects either.
  );
};

var copyPush = function(arr, pushVal) {
  var copy = arr.slice();
  copy.push(pushVal);

  return copy;
};

module.exports = function(obj) {
  assert(isObject(obj), 'object-leaves only accepts objects');

  var leaves = [];

  var traverse = function(key, value, path) {
    if (isObject(value)) {
      Object.keys(value).forEach(function(subkey) {
        traverse(subkey, value[subkey], copyPush(path, subkey));
      });
    } else {
      leaves.push({
        key: key,
        value: value,
        path: path
      });
    }
  };

  traverse('', obj, []);

  return leaves;
};
