import React, { Component } from 'react'
import { Link } from 'react-router'
import { connect } from 'react-redux'
import Helmet from 'react-helmet'
import marked from 'marked'

import Root from '../components/root'
import Header from '../components/header'

import { getMemo } from '../actions/memo'

class Memo extends Component {
  static loadProps({dispatch, params}) {
    return dispatch(getMemo(params.title))
  }
  componentWillMount() {
    this.constructor.loadProps(this.props)
  }
  getContentHtml() {
    let html = ''
    if (this.props.memo.content) {
      html = marked(this.props.memo.content)
    }
    return {
      __html: html
    }
  }
  render() {
    return (
      <Root>
        <Helmet
          title={this.props.memo.title}
        />
        <Header />
        <h2>{this.props.memo.title}</h2>
        <div dangerouslySetInnerHTML={this.getContentHtml()} />
      </Root>
    )
  }
}

export default connect((state, ownProps) => {
  return {
    title: ownProps.params.title,
    memo: state.memo.detail.items[ownProps.params.title] || {}
  }
})(Memo)
