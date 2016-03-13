import React, {Component} from 'react'
import Helmet from 'react-helmet'
import { Router, Route, IndexRoute, Link, browserHistory } from 'react-router'

import styles from './style/home.css'

class Container extends Component {
  render() {
    return (
      <div>
        <Helmet
          title='React2'
        />
        {this.props.children}
      </div>
    )
  }
}

class Header extends Component {
  render() {
    return (
      <div>
        <ul>
          <li><Link to='/'>HOME</Link></li>
          <li><Link to='/about'>ABOUT</Link></li>
          <li><Link to='/aaa'>404</Link></li>
        </ul>
      </div>
    )
  }
}



class Home extends Component {
  render() {
    return (
      <div>
        <Header />
        <h2 className={styles.logo}>This is HOME page</h2>
      </div>
    )
  }
}

class About extends Component {
  render() {
    return (
      <div>
        <Header />
        <h2>This is ABOUT page</h2>
      </div>
    )
  }
}

class NoMatch extends Component {
  render() {
    return (
      <div>
        <Header />
        <h2>This is 404 page</h2>
      </div>
    )
  }
}

export default (
  <Route path='/' component={Container}>
    <IndexRoute name='home' component={Home} />
    <Route path='about' name='about' component={About} />
    <Route path='*' component={NoMatch} />
  </Route>
)
