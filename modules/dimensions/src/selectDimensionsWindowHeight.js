import { path } from 'moltres-utils'

const selectDimensionsWindowHeight = (state) => path(['dimensions', 'window', 'height'], state)

export default selectDimensionsWindowHeight
