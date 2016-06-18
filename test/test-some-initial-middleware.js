var Lab = require('lab');
var lab = exports.lab = Lab.script();
var describe = lab.experiment;
var before = lab.before;
var after = lab.after;
var it = lab.it;
var Code = require('code');
var expect = Code.expect;
var Redux = require('redux');

var Middleware = require('../');

describe('redux-replaceable-middleware', function() {
  var mw, store;

  it('should allow construction without replacer', function(done) {
    mw = Middleware(function(options) {
      return function(next) {
        return function(action) {
          action.value = (action.value || 1) * 2;
          return next(action);
        }
      }
    });
    done();
  });

  it('works with redux', function(done) {
    store = Redux.createStore(
      counter,
      Redux.applyMiddleware(mw)
      );

    store.dispatch({ type: 'INCREMENT'});
    store.dispatch({ type: 'INCREMENT'});
    store.dispatch({ type: 'DECREMENT'});

    expect(store.getState()).to.equal(2);
    done();

    function counter(state, action) {
      if (! state) {
        state = 0;
      }

      switch(action.type) {
        case 'INCREMENT':
          return state + (action.value || 1);
        case 'DECREMENT':
          return state - (action.value || 1);
      }
      return state;
    }
  });

  it('should allow the middleware to be replaced', function(done) {
    mw.replace(function(options) {
      return function(next) {
        return function(action) {
          action.value = (action.value || 1) * 3;
          return next(action);
        }
      }
    });

    store.dispatch({ type: 'INCREMENT'});
    store.dispatch({ type: 'INCREMENT'});
    store.dispatch({ type: 'DECREMENT'});

    expect(store.getState()).to.equal(5);
    done();
  });


});