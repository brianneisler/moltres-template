import { saveEntity } from '../../../core/sdk'
import { Preference } from '../schemas'

const savePreference = saveEntity(Preference)

export default savePreference
