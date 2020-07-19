import { String } from '../../../core/schemas'
import { Entity } from '../../Entity'

const App = {
  collectionName: 'Apps',
  name: 'App',
  schema: Entity.schema.keys({
    description: String.schema.required(),
    hostId: String.schema.required(),
    name: String.schema.required(),
    slug: String.schema.required()
  })
}

export default App
