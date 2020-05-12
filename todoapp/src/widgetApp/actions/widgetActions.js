import { TOGGLE_WIDGET } from '../types/action-types'

export function toggleWidget (widget, index) {
  return {
    type: TOGGLE_WIDGET,
    result: {
      widget: { ...widget },
      index
    }
  }
}
