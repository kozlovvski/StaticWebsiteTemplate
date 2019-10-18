module.exports = {
  plugins: [
    // Use autoprefixer to automatically add prefixes like "webkit" to CSS
    require("autoprefixer"),
    // Minify CSS file in production to make files smaller
    require("cssnano")({
      preset: "default"
    })
  ]
};
