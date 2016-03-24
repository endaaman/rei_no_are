import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { createHistory } from 'history'
import promiseMiddleware from 'redux-promise'
import combinedReducer from '../reducers/combined'

import { createPromiseWatchMiddleware, isOnServer } from '../util'
import routes from '../routes'



export default function(initialState = {}) {
  const middlewares = []
  // middlewares.push(promiseMiddleware)
  middlewares.push(thunk)
  let promiseWatchMiddleware
  // if (isOnServer()) {
    promiseWatchMiddleware = createPromiseWatchMiddleware()
    middlewares.push(promiseWatchMiddleware)
  // }

  const store = createStore(
    combinedReducer,
    initialState,
    applyMiddleware(...middlewares)
  )
  // if (isOnServer()) {
    store.promiseWatchMiddleware = promiseWatchMiddleware
  // }
  return store
}
