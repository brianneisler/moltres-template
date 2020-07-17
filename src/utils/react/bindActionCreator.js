const bindActionCreator = (actionCreator, dispatch) => {
  return function (...args) {
    return dispatch(actionCreator.apply(this, args))
  }
}

export default bindActionCreator
