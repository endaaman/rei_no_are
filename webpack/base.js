var webpack = require('webpack')
var path = require('path')

var ExtractTextPlugin = require('extract-text-webpack-plugin')
var HtmlWebpackPlugin = require('html-webpack-plugin')


var Webpack_isomorphic_tools_plugin =
  require('webpack-isomorphic-tools/plugin')
var webpack_isomorphic_tools_configuration =
  require('../webpack-isomorphic-tools')
var webpack_isomorphic_tools_plugin =
  new Webpack_isomorphic_tools_plugin(webpack_isomorphic_tools_configuration)


module.exports = function(production, devServer){
  if (!production) {
    webpack_isomorphic_tools_plugin =
      webpack_isomorphic_tools_plugin.development()
  }

  var fileName = production ? '[name]-[hash]' : '[name]';

  var defines = {
    'process.env.NODE_ENV': production ? '"production"' : '"development"',
    'global.__BUILT_AT__': '' + Date.now()
  }


  var config = {}

  if (!production) {
    config.devtool = '#inline-source-map'
  }

  config.module = {
    loaders: [
      {
        test: webpack_isomorphic_tools_plugin.regular_expression('images'),
        loader: 'file'
      },
      {
        test: /.css$/,
        loader:
          ExtractTextPlugin.extract(
            'css?sourceMap&importLoaders=1&modules&localIdentName=[hash:base64:5]!postcss'
          )
      },
      {
        test: /.jsx?$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        query: {
         'presets': ['es2015', 'react'],
         'plugins': ['syntax-decorators'],
        }
      }
    ]
  }

  config.postcss = function() {
    return [
      require('autoprefixer'),
      require('precss'),
      require('postcss-simple-vars'),
    ]
  }


  config.entry = {
    app: './app/index.js'
  }


  config.output = {
    path: path.join(__dirname, '..', 'build'),
    publicPath: '/',
    filename:  `${fileName}.js`,
  }


  config.plugins = [
    new webpack.NoErrorsPlugin(),
    new webpack.DefinePlugin(defines),
    new ExtractTextPlugin(`${fileName}.css`, {allChunks: true}),
    webpack_isomorphic_tools_plugin,
  ]

  if (production) {
    config.plugins = config.plugins.concat([
      new webpack.optimize.DedupePlugin(),
      new webpack.optimize.OccurenceOrderPlugin(),
      new webpack.optimize.UglifyJsPlugin({
        compress: {
          warnings: false
        }
      }),
    ])
  }

  if (devServer) {
    config.plugins.push(
      new HtmlWebpackPlugin({
        template: './app/index.html',
        inject: 'body'
      })
    )
  }


  config.devServer = {
    port: 8080,
    noInfo: true,
    hot: false,
    lazy: false,
    inline: true,
    historyApiFallback: true,
    stats: { colors: true },
    proxy: {
      '/api/*': 'http://localhost:3000',
    },
  }

  return config
}
