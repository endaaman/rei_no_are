import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import { reducer as formReducer } from 'redux-form'
import memoReducer from './memo'

export default combineReducers({
  memo: memoReducer,
  form: formReducer,
  routing: routerReducer,
})

// export default memosReducer
