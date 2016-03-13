require('babel-polyfill')
require('babel-register')

// global._server_ = true
// global._client_ = false
// global._disable_server_side_rendering_ = false
// global.log = function(t) {
//   console.log(t)
// }

var Webpack_isomorphic_tools = require('webpack-isomorphic-tools')
var project_base_path = require('path').resolve(__dirname, '..')

console.log(project_base_path)

global.webpack_isomorphic_tools = new Webpack_isomorphic_tools(require('../webpack-isomorphic-tools'))
// .development(true)
.server(project_base_path, function()
{
  console.log('run..')
  var app = require('./server').default
  var port = parseInt(process.argv[2]) || 8090


  var server = app.listen(port, function() {
    console.log('SERVER STARTED!!!(port: '+ port +')')
  })
})
