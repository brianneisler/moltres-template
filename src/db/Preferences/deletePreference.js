import { deleteEntity } from '../Entity'

import { Preference } from './schemas'

const deletePreference = deleteEntity(Preference)

export default deletePreference
