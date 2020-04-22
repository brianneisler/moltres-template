import { ChannelContext } from './schemas'
import { deleteEntity } from '../Entity'

const deleteChannelContext = deleteEntity(ChannelContext)

export default deleteChannelContext
