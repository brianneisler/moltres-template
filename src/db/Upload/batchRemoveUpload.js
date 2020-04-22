import { Upload } from './schemas'
import { batchRemoveEntity } from '../Entity'

const batchRemoveUpload = batchRemoveEntity(Upload)

export default batchRemoveUpload
