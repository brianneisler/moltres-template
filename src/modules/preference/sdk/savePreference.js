import { saveEntity } from 'moltres/core'
import { Preference } from '../schemas'

const savePreference = saveEntity(Preference)

export default savePreference
