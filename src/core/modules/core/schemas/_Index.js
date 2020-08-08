import PositiveInteger from './Integer'

const Index = {
  name: 'core.Index',
  schema: PositiveInteger.schema.positive().allow(0)
}

export default Index
