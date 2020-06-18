import { UncaughtExceptionAction } from '../schemas'
import { actionBuilder } from '../../../../utils/redux'

const uncaughtExceptionAction = actionBuilder({
  Schema: UncaughtExceptionAction
})

export default uncaughtExceptionAction
