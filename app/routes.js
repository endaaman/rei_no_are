import React, {Component} from 'react'
import { Router, Route, IndexRoute } from 'react-router'

import Home from './pages/home'
import About from './pages/about'
import Memo from './pages/memo'
import NoMatch from './pages/404'



export default (
  <Route path='/'>
    <IndexRoute name='home' component={Home} />
    <Route path='about' name='about' component={About} />
    <Route path='memos/:title' name='memo' component={Memo} />
    <Route path='*' name='404' component={NoMatch} />
  </Route>
)
