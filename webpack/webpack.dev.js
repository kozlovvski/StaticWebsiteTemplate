// This plugin lets us define paths easily
const path = require("path");

// This plugin outputs CSS to a single file
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

// This plugin links all used files to index.html and outputs html files to /dist folder
const HtmlWebpackPlugin = require("html-webpack-plugin");

// This file strores production and source paths. You can change them in src/webpack/path.js if you want
const { prod_Path, src_Path } = require("./path");

module.exports = {
  // Path to the main javascript file
  entry: {
    main: "./" + src_Path + "/index.js"
  },

  // Where files should be saved. Basically, it tells Webpack to use "prod_Path" from src/webpack/path.js file
  output: {
    path: path.resolve(__dirname, prod_Path),
    filename: "[name].js"
  },

  // Source maps make it easier for browsers to display files in a way they were created. This simplifies debugging
  devtool: "source-map",

  // We use devServer, so we can benefit from live file reloading
  devServer: {
    open: true
  },

  // Rules defining what Webpack should do with different files
  module: {
    rules: [
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
        // MiniCssExtractPlugin options will make sure that when you update source files, they will get automatically reloaded
        test: /\.(sass|scss|css)$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              hmr: true,
              reloadAll: true
            }
          },
          {
            loader: "css-loader",
            options: {
              sourceMap: true
            }
          },
          {
            loader: "postcss-loader",
            options: {
              sourceMap: true
            }
          },
          {
            loader: "sass-loader",
            options: {
              sourceMap: true
            }
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
    // This plugin outputs CSS to a single file
    new MiniCssExtractPlugin({
      filename: "style.css"
    }),

    // Tell the plugin where is the index.html file
    new HtmlWebpackPlugin({
      template: "./src/index.html"
    })
  ]
};