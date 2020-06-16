import { compose } from '../../../utils/data'
import { setDisplayName, setPropTypes } from '../../../utils/react'
import NotificationView from '../NotificationView'
import PaginatedQueryView from '../PaginatedQueryView'
import PropTypes from 'prop-types'
import React from 'react'

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
    renderRow={renderNotificationRow}
  />
))

export default NotificationList
