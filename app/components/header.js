import React, {Component} from 'react'
import { Link } from 'react-router'

import styles from '../styles/header.css'
import icon from '../assets/endaaman.png'

class Header extends Component {
  render() {
    return (
      <div className={styles.header}>
        <div className={styles.icon}>
          <img src={icon} />
        </div>
        <div className={styles.message}>endaaman /
          <span className={styles.links}>
            <a href="https://github.com/endaaman" target="_blank">Github</a>
            <span> - </span>
            <a href="http://twitter.com/endaaman" target="_blank">Twitter</a>
          </span>
          </div>
      </div>
    )
  }
}


export default Header
