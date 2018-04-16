# SyntaxError: Unexpected token '>' on Safari

Safari target browser isn't transpiling fat arrows when in production mode and transpiling async functions.

## Test

* Run `yarn`
* Run `yarn build`

Two files will be generated in dist/

* **dev.js** genereated by webpack in development mode
* **prod.js** genereated by webpack in production mode

## Async code being compiled

This is in index.js

```js
module.exports = {
  async foo() {
    return "foo";
  },
  async bar() {
    return "bar";
  }
};
```

### Production issue

If you inspect **prod.js**, you can see fat arrows being added which break in iOS9.

`foo: () =>`
