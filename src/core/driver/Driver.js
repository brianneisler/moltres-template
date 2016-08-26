import _ from 'mudash'

export default class Driver {

  constructor(info) {
    this.info = info
    this.initialized = false
    this.state = null
    this.dispatch = null
  }

  updateState(state, dispatch) {
    if (_.isFunction(this.receiveState)) {
      this.receiveState(state, dispatch)
    }
    this.state = state
    this.dispatch = dispatch
  }
}
