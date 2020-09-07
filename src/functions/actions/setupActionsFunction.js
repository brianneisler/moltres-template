import { generateEngine } from '../../core'
import { processAction, rejectAction, resolveAction } from '../../db/Action'
import { User, findUserById } from '../../db/User'
import { assoc, hasProp } from '../../utils/lang'
import setupFunctionContexts from '../setupFunctionContexts'

// perform desired operations ...
// Retrieve the current and previous value
// const data = change.after.data()
// const previousData = change.before.data()

const setCurrentUser = async (context, action, engine) => {
  if (hasProp('meta', action) && action.meta.causedByEntityType === User.name) {
    const currentUser = await findUserById(
      context,
      action.meta.causedByEntityId
    )
    context = assoc('currentUser', currentUser, context)
    await engine.setContext({ value: context })
    return context
  }
  return context
}

const setupActionsFunction = (modules, config) => async (
  snapshot,
  { params }
) => {
  let { context } = await setupFunctionContexts(config, 'actions')
  context.logger.info(
    'action received - snapshot.data():',
    snapshot.data(),
    ' params:',
    params
  )

  // const { id, type } = params
  const document = await processAction(context, snapshot)
  const { action } = document.data()
  const engine = generateEngine(modules, context)

  context = await setCurrentUser(context, action, engine)

  try {
    const results = await engine.dispatch(action)
    await resolveAction(context, document, results[0])
  } catch (error) {
    await rejectAction(context, document, error)
    throw error
  }
}

export default setupActionsFunction
