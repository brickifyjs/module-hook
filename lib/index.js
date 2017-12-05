'use strict';

var getObjectByPath = require('@brickify/m-gobp');

var TYPE_FUNCTION = 'function';

function invokeHooks(callBack, hooks) {
  var args = Array.prototype.slice.call(arguments);
  var hookPosition = 'before';
  var index = -1;

  args.splice(0, 2);

  function next() {
    index++;

    var hookMethod = hooks[hookPosition][index];

    if (!hookMethod) {
      index = -1;
      hookPosition = 'after';

      var bindCallBack = !hooks[hookPosition][index + 1] ? callBack : callBack.bind(null, next);
      return bindCallBack.apply(null, Array.prototype.slice.call(arguments));
    }

    var bindHook = hookMethod.bind(null, !hooks[hookPosition][index + 1] && hookPosition === 'after' ? null : next);
    return bindHook.apply(null, Array.prototype.slice.call(arguments));
  }

  return next.apply(null, args);
}

function registerHooks(callBack) {
  var hooks = {
    before: [],
    after: []
  };

  function getHook(method, hookPosition) {
    var before = method[hookPosition];
    var after = before && before.after;
    if (before) {
      hooks[hookPosition].unshift(before);
    }
    if (after) {
      hooks[hookPosition].splice(1, 0, after);
    }

    after && getHook(after, hookPosition);
    before && getHook(before, hookPosition);
  }

  getHook(callBack, 'before');
  getHook(callBack, 'after');

  return hooks;
}

function hook(NS, context) {
  if (typeof NS === TYPE_FUNCTION) {
    return function () {
      var hooks = registerHooks(NS);
      return invokeHooks.bind(null, NS, hooks).apply(null, Array.prototype.slice.call(arguments));
    };
  }

  var objbp = getObjectByPath(NS, context);

  if (!objbp) {
    return hook;
  }

  var path = objbp.object.parent;
  var method = objbp.paths.last;
  var callBack = path[method];

  path[method] = function () {
    var hooks = registerHooks(path[method]);
    return invokeHooks.bind(null, callBack, hooks).apply(null, Array.prototype.slice.call(arguments));
  };

  // Create anonymous wrapper
  return path[method];
}

module.exports = hook;
