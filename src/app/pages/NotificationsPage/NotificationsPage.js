import { NotificationList, Page } from '../../components'
import { Styles } from '../../styles'
import { compose } from '../../../utils/lang'
import {
  connect,
  defaultProps,
  memo,
  setDisplayName
} from '../../../utils/react'
import { selectCurrentUser } from '../../modules/auth'
import React from 'react'

const enhance = compose(
  setDisplayName('NotificationsPage'),
  defaultProps({
    styles: Styles
  }),
  connect((state) => ({
    currentUser: selectCurrentUser(state)
  })),
  memo
)

const NotificationPage = enhance(({ currentUser }) => {
  return (
    <Page description="Your Notifications" robotsContent="noindex">
      <NotificationList userId={currentUser.id} />
    </Page>
  )
})

export default NotificationPage
