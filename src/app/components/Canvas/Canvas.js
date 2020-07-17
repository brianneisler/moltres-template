import { compose } from '../../../utils/lang'
import {
  setDisplayName,
  setPropTypes,
  withForwardRef
} from '../../../utils/react'
import PropTypes from 'prop-types'
import React from 'react'
import View from '../View'

const enhance = compose(
  withForwardRef(),
  setDisplayName('Canvas'),
  setPropTypes({
    height: PropTypes.number.isRequired,
    onLayout: PropTypes.func,
    width: PropTypes.number.isRequired
  })
)

const Canvas = enhance(({ forwardRef, height, onLayout, width }) => {
  return (
    <View onLayout={onLayout}>
      <canvas height={height} ref={forwardRef} width={width} />
    </View>
  )
})

export default Canvas
