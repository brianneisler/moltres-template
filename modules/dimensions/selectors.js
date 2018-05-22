import { path } from 'ramda'

export const selectDimensionsWindowHeight = (state) => path([ 'dimensions', 'window', 'height' ], state)
export const selectDimensionsWindowWidth = (state) => path([ 'dimensions', 'window', 'width' ], state)
