'use strict';

var o = require('ospec');
var hook = require('../lib');

var ns = {
  foo: function (next, arg) {
    return next(arg + 1);
  },
  bar: function (next, arg) {
    return next(arg + 1);
  },
  baz: function (arg) {
    return arg + 1;
  },
  qux: function (next, arg) {
    return next(arg + 1);
  },
  quux: function (arg) {
    return arg + 1;
  }
};

ns.bar.after = function (next, arg) {
  return next ? next(arg + 1) : arg + 1;
};

ns.bar.before = function (next, arg) {
  return next(arg + 1);
};

ns.bar.before.after = function (next, arg) {
  return next(arg + 1);
};

ns.bar.before.before = function (next, arg) {
  return next(arg + 1);
};

ns.qux.after = function (next, arg) {
  return next ? next(arg + 1) : arg + 1;
};

ns.quux.before = function (next, arg) {
  return next(arg + 1);
};

// Register hook after definitions
ns.bar = hook(ns.bar);
ns.baz = hook(ns.baz);
ns.qux = hook(ns.qux);
ns.quux = hook(ns.quux);

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

o.spec('Registred hook before definitions', function () {
  var result = ns.foo(1);

  o('Should run queue', function () {
    o(result).equals(6);
  });
});

o.spec('Registred hook after definitions', function () {
  var result = ns.bar(1);

  o('Should run queue', function () {
    o(result).equals(6);
  });
});

o.spec('Misc', function () {
  o('No hooks', function () {
    var result = ns.baz(1);

    o(result).equals(2);
  });

  o('No before hook', function () {
    var result = ns.qux(1);

    o(result).equals(3);
  });

  o('No after hook', function () {
    var result = ns.quux(1);

    o(result).equals(3);
  });

  o('NS not found return hook', function () {
    o(hook('ns.corge', ns)).equals(hook);
  });
});
