import { isContext, prepend } from '../lang'

const bindActionCreator = (actionCreator, store) => {
  const { dispatch } = store
  return function (...args) {
    if (actionCreator.requiresContext) {
      let context = args[0]
      if (!isContext(context)) {
        context = store.getContext()
        args = prepend(context, args)
      }
    }
    return dispatch(actionCreator.apply(this, args))
  }
}

export default bindActionCreator
