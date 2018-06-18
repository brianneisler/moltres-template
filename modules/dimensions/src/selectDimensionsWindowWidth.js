import { path } from 'moltres-utils'

const selectDimensionsWindowWidth = (state) => path([ 'dimensions', 'window', 'width' ], state)

export default selectDimensionsWindowWidth
