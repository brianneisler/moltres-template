import { curry, getPath } from 'moltres/lang'

const selectImageSize = curry((uri, state) =>
  getPath(['image', 'sizes', uri], state)
)

export default selectImageSize
