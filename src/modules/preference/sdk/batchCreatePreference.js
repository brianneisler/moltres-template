import { batchCreateEntity } from 'moltres/core'
import { Preference } from '../schemas'

const batchCreatePreference = batchCreateEntity(Preference)

export default batchCreatePreference
