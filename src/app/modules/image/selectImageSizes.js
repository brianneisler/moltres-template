import { curry, getPath } from '../../../utils/lang'

const selectImageSize = curry((uri, state) =>
  getPath(['image', 'sizes', uri], state)
)

export default selectImageSize
