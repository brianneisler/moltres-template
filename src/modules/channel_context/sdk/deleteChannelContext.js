import { deleteEntity } from '../../../core/sdk'
import { ChannelContext } from '../schemas'

const deleteChannelContext = deleteEntity(ChannelContext)

export default deleteChannelContext
