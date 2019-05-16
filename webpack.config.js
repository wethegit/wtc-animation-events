const path = require('path');

module.exports = {
  target: 'web',
  entry: "./src/wtc-animation-events.js",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: 'wtc-animation-events.es5.js',
    library: 'WTCAnimationEvents'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        loader: "babel-loader",
        options: {
          presets: [["@babel/env", {
            "targets": {
              "browsers": ["last 2 versions", "ie >= 11"]
            },
            useBuiltIns: "usage"
          }]]
        }
      }
    ]
  }
}