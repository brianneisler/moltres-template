import { Boolean, Object, String } from '../../core/schemas'

const TestConfig = {
  name: 'test.TestConfig',
  schema: Object.schema.keys({
    integration: Boolean.schema,
    runId: String.schema.required()
  })
}

export default TestConfig
