import { combineReducers } from 'redux'
import composeStore from './composeStore'
import filterEnhancers from './filterEnhancers'
import filterReducers from './filterReducers'

const buildStore = (modules) =>
  composeStore(
    combineReducers(filterReducers(modules)),
    filterEnhancers(modules)
  )

export default buildStore
