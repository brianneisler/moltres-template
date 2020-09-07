import { actionBuilder } from '../../../../utils/redux'
import { NextPageAction } from '../schemas'

const nextPageAction = actionBuilder({
  Schema: NextPageAction
})

export default nextPageAction
