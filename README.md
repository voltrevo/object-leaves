# object-leaves [![NPM version][npm-image]][npm-url] [![Build Status][travis-image]][travis-url] [![Dependency Status][daviddm-image]][daviddm-url] [![Coverage Status][coveralls-image]][coveralls-url] [![Code Climate][code-climate-image]][code-climate-url]
> Enumerates the leaves of an object.


## Install

```sh
$ npm install --save object-leaves
```


## Usage

``` js
'use strict';

var objectLeaves = require('object-leaves');

console.log(objectLeaves({
  foo: 'bar',
  baz: 'boom',
  one: {
    two: {
      three: {
        four: {
          five: 'six'
        }
      }
    }
  }
}));
```

output:
```
[ { key: 'foo', value: 'bar', path: [ 'foo' ] },
  { key: 'baz', value: 'boom', path: [ 'baz' ] },
  { key: 'five',
    value: 'six',
    path: [ 'one', 'two', 'three', 'four', 'five' ] } ]
```


## License

MIT © [Andrew Morris](http://andrewmorris.io/)


[npm-image]: https://badge.fury.io/js/object-leaves.svg
[npm-url]: https://npmjs.org/package/object-leaves
[travis-image]: https://travis-ci.org/voltrevo/object-leaves.svg?branch=master
[travis-url]: https://travis-ci.org/voltrevo/object-leaves
[daviddm-image]: https://david-dm.org/voltrevo/object-leaves.svg?theme=shields.io
[daviddm-url]: https://david-dm.org/voltrevo/object-leaves
[coveralls-image]: https://coveralls.io/repos/voltrevo/object-leaves/badge.svg?branch=master&service=github
[coveralls-url]: https://coveralls.io/github/voltrevo/object-leaves?branch=master
[code-climate-image]: https://codeclimate.com/github/voltrevo/object-leaves/badges/gpa.svg
[code-climate-url]: https://codeclimate.com/github/voltrevo/object-leaves
