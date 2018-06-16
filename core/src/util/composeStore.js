import { createStore } from 'redux'
import compose from '../compose'

const composeStore = (reducer, enhancers) =>
  compose(...enhancers)(createStore)(reducer)

export default composeStore
