import express from 'express'

import React, {createElement as $} from 'react'
import { renderToString, renderToStaticMarkup } from 'react-dom/server'
import { RouterContext, match } from 'react-router'
import { rewind } from 'react-helmet'
import { Provider } from 'react-redux'

import routes from '../app/routes'
import configureStore from '../app/store/configure'


function buildHtml(content, initialState, webpackIsomorphicTools) {
  const head = rewind()
  const assets = webpackIsomorphicTools.assets()

  const styles = []
  for (let name in assets.styles) {
    let path = assets.styles[name]
    styles.push(` <link rel="stylesheet" href="${path}"/>`)
  }

  const scripts = []
  for (let name in assets.javascript) {
    let path = assets.javascript[name]
    scripts.push(`<script src="${path}"></script>`)
  }

  return `
<!doctype html>
<html>
  <head>
    ${head.title.toString()}
    ${head.meta.toString()}
    ${head.link.toString()}
    ${styles.join('')}
  </head>
  <body>
    <div id="app">${content}</div>
    <div id="initialState" style="display: none" data-data='${JSON.stringify(initialState)}'></div>
    ${scripts.join('')}
  </body>
</html>
`
}

export default function(req, res, webpackIsomorphicTools) {
  match({routes, location: req.originalUrl}, (error, redirectLocation, renderProps) => {
    if (error) {
      res.status(500).send(error.message)
    } else if (redirectLocation) {
      res.redirect(302, redirectLocation.pathname + redirectLocation.search)
    } else if (!renderProps) {
      res.status(404).send('Not found')
    } else {
      const store = configureStore({})

      const render = ()=> {
        const provider = $(Provider, {store: store}, $(RouterContext, renderProps))
        const initialState = store.getState()
        const content = renderToString(provider)
        const html = buildHtml(content, initialState, webpackIsomorphicTools)
        const notFound = renderProps.routes.filter(route => route.name === '404').length > 0
        res.status(notFound ? 404 : 200).send(html)
      }

      const params = {
        dispatch: store.dispatch,
        params: renderProps.params,
      }

      const promises = renderProps.components.map(c => {
        return (c && c.loadProps) ? c.loadProps(params) : Promise.resolve()
      })
      Promise.all(promises).then(render)
    }
  })
}
