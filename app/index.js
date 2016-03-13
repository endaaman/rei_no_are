import React from 'react'
import { render } from 'react-dom'
import { Router, match, browserHistory } from 'react-router'

import routes from './routes.jsx'

import styles from './style/index.css'


// let style = require('./style/index.css')
// console.log(style)

const rootDom = document.getElementById('app')

match({ routes, history: browserHistory }, (error, redirectLocation, renderProps) => {
  render(React.createElement(Router, renderProps), rootDom)
})
