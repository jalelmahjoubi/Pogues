# Bootstrap the application

The application starting point is `index.html`, which just loads the `js/pogues.js` script and declares an HTML `div` element which will host the application.

The `pogues.js` script is a bundle produced by the [build process](./build-process) from the different `javascript` files that constitute the source code. The entry point is `main.js`, which [renders](https://facebook.github.io/react/blog/2015/10/01/react-render-and-top-level-api.html) the `Root` React component into the `div` element aforementionned. The `Root` component only has a `render` method which returns a `Provider` component from [React Redux](https://github.com/reactjs/react-redux).

The `Provider` component is passed a `store` property with a value provided by the [src/js/store/configure-store.js](https://github.com/InseeFr/Pogues/blob/master/src/js/store/configure-store.js) file. This file returns the result of Redux [createStore](https://github.com/reactjs/redux/blob/master/docs/api/createStore.md) applied to the following arguments:

* `reducer`: the application main reducer;
* `preloadedState`: `undefined` at this stage.
* `enhancer`: a [composition](https://github.com/reactjs/redux/blob/master/docs/api/compose.md) of two Redux middlewares ([Redux Thunk](https://github.com/gaearon/redux-thunk) and [Redux Logger](https://github.com/evgenyrodionov/redux-logger)) and of the [Redux DevTools](https://github.com/zalmoxisus/redux-devtools-extension) extension.

In short, the `Provider` component initiates the application state and makes it available to all the components. 