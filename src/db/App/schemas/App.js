import { Entity } from '../../Entity'
import { String } from '../../../core/schemas'

const App = {
  collectionName: 'Apps',
  name: 'App',
  schema: Entity.keys({
    description: String.schema.required(),
    name: String.schema.required(),
    slug: String.schema.required(),
    url: String.schema.required()
  })
}

export default App
