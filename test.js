const fs = require("fs");
const assert = require("assert");
const webpack = require("webpack");

const PADDING = 10;

const hasFatArrow = str => str.indexOf("=>") > -1;

const slugify = str => {
  return str
    .toString()
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^\w\-]+/g, "")
    .replace(/\-\-+/g, "-")
    .replace(/^-+/, "")
    .replace(/-+$/, "");
};

const createTest = (browsers, mode) => {
  const filename = `${mode}-${slugify(browsers)}.js`;

  console.log(
    `\x1b[36m%s\x1b[0m`,
    "Building:".padEnd(PADDING),
    `"${browsers}" in ${mode} mode => ${filename}`
  );

  return webpack({
    entry: { main: ["./index.js"] },
    output: { filename },
    mode,
    module: {
      rules: [
        {
          test: [/\.js?$/],
          loader: "babel-loader",
          options: {
            babelrc: false,
            presets: [
              [
                "@babel/env",
                {
                  targets: {
                    browsers: [browsers]
                  }
                }
              ]
            ]
          }
        }
      ]
    }
  }).run(() => {
    fs.readFile(`./dist/${filename}`, "utf8", (err, src) => {
      return hasFatArrow(src)
        ? console.error(
            "\x1b[1m\x1b[31m%s\x1b[0m",
            `${"Error".padEnd(PADDING)} ${filename} has fat arrows`
          )
        : console.log(
            "\x1b[32m%s\x1b[0m",
            "Success:".padEnd(PADDING),
            `${filename} has no fat arrows`
          );
    });
  });
};

console.log(`Test running...`);
createTest("ios_saf >= 9", "development");
createTest("ios_saf >= 9", "production");
createTest("ios_saf >= 8", "development");
createTest("ios_saf >= 8", "production");
