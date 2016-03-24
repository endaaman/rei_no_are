import axios from 'axios'
import { keyBy, isOnServer } from '../util'

export const RECIEVE_MEMOLIST = 'RECIEVE_MEMOLIST'
export const RECIEVE_MEMO = 'RECIEVE_MEMO'


export function getMemos() {
  return (dispatch, getState)=> {
    let state = getState().memo.list
    if (state.items.length > 0) {
      return Promise.resolve(getState())
    } else {
      return dispatch(fetchMemos())
    }
  }
}


export function fetchMemos() {
  return (dispatch)=> {
    return axios.get('http://localhost:3000/api/memos')
    .then(res => {
      dispatch({
        type: RECIEVE_MEMOLIST,
        items: res.data,
      })
    })
  }
}


export function getMemo(id) {
  return (dispatch, getState)=> {
    let state = getState().memo.detail
    if (state.items[id]) {
      return Promise.resolve(getState())
    } else {
      return dispatch(fetchMemo(id))
    }
  }
}


export function fetchMemo(id) {
  return (dispatch)=> {
    return axios.get(`http://localhost:3000/api/memos/${id}`)
    .then(res => {
      dispatch({
        type: RECIEVE_MEMO,
        item: res.data,
        isFetched: true,
      })
    })
  }
}
