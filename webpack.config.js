var webpack = require('webpack')
var path = require('path')

var ExtractTextPlugin = require('extract-text-webpack-plugin')
// var HtmlWebpackPlugin = require('html-webpack-plugin')


var Webpack_isomorphic_tools_plugin =
  require('webpack-isomorphic-tools/plugin')
var webpack_isomorphic_tools_configuration =
  require('./webpack-isomorphic-tools')
var webpack_isomorphic_tools_plugin =
  new Webpack_isomorphic_tools_plugin(webpack_isomorphic_tools_configuration)
  .development()


var conf = new function() {
  this.prod = false;
  this.src = 'app';
  this.fileName = this.prod ? '[name]-[hash]' : '[name]';
  this.destDirName = 'build';
}

module.exports = new function() {

  if (conf.prod) {
  } else {
    this.devtool = '#inline-source-map'
  }

  // this.content = './app'


  this.module = {
    loaders: [
      // { test: /\.(png|jpe?g|gif)$/, loader: 'file'},
      // { test: /\.sass$/,
      //   loader: ExtractTextPlugin.extract('css!sass?indentedSyntax&sourceMap!autoprefixer')
      // },
      // { test: /\.css$/,
      //   loader: ExtractTextPlugin.extract('css?sourceMap')
      // },
      // { test: /\.scss$/,
      //     loader: ExtractTextPlugin.extract('css?sourceMap!sass?sourceMap!autoprefixer') },
      // { test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
      //   loader: 'url?limit=10000&minetype=application/font-woff' },
      // { test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: 'file' }
      {
        test: webpack_isomorphic_tools_plugin.regular_expression('styles'),
        loader: 'style-loader!css-loader?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]'
      },
      {
        test: /.jsx?$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        query: {
          presets: ['es2015', 'react']
        }
      }
    ]
  }


  this.resolve = {
    extensions: ['', '.js', '.webpack.js', '.web.js']
  }


  this.entry = {
    app: ['./'+conf.src+'/index.js'],
  }

  this.output = {
    path: path.join(__dirname, conf.destDirName),
    publicPath: '/',
    filename:  conf.fileName + '.js',
    chunkFilename: '[id].js',
  }


  this.plugins = [
    new webpack.NoErrorsPlugin(),
    // new webpack.DefinePlugin(conf.defines),
    // new webpack.optimize.CommonsChunkPlugin('vendor', conf.fileName + '.js'),
    new ExtractTextPlugin(conf.fileName + '.css', { allChunks: false }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      }
    }),
    // new HtmlWebpackPlugin({
    //   template: './'+conf.src+'/index.html',
    //   inject: 'body'
    // }),
    webpack_isomorphic_tools_plugin,
  ]


  this.devServer = {
    port: 8080,
    contentBase: './' + conf.destDirName,
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
}
