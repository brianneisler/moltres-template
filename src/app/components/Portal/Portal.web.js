import PropTypes from 'prop-types'
import ReactDOM from 'react-dom'

import { compose } from '../../../utils/lang'
import {
  defaultProps,
  lifecycle,
  setDisplayName,
  setPropTypes
} from '../../../utils/react'

const enhance = compose(
  setDisplayName('Portal'),
  setPropTypes({
    children: PropTypes.node.isRequired
  }),
  defaultProps({
    el: document.createElement('div'),
    target: document.body
  }),
  lifecycle({
    componentDidMount() {
      this.props.target.appendChild(this.props.el)
    },
    componentWillUnmount() {
      this.props.target.removeChild(this.props.el)
    }
  })
)

const Portal = enhance(({ children, el }) => {
  return ReactDOM.createPortal(children, el)
})

export default Portal
