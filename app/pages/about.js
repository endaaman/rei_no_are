import React, {Component} from 'react'
import Helmet from 'react-helmet'

import Root from '../components/root'
import Header from '../components/header'
import Footer from '../components/footer'


class About extends Component {
  render() {
    return (
      <Root>
        <Helmet
          title="About"
        />
        <Header />
        <h2>About!!</h2>
        <p>a12123</p>
        <Footer />
      </Root>
    )
  }
}


export default About
