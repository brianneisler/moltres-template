import { compose } from 'moltres/lang'
import PropTypes from 'prop-types'
import React from 'react'

import {
  defaultProps,
  setDisplayName,
  setPropTypes,
  styleShape
} from 'moltres/react'
import { formatTimeAgo } from 'moltres/time'
import Text from '../Text'

import _styleSheet from './styleSheet'

const enhance = compose(
  setDisplayName('TimeAgo'),
  setPropTypes({
    style: styleShape,
    time: PropTypes.oneOfType([PropTypes.instanceOf(Date), PropTypes.number])
      .isRequired
  }),
  defaultProps({
    styleSheet: _styleSheet
  })
)

const TimeAgo = enhance(({ style, styleSheet, time }) => (
  <Text style={[styleSheet.timeAgoText, style]}>{`last updated: ${formatTimeAgo(
    time
  )}`}</Text>
))

export default TimeAgo
