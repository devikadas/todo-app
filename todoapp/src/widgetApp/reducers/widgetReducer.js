import { TOGGLE_WIDGET } from '../types/action-types'

const initialState = {
  names: [
    { name: 'WATCHLIST', isExpanded: false, isHidden: false },
    { name: 'POSITIONS', isExpanded: false, isHidden: false },
    { name: 'CHART', isExpanded: false, isHidden: false },
    { name: 'ACCOUNTS', isExpanded: false, isHidden: false }
  ]
}

const WidgetReducer = (state = initialState, action) => {
  let result
  switch (action.type) {
    case TOGGLE_WIDGET:
      result = action.result || []
      const newWidgetNames = state.names.slice(0)
      newWidgetNames[result.index].isExpanded = !newWidgetNames[result.index]
        .isExpanded
      const isExpanded = newWidgetNames[result.index].isExpanded
      if (isExpanded) {
        for (let i = 0; i < newWidgetNames.length; i++) {
          newWidgetNames[i].isHidden = true
          if (i === result.index) newWidgetNames[i].isHidden = false
        }
      } else {
        for (let i = 0; i < newWidgetNames.length; i++) {
          newWidgetNames[i].isHidden = false
        }
      }
      return { ...state, names: newWidgetNames }
    default:
      return state
  }
}

export default WidgetReducer
