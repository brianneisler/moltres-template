import Integer from './Integer'

const PositiveInteger = {
  name: 'core.PositiveInteger',
  schema: Integer.schema.positive()
}

export default PositiveInteger
