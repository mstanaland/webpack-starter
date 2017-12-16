# Webpack starter

Basic little repo to get started making an old-school html and css site.

A tiny bit of magic is included:
* Sass converted to css
* css is auto-prefixed
* ES2015+ converted to ES5

## Create as many html files in /app as you want
HTML files will be copied to the dist folder.

##  Manually link css
In each HTML file, use
```html
<link type="text/css" rel="stylesheet" href="styles/[FILENAME].css">
```.
Where [FILENAME] is name of the Sass file imported in the index javascript file.


##  Manually link javascript files
In each HTML file, use
```html
<script type="text/javascript" src="js/[FILENAME].js"></script>
```.
Where [FILENAME] is name of the JS file to use (likely index.js).


## Multiple Javascript files require multiple Webpack entries
If you don't want each HTML file to use the same bundled javascript, edit the
webpack.config.js file to include multiple entries like this:

```javascript
module.exports = {
  context: path.resolve(__dirname, 'app'),
  entry: {
    index: './js/index.js',
    foo: './js/foo.js'
  },
  ...
```

Then use the `<script>` tag in the html body to specify which js file you want
to use.
