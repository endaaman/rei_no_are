import {
  RECIEVE_MEMOLIST,
} from '../../actions/memo'



export default (state = {
  items: [],
}, action) => {
  switch (action.type) {
    case RECIEVE_MEMOLIST:
      return Object.assign({}, state, {
        items: action.items,
      })
    default:
      return state
  }
}
