# SyntaxError: Unexpected token '>' on Safari

Safari target browser isn't transpiling fat arrows when in production mode and transpiling async functions.

## Test

* Run `yarn`
* Run `yarn test`

Four files will be generated in dist/

* development-ios_saf-9.js has no fat arrows
* development-ios_saf-8.js has no fat arrows
* production-ios_saf-8.js has no fat arrows
* **production-ios_saf-9.js has fat arrows**

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

If you inspect **production-ios_saf-9.js**, you can see fat arrows being added which break in iOS9.

`foo: () =>`
