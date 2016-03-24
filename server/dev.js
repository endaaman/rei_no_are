require('babel-polyfill')
require('babel-register')


var express = require('express')
var webpack = require('webpack')
var webpackDevServer = require('webpack-dev-server')
var WebpackIsomorphicTools = require('webpack-isomorphic-tools')
var u = require('./util')

var port = parseInt(process.argv[2]) || 8080
var webpackConfig = require('../webpack/dev')
var compiler = webpack(webpackConfig)
var project_base_path = require('path').resolve(__dirname, '..')

webpackConfig.entry.wds = `webpack-dev-server/client?http://localhost:${port}`

var server = new webpackDevServer(compiler, webpackConfig.devServer)

var webpackIsomorphicTools = new WebpackIsomorphicTools(require('../webpack-isomorphic-tools'))
.development(true)
.server(project_base_path, function(){
  server.use('*', function(req, res) {
    u.removeDependingModuleCaches(require.resolve('./handler'), function(name) {
      if (/\/node_modules\//.test(name)) {
        return false
      }
      return true
    })
    webpackIsomorphicTools.refresh()
    try {
      var handler = require('./handler').default
      handler(req, res, webpackIsomorphicTools)
    } catch(err) {
      res.status(500).send(err.toString())
    }
  })

  server.listen(port, function() {
    console.log(`STARTED(port:${port}, mode: development)`)
  })
})
