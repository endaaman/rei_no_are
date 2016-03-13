require('babel-polyfill')
require('babel-register')

var app = require('./server').default
var port = parseInt(process.argv[2]) || 8090


var server = app.listen(port, function() {
  console.log('SERVER STARTED!!!(port: '+ port +')')
  process.send('started')
})

process.on('message', function(m) {
  if (m === 'close') {
    server.close(function() {
      console.log('SERVER CLOSED!!!')
      process.send('closed')
      process.exit(0)
    })
  }
})
