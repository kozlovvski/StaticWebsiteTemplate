// This plugin lets us define paths easily
const path = require("path");

// This plugin clears ./dist folder before building the project so that you don't store files from previous builds
const CleanWebpackPlugin = require("clean-webpack-plugin");

// This plugin outputs CSS to a single file
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

// This plugin links all used files to index.html and outputs html files to /dist folder
const HtmlWebpackPlugin = require("html-webpack-plugin");

// This plugin optimizes images
const ImageminPlugin = require("imagemin-webpack");

// This file stores production and source paths. You can change them in src/webpack/path.js if you want
const { prod_Path, src_Path } = require("./path");

module.exports = {
  // Path to the main javascript file
  entry: {
    main: "./" + src_Path + "/index.js"
  },

  // Where main javascript file should be outputed.
  output: {
    path: path.resolve(__dirname, prod_Path),
    filename: "[name].[contenthash].js"
  },

  // Rules defining what Webpack should do with different files
  module: {
    rules: [
      {
        // Find all .js files and transpile them to support browsers listed in package.json
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: [
              [
                "babel-preset-env",
                {
                  useBuiltIns: "entry"
                }
              ]
            ]
          }
        }
      },
      {
        // Find all .html files and require elements in <img> and <link> tags. Then, other webpack plugins/loaders will be able to do something with them, for example optimize images
        test: /\.html$/,
        use: {
          loader: "html-loader",
          options: {
            attrs: ["img:src", "link:href"]
          }
        }
      },
      {
        // 1. Load sass/scss/css files
        // 2. Transpile them using postcss (for example, add webkit prefixes - this is defined in postcss.config.js)
        // 3. Parse it using css-loader
        // 4. Use MiniCssExtractPlugin to output everything to a single .css file
        test: /\.(sass|scss|css)$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader
          },
          {
            loader: "css-loader"
          },
          {
            loader: "postcss-loader"
          },
          {
            loader: "sass-loader"
          }
        ]
      },
      {
        // Load images and output them to /dist/images directory
        test: /\.(png|jpe?g|gif|svg)$/i,
        use: [
          {
            loader: "file-loader",
            options: {
              outputPath: "images"
            }
          }
        ]
      }
    ]
  },
  plugins: [
    // This plugin clears ./dist folder before building the project so that you don't store files from previous builds
    new CleanWebpackPlugin(path.resolve(__dirname, prod_Path), {
      root: process.cwd()
    }),

    // We use [contenthash] to prevent browser cache issues - if content changes, the filename will change and browser will have to reload the file
    new MiniCssExtractPlugin({
      filename: "style.[contenthash].css",
    }),

    // Tell the plugin where is the index.html file
    new HtmlWebpackPlugin({
      template: "./src/index.html",
      minify: true
    }),

    // Image optimization settings
    new ImageminPlugin({
      bail: false, // Ignore errors on corrupted images
      imageminOptions: {
        // Before using imagemin plugins make sure you have added them in `package.json` (`devDependencies`) and installed them
        plugins: [
          ["gifsicle", { interlaced: true }],
          ["mozjpeg", { quality: 80, progressive: true }],
          ["pngquant", { strip: true }],
          [
            "svgo",
            {
              plugins: [
                {
                  removeViewBox: false
                }
              ]
            }
          ]
        ]
      }
    })
  ]
};