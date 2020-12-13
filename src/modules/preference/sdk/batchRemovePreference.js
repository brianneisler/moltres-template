import { batchRemoveEntity } from 'moltres/core'
import { Preference } from '../schemas'

const batchRemovePreference = batchRemoveEntity(Preference)

export default batchRemovePreference
