import { combineReducers } from 'redux'

import widgetReducer from './widgetReducer'

const appReducer = combineReducers({
  widget: widgetReducer
})

const RootReducer = (state, action) => {
  return appReducer(state, action)
}

export default RootReducer
