import React, { createElement as $ } from 'react'
import { render } from 'react-dom'
import { Router, match, browserHistory } from 'react-router'
import { Provider } from 'react-redux'
import { syncHistoryWithStore } from 'react-router-redux'

import routes from './routes'
import configureStore from './store/configure'
import reducer from './reducers/combined'

import './styles/global.css'

const rootDom = document.getElementById('app')

let initialState = {}
try{
  initialState = JSON.parse(document.getElementById('initialState').dataset.data)
} catch(e) {
}


let store = configureStore(initialState)
const history = syncHistoryWithStore(browserHistory, store)

match({ routes, history }, (error, redirectLocation, renderProps) => {
  render(
    $(
      Provider, {store: store}, $(Router, renderProps)
    ),
    rootDom
  )
})
