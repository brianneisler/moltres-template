import { compose } from 'moltres/lang'
import { defaultProps, setDisplayName, setPropTypes } from 'moltres/react'
import PropTypes from 'prop-types'
import React from 'react'

import { Styles } from '../../styles'
import Text from '../Text'

const enhance = compose(
  setDisplayName('LoadingError'),
  setPropTypes({
    message: PropTypes.string,
    style: Text.propTypes.style
  }),
  defaultProps({
    message: 'An error occurred while loading. Please retry...',
    styles: Styles
  })
)

const LoadingError = enhance(({ message, styles }) => (
  <Text style={[styles.container, styles.errorText]}>{message}</Text>
))

export default LoadingError
