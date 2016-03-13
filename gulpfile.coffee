path = require 'path'
fork = require('child_process').fork

g = require 'gulp'
browserSync = require 'browser-sync'
webpack = require 'webpack'

webpackConfig = require './webpack.config'


compiler = webpack webpackConfig

port = 8090
closePast = null
reloadServer = (started)->
    if closePast
        closePast()

    child = fork './server', [port]

    onClosed = ->

    child.on 'message', (m)->
        if m is 'started'
            started()
        if m is 'closed'
            onClosed()
            child.disconnect()

    closePast = (closed)->
        if closed
            onClose = closed
        child.send 'close'


g.task 'webpack-build', (done)->
    compiler.run (err, stats)->
        if err
            throw err
            return
        console.log 'Webpack:: Build done.'
        done()


g.task 'webpack-watch', ['webpack-build'],(done)->
    firstTime = true
    # console.log 'Webpack:: Start watching'

    compiler.watch
        aggregateTimeout: 300
        poll: 1000
    , (err, stats)->
        if firstTime
            firstTime = false
            return

        if err
            console.warn err
        else
            console.log 'Webpack:: rebuild done'
            reloadServer ->
                browserSync.reload stream: false


g.task 'browsersync-start', ['server-start'], (done)->
    browserSync.init
        proxy: "http://localhost:#{port}"
        port: 8080
        open: false
    , done


g.task 'server-start', [], (done)->
    reloadServer done


g.task 'browsersync-reload', ['server-reload'], (done)->
    browserSync.reload stream: false

g.task 'server-reload', (done)->
    reloadServer done

g.task 'server-watch', ['server-start', 'browsersync-start'], (done)->
    g.watch './server/**/*.*', ['browsersync-reload']



g.task 'default', ['webpack-watch', 'server-watch']
