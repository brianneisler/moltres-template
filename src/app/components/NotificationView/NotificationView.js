import PropTypes from 'prop-types'

import { ChannelType } from '../../../constants'
import { renderNotification } from '../../../sdk/notification'
import { compose } from '../../../utils/lang'
import { setDisplayName, setPropTypes } from '../../../utils/react'

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
