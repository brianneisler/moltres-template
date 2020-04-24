import { Upload } from './schemas'
import { deleteEntity } from '../Entity'

const deleteUpload = deleteEntity(Upload)

export default deleteUpload
