'use strict';

/* global describe it */

var assert = require('assert');
var objectLeaves = require('../lib');

var noThrow = function(fn) {
  return function() {
    var ret = {
      error: undefined,
      value: undefined
    };

    try {
      ret.value = fn.apply(this, arguments);
    } catch (e) {
      ret.error = e;
    }

    return ret;
  };
};

describe('object-leaves', function() {
  it('an empty object should produce an empty array', function() {
    assert.deepEqual(objectLeaves({}), []);
  });

  it('single key object should produce a single leaf with key, value, path', function() {
    assert.deepEqual(
      objectLeaves({ foo: 'bar' }),
      [{ key: 'foo', value: 'bar', path: ['foo'] }]
    );
  });

  it('multiple keys work too', function() {
    assert.deepEqual(
      objectLeaves({ foo: 1, bar: [], baz: [{}] }),
      [
        { key: 'foo', value: 1, path: ['foo'] },
        { key: 'bar', value: [], path: ['bar'] },
        { key: 'baz', value: [{}], path: ['baz'] }
      ]
    );
  });

  it('single nested leaf should only result in only one leaf', function() {
    assert.deepEqual(
      objectLeaves({ foo: { bar: { baz: 'boom' } } }),
      [{ key: 'baz', value: 'boom', path: ['foo', 'bar', 'baz'] }]
    );
  });

  it('works on an object with lots of leaves in lots of places', function() {
    var ret8 = function() { return 8; };

    assert.deepEqual(
      objectLeaves({
        one: [[[]]],
        two: {
          three: 3,
          four: 'four',
          five: {
            six: [{ msg: 'I\'m inside an array' }]
          },
          seven: 7
        },
        eight: ret8,
        nine: null,
        ten: undefined,
        eleven: {
          twelve: {
            thirteen: {
              fourteen: {
                fifteen: 15
              }
            }
          }
        }
      }),
      [
        { key: 'one',   value: [[[]]],                            path: ['one'] },
        { key: 'three', value: 3,                                 path: ['two', 'three'] },
        { key: 'four',  value: 'four',                            path: ['two', 'four'] },
        { key: 'six',   value: [{ msg: 'I\'m inside an array' }], path: ['two', 'five', 'six'] },
        { key: 'seven', value: 7,                                 path: ['two', 'seven'] },
        { key: 'eight', value: ret8,                              path: ['eight'] },
        { key: 'nine',  value: null,                              path: ['nine'] },
        { key: 'ten',   value: undefined,                         path: ['ten'] },
        {
          key: 'fifteen',
          value: 15,
          path: ['eleven', 'twelve', 'thirteen', 'fourteen', 'fifteen']
        }
      ]
    );
  });

  it('works when multiple leaves have the same key (but different paths)', function() {
    assert.deepEqual(
      objectLeaves({ a: { foo: 'bar' }, b: { foo: 'bar' } }),
      [
        { key: 'foo', value: 'bar', path: ['a', 'foo'] },
        { key: 'foo', value: 'bar', path: ['b', 'foo'] }
      ]
    );
  });

  it('non-objects throw helpful errors', function() {
    [
      null,
      undefined,
      'foo',
      function() {},
      [],
      37
    ].forEach(function(notAnObject) {
      var res = noThrow(objectLeaves)(notAnObject);

      assert(res.error.message === 'object-leaves only accepts objects');
      assert(res.value === undefined);
    });
  });
});
