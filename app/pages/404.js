import React, {Component} from 'react'
import Helmet from 'react-helmet'

import Root from '../components/root'
import Header from '../components/header'

class NoMatch extends Component {
  render() {
    return (
      <Root>
        <Helmet
          title="404"
        />
        <Header />
        <h2>This is 404 page</h2>
      </Root>
    )
  }
}

export default NoMatch
