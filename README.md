# redux-replaceable-middleware

Redux middleware that allows replacement.

## API

```javascript
const ReplaceableMiddleware = require('redux-replaceable-middleware')

var replaceableMiddleware = ReplaceableMiddleware();

const store = Redux.createStore(
  reducer,
  Redux.applyMiddleware(replaceableMiddleware))

setTimeout(function() {
  replaceableMiddleware.replaceBy(SomeNewMiddleware())
}, 1000);
```

## Options

You can access the Redux options argument like this:

```javascript
replaceableMiddleware.options // contains redux options

replaceableMiddleware.options.dispatch({action});
```

# License

ISC