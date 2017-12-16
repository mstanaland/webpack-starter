var path = require('path');
var UglifyJsPlugin = require('uglifyjs-webpack-plugin');
var CleanWebpackPlugin = require('clean-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var BrowserSyncPlugin = require('browser-sync-webpack-plugin');
var CopyWebpackPlugin = require('copy-webpack-plugin');

var ExtractPlugin = new ExtractTextPlugin({
  filename: 'styles/[name].css'
});

module.exports = {
  context: path.resolve(__dirname, 'app'),
  entry: {
    index: './js/index.js',
    foo: './js/foo.js'
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'js/[name].js',
    publicPath: '/'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: [{
          loader: 'babel-loader',
          options: {
            presets: ['env']
          }
        }]
      },
      {
  			test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
  			loader: 'url-loader?limit=10000&mimetype=application/font-woff&name=fonts/[name].[ext]'
  		},
      {
  			test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
  			loader: 'file-loader?name=fonts/[name].[ext]'
  		},
      {
        test: /\.(scss|sass)$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            { loader: 'css-loader', options: { sourceMap: true, minimize: true } },
            { loader: 'postcss-loader', options: {sourceMap: 'inline' }},
            { loader: 'sass-loader', options: { sourceMap: true } },
          ],
          publicPath: '/',
        })
      }
    ]
  },
  plugins: [
    ExtractPlugin,
    new CleanWebpackPlugin(['dist']),
    new UglifyJsPlugin({
      //...
    }),
    new BrowserSyncPlugin({
			server: {
				baseDir: ['dist']
			},
			port: 3000,
			host: 'localhost',
			open: true,
      notify: false
		}),
    new CopyWebpackPlugin([{
			from: '*.html'
		},{
			from: './images/**/*'
		},{
      from: './js/**/*',
      ignore: ['index.js', 'bundle.js']
    }])
  ]
};
