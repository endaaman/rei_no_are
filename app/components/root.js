import React, {Component} from 'react'
import Helmet from 'react-helmet'

import styles from '../styles/root.css'


class Root extends Component {
  render() {
    return (
      <div className={styles.root}>
        <Helmet
          titleTemplate="%s | えんだーまんの家"
        />
        {this.props.children}
      </div>
    )
  }
}

export default Root
