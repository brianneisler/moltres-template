import { Integer, Object } from '../../../../core/schemas'

const Dimensions = {
  schema: Object.schema.keys({
    fontScale: Integer.schema.required(),
    height: Integer.schema.required(),
    scale: Integer.schema.required(),
    width: Integer.schema.required()
  }),
  type: 'dimensions.Dimensions'
}

export default Dimensions
