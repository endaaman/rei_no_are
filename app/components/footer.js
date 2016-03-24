import React, {Component} from 'react'

import styles from '../styles/footer.css'


class Footer extends Component {
  constructor(props, context) {
    super(props, context)

    this.state = {
      builtAt: ''
    }
  }

  componentDidMount() {
    if (typeof global.__BUILT_AT__ !== 'undefined') {
      this.setState({
        builtAt: new Date(global.__BUILT_AT__).toLocaleString()
      })

    }
  }
  render() {
    // let builtAt = (new Date(window.__BUILT_AT__)).toString()
    return (
      <div className={styles.footer}>
        <hr />
        <div>Build at {this.state.builtAt}</div>
      </div>
    )
  }
}


export default Footer
