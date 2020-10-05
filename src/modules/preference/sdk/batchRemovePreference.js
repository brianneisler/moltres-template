import { batchRemoveEntity } from '../../../core/sdk'
import { Preference } from '../schemas'

const batchRemovePreference = batchRemoveEntity(Preference)

export default batchRemovePreference
