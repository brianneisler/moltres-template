import { Object, Uri } from 'moltres/core'

const FirestoreConfig = {
  name: 'firestore.FirestoreConfig',
  schema: Object.schema.keys({
    storageBucket: Uri.schema
  })
}

export default FirestoreConfig
