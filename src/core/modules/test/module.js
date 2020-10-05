import * as schemas from './schemas'
import { TestConfig } from './schemas'

const mod = () => ({
  schemas
})

mod.configSchema = TestConfig

export default mod
