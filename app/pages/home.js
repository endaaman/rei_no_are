import React, { Component } from 'react'
import { Link } from 'react-router'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { initialize } from 'redux-form'
import Helmet from 'react-helmet'

import { getMemos } from '../actions/memo'
import Root from '../components/root'
import Header from '../components/header'
import Footer from '../components/footer'

import MemoForm from '../forms/memo'
import styles from '../styles/home.css'


class MemoItem extends Component {
  render() {
    let memo = this.props.memo
    return (
      <li><Link to={`/memos/${memo.title}`}>{memo.title}</Link></li>
    )
  }
}



class Home extends Component {
  static loadProps({dispatch}) {
    return dispatch(getMemos())
  }
  componentWillMount() {
    this.constructor.loadProps(this.props)
  }
  render() {
    return (
      <Root>
        <Helmet
          title="Home"
        />
        <Header />
        <ul>
          {
            this.props.memos.map((memo)=> {
              return <MemoItem key={memo._id} memo={memo} />
            })
          }
        </ul>
        <Footer />
      </Root>
    )
  }
}

export default connect(state => {
  return {
    memos: state.memo.list.items
  }
})(Home)
