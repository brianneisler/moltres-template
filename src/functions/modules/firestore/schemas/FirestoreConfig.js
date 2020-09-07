import { Object, Uri } from '../../../../core/schemas'

const FirestoreConfig = {
  name: 'firestore.FirestoreConfig',
  schema: Object.schema.keys({
    storageBucket: Uri.schema.required()
  })
}

export default FirestoreConfig
