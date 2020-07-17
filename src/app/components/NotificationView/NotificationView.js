import { ChannelType } from '../../../constants'
import { compose } from '../../../utils/lang'
import { renderNotification } from '../../../sdk/notification'
import { setDisplayName, setPropTypes } from '../../../utils/react'
import PropTypes from 'prop-types'

const enhance = compose(
  setDisplayName('NotificationView'),
  setPropTypes({
    notification: PropTypes.object
  })
)

const NotificationView = enhance(({ notification }) =>
  renderNotification(null, ChannelType.COMPONENT, notification)
)

export default NotificationView
