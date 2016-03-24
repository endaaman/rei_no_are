require('babel-polyfill')
require('babel-register')


var express = require('express')
var WebpackIsomorphicTools = require('webpack-isomorphic-tools')

var port = parseInt(process.argv[2]) || 8080
var project_base_path = require('path').resolve(__dirname, '..')

var server = express()
var webpackIsomorphicTools = new WebpackIsomorphicTools(require('../webpack-isomorphic-tools'))
.server(project_base_path, function(){
  server.use(express.static(__dirname + '/build'));
  server.use('*', function(req, res) {
    try {
      var handler = require('./handler').default
      handler(req, res, webpackIsomorphicTools)
    } catch(err) {
      res.status(500).send('Somethig is wrong')
    }
  })

  server.listen(port, function() {
    console.log(`STARTED(port:${port}, mode: production)`)
  })
})
