import { saveEntity } from '../../../core/sdk'
import { Error } from '../schemas'

const saveError = saveEntity(Error)

export default saveError
