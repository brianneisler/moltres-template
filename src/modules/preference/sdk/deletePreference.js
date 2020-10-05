import { deleteEntity } from '../../../core/sdk'
import { Preference } from '../schemas'

const deletePreference = deleteEntity(Preference)

export default deletePreference
