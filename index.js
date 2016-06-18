module.exports = createMiddleware;

function createMiddleware(_mw) {
  var options, next;
  var mw = _mw;

  create.replace = replace;

  return create;

  function replace(_mw) {
    mw = _mw(options)(next);
  }

  function create(_options) {
    options = _options;

    if(mw) {
      mw = mw(options);
    }

    return function(_next) {
      next = _next;

      if (mw) {
        mw = mw(next);
      }

      return function(action) {
        if (mw) {
          return mw(action);
        } else {
          return next(action);
        }
      };
    };
  };
}