import { batchDeleteEntity } from 'moltres/core'
import { Preference } from '../schemas'

const batchDeletePreference = batchDeleteEntity(Preference)

export default batchDeletePreference
