import {
  RECIEVE_MEMO,
} from '../../actions/memo'



export default (state = {
  items: {},
}, action) => {
  switch (action.type) {
    case RECIEVE_MEMO:
      let titleMap = {}
      titleMap[action.item.title] = action.item
      return Object.assign({}, state, {
        items: titleMap
      })
    default:
      return state
  }
}
