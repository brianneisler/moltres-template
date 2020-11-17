import { deleteEntity } from 'moltres/core'
import { Preference } from '../schemas'

const deletePreference = deleteEntity(Preference)

export default deletePreference
