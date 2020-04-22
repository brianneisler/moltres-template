import { UncaughtExceptionAction } from '../schemas'
import { actionBuilder } from '../../../../utils/lang'

const uncaughtExceptionAction = actionBuilder({
  Schema: UncaughtExceptionAction
})

export default uncaughtExceptionAction
