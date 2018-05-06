const createAction = (action, context) =>
  async function(args) {
    return action(this, args, context)
  }

export default createAction
