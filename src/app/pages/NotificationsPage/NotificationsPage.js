import { compose } from 'moltres/lang'
import { connect, defaultProps, memo, setDisplayName } from 'moltres/react'
import React from 'react'

import { NotificationList, PageContainer } from '../../components'
import { selectCurrentUser } from '../../modules/auth'
import { Styles } from '../../styles'

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
    <PageContainer description="Your Notifications" robotsContent="noindex">
      <NotificationList userId={currentUser.id} />
    </PageContainer>
  )
})

export default NotificationPage
