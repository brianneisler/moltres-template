import { createStore } from 'redux'

import { compose } from '../../utils/lang'

const composeStore = (reducer, enhancers, initialState) =>
  compose(...enhancers)(createStore)(reducer, initialState)

export default composeStore
