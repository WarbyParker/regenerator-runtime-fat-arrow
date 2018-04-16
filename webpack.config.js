module.exports = {
  entry: { main: ["./index.js"] },
  output: {
    filename: process.env.NODE_ENV === "production" ? "prod.js" : "dev.js"
  },
  mode: process.env.NODE_ENV === "production" ? "production" : "development",
  module: {
    rules: [
      {
        test: [/\.js?$/],
        loader: "babel-loader",
        // exclude: /node_modules/,
        options: {
          babelrc: false,
          presets: [
            [
              "@babel/env",
              {
                targets: {
                  browsers: ["ios_saf >= 9"]
                }
              }
            ]
          ]
        }
      }
    ]
  }
};
