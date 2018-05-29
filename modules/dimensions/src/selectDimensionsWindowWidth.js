import { path } from 'ramda'

const selectDimensionsWindowWidth = (state) => path([ 'dimensions', 'window', 'width' ], state)

export default selectDimensionsWindowWidth
