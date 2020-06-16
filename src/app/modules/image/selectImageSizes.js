import { curry, getPath } from '../../../utils/data'

const selectImageSize = curry((uri, state) =>
  getPath(['image', 'sizes', uri], state)
)

export default selectImageSize
