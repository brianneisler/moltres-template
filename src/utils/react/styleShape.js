import PropTypes from 'prop-types'

const styleShape = PropTypes.oneOfType([
  PropTypes.object,
  PropTypes.array,
  PropTypes.number
])

export default styleShape
