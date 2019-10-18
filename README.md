# Webpack 4 static website boilerplate
This project is a Webpack 4 Boilerplate for creating static websites. Features include:
- Sass/SCSS support. Simply edit `src/styles/index.sccs` to meet your requirements. You can also take advantage of Sass/SCSS imports (see example code in files)
- Included [normalize.css](https://necolas.github.io/normalize.css/)
- [PostCSS](https://github.com/postcss/postcss) support with installed [Autoprefixer](https://github.com/postcss/autoprefixer). No need to remember about vendor prefixes - they will be included for you. 
- Automatic images optimization with [ImageMin](https://github.com/imagemin/imagemin). With use of [html-loader](https://github.com/webpack-contrib/html-loader) every `<img src="" />` or `<link href="" />` will be required and optimized.
- [Babel](https://github.com/babel/babel) compiler support. Write ES6+ syntax like arrow function which will get transpiled to pre-ES6 syntax during build process
- GitHub Pages deployment with a single command

## Installation

First of all, create a new repo using this template.

![image](https://user-images.githubusercontent.com/20635180/67092219-f6479280-f1ae-11e9-9614-378fbed00258.png)

Clone it to your local machine and run:
```
yarn
```
or if you prefer to use npm:
```
npm install
```

After installing packages run.
```
yarn dev
```
or
```
npm run dev
```

This will setup a development server and open a new card in your browser. Now you may edit any files in your IDE of choice and every change will be visible live. 

## How to edit files

Open `src/index.html` and you will see this code:

```html
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="user-scalable=yes, width=device-width, initial-scale=1.0">
  <title>Webpack 4 Boilerplate</title>
</head>

<body>
  <section class="hello">
    <h1>🏴‍ Ahoy there!</h1>
    <p>☠️ Everything seems to be working, mate!</p>
    <img src="./images/br-icon-pirate.jpg" alt="">
  </section>
</body>

</html>
```

Note that there is no CSS or JS imported here - all of that will be done by Webpack (and precisely html-webpack-plugin).
You can write html as you would normally. You can provide relative paths for images and they will be included in build files.

For CSS you can use Sass/SCSS. Currently there is a `src/styles` folder with `index.scss` file:
```scss
//
// modules
//

@import 'modules/colors';
@import 'modules/base';

//
// partials
//

@import 'partials/hello';
```

This is just my setup - you may adjust that to your needs.

As for Javascript, look at `src/index.js` file:
```js

import 'normalize.css';
import './index.html'
import './styles/style.scss';

console.log('☠️ Arr! JS on board!');
```

If you are new to build tools, that may look weird for you. Why would we import CSS or SCSS or even HTML in our JS file? Basically, Webpack uses Javascript to process your code. It doesn't natively understand stuff like CSS or HTML. So what we do is:
1. We import our CSS/SCSS/HTML into our Javascript
2. Webpack sees that we want to import those files and checks in config what it should do with that
3. Webpack processes those files according to the setup.

If you look into `webpack` directory, you will see `webpack.dev.js` and `webpack.prod.js` files which tell Webpack what to do with certain types of files. I included separate files for development and production mode. If you look into `webpack.prod.js`, you will for example see:
```js
{
  // Find all .html files and require elements in <img> and <link> tags. Then, other webpack plugins/loaders will be able to do something with them, for example optimize images
  test: /\.html$/,
  use: {
    loader: "html-loader",
    options: {
      attrs: ["img:src", "link:href"]
    }
  }
}
```
What Webpack will do is: find all files ending with `.html` (this is a simple regexp) and process it with defined loader. Currently it is a `html-loader`. `options` are settings for the loader. Right now it will try to import every `src` in `<img>` tags and every `href` in `<link>` tags (for example favicons).

You don't need to understand every line of code there - you will get that as you work more with Webpack. For now, just get a basic idea on how Webpack works.

## Production building
If you are done with developing your code in dev mode and would like to create optimized files to host somewhere, use:
After installing packages run.
```
yarn prod
```
or
```
npm run prod
```
This will create a `dist` directory with optimized project code. You can upload those files to any static hosting as you would normally. You may also notice, that some files will be named in a weird name - a combination of letters and numbers. That is because right now the project is set up to hash file names. This is to get around browser caching issues. For example: You host your site and keep styles in `style.css` file. Let's say you want to change something and upload a new version of `style.css`. Some users that already visited your website would not see your change, because their browser can keep a copy of previous `style.css` file. That is why we hash files - if name is different, then the browser will have to download a new file. However, we hash files based on their content - the hash changes only if you change the file itself. If you change only `style.css` and run `yarn prod` or `npm run prod` - the only hash that will change is `style.css` hash. So it is a win-win situation. We force browsers to reload only the files that changed.

## Deployment
This setup is able to deploy your project to GitHub pages with a single command. Simply run:
```
yarn deploy
```
or
```
npm run deploy
```
and Webpack will go through whole build process. Then it will upload the contents of `dist` directory to a `gh-pages` branch and push it to remote. If your project url is `github.com/username/my-static-website`, you will be able to view your built project at `username.github.io/my-static-website`
      
