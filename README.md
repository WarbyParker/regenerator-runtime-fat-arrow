# SyntaxError: Unexpected token '>' on Safari

Safari target browser isn't transpiling fat arrows when in production mode and transpiling async functions.

## Test

* Run `yarn`
* Run `yarn test`

Four files will be generated in dist/

* dev-ios_saf-9.js has no fat arrows
* dev-ios_saf-8.js has no fat arrows
* prod-ios_saf-8.js has no fat arrows
* **prod-ios_saf-9.js has fat arrows**

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

If you inspect **prod-ios_saf-9.js**, you can see fat arrows being added which break in iOS9.

`foo: () =>`
