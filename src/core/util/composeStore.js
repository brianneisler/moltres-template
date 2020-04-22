import { compose } from '../../utils/data'
import { createStore } from 'redux'

const composeStore = (reducer, enhancers, initialState) =>
  compose(...enhancers)(createStore)(reducer, initialState)

export default composeStore