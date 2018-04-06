module.exports = {
  entry: { main: ["./index.js"] },
  mode: process.env.NODE_ENV === "production" ? "production" : "development",
  module: {
    rules: [
      {
        test: [/\.js?$/],
        loader: "babel-loader",
        exclude: /node_modules/,
      },
    ],
  },
};
