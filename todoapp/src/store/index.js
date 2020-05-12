import { createStore } from 'redux'
import rootReducer from '../widgetApp/reducers'

const store = createStore(rootReducer)

export default store
