import { actionBuilder } from '../../../utils/redux'
import { DocumentReadyAction } from '../schemas'

const documentReadyAction = actionBuilder({
  Schema: DocumentReadyAction
})

export default documentReadyAction
