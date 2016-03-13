import fs from 'fs'
import express from 'express'

import React, {createElement as $} from 'react'
import { renderToString } from 'react-dom/server'
import { RouterContext, match } from 'react-router'
import { rewind } from 'react-helmet'

import routes from '../app/routes'


function buildHtml(head, content) {

  return `
<!doctype html>
<html>
  <head>
    ${head.title.toString()}
    ${head.meta.toString()}
    ${head.link.toString()}
  </head>
  <body>
    <div id="app">${content}</div>
    <script src="/app.js"></script>
  </body>
</html>
`
}


const app = express()
app.use(express.static('build', {
  index: false
}))


app.get('/*', function(req, res) {
  // if (global.webpack_isomorphic_tools)
  // {
  //   global.webpack_isomorphic_tools.refresh()
  // }

  match({ routes, location: req.url }, (error, redirectLocation, renderProps) => {
    let head = rewind()
    if (error) {
      res.status(500).send(error.message)
    } else if (redirectLocation) {
      res.redirect(302, redirectLocation.pathname + redirectLocation.search)
    } else {
      let statusCode
      let html
      if (renderProps) {
        statusCode = 200
        html = buildHtml(head, renderToString(
          $(RouterContext, renderProps)
        ))
      } else {
        statusCode = 404
        html = 'Not found'
      }
      res.status(statusCode).send(html)
    }
  })
})


export default app
