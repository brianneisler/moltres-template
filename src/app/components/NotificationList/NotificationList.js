import { compose } from 'moltres/lang'
import { setDisplayName, setPropTypes } from 'moltres/react'
import PropTypes from 'prop-types'
import React from 'react'

import NotificationView from '../NotificationView'
import PaginatedQueryView from '../PaginatedQueryView'

const enhance = compose(
  setDisplayName('NotificationList'),
  setPropTypes({
    userId: PropTypes.string.isRequired
  })
)

const renderNotificationRow = (rowData) => (
  <NotificationView notification={rowData} />
)

const NotificationList = enhance(({ userId }) => (
  <PaginatedQueryView
    queryKey={`Notifications.${userId}`}
    renderItem={renderNotificationRow}
  />
))

export default NotificationList
