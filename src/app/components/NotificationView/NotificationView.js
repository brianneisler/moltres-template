import { compose } from 'moltres/lang'
import { setDisplayName, setPropTypes } from 'moltres/react'
import PropTypes from 'prop-types'

import { ChannelType } from '../../../constants'
import { renderNotification } from '../../../modules/notification'

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
