import { path } from 'ramda'

const selectDimensionsWindowHeight = (state) => path([ 'dimensions', 'window', 'height' ], state)

export default selectDimensionsWindowHeight
