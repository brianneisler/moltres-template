import { saveEntity } from 'moltres/core'
import { Error } from '../schemas'

const saveError = saveEntity(Error)

export default saveError
