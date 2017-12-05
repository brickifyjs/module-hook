## Module Hook

Apply deep before/after hooks to any methods/functions

## Statistics

[![Github All Releases](https://img.shields.io/github/downloads/brickifyjs/module-hook/total.svg?style=flat-square)](https://github.com/brickifyjs/module-hook)
[![npm](https://img.shields.io/npm/dt/@brickify/m-hook.svg?style=flat-square)](https://www.npmjs.com/package/@brickify/m-hook)

## Social
[![GitHub forks](https://img.shields.io/github/forks/brickifyjs/module-hook.svg?label=Fork&style=flat-square)](https://github.com/brickifyjs/module-hook)
[![GitHub stars](https://img.shields.io/github/stars/brickifyjs/module-hook.svg?label=Stars&style=flat-square)](https://github.com/brickifyjs/module-hook)
[![GitHub watchers](https://img.shields.io/github/watchers/brickifyjs/module-hook.svg?label=Watch&style=flat-square)](https://github.com/brickifyjs/module-hook)
[![Gitter](https://img.shields.io/gitter/room/brickifyjs/module-hook.svg?style=flat-square)](https://gitter.im/brickifyjs/module-hook)

## Project Health

[![Travis branch](https://img.shields.io/travis/brickifyjs/module-hook/master.svg?style=flat-square)](https://travis-ci.org/brickifyjs/module-hook)
[![Codecov](https://img.shields.io/codecov/c/github/brickifyjs/module-hook.svg?style=flat-square)](https://codecov.io/gh/brickifyjs/module-hook)
[![bitHound](https://img.shields.io/bithound/dependencies/github/brickifyjs/module-hook.svg?style=flat-square)](https://www.bithound.io/github/brickifyjs/module-hook/master/dependencies/npm)
[![bitHound](https://img.shields.io/bithound/devDependencies/github/brickifyjs/module-hook.svg?style=flat-square)](https://www.bithound.io/github/brickifyjs/module-hook/master/dependencies/npm)
[![Website](https://img.shields.io/website/https/m-hook.js.brickify.io.svg?label=website&style=flat-square)](https://m-hook.js.brickify.io)

## Install
  
```bash
$ npm install @brickify/m-hook
```

## Usage

```js
var hook = require('@brickify/m-hook');

var ns = {
  foo: function (next, arg) {
    return next(arg + 1);
  },
  bar: function (next, arg) {
    return next(arg + 1);
  }
};


ns.bar.after = function (next, arg) {
  return next ? next(arg + 1) : arg + 1;
};

// Register hook after definitions
ns.bar = hook(ns.bar);

// Register hook before definitions
hook('ns.foo', ns);

ns.foo.after = function (next, arg) {
  return next ? next(arg + 1) : arg + 1;
};

ns.foo.before = function (next, arg) {
  return next(arg + 1);
};

ns.foo.before.after = function (next, arg) {
  return next(arg + 1);
};

ns.foo.before.before = function (next, arg) {
  return next(arg + 1);
};

// Run method
ns.foo(1);
// Output: 6

// Run method
ns.bar(1);
// Output: 3
```

## TODO
* Add JSDoc, comment and Code Signature
* Add beforeEach and afterEach hooks
