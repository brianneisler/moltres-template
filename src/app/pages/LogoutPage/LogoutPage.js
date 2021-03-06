import React from 'react'

import { compose } from '../../../utils/lang'
import { defaultProps, memo, setDisplayName } from '../../../utils/react'
import { PageContainer, Text, View } from '../../components'
import { Styles } from '../../styles'

const enhance = compose(
  setDisplayName('LogoutPage'),
  defaultProps({
    styles: Styles
  }),
  memo
)

const LogoutPage = enhance(({ styles }) => {
  return (
    <PageContainer description="Logout">
      <View style={styles.paddedBlock}>
        <Text style={styles.mediumText}>Logging out...</Text>
      </View>
    </PageContainer>
  )
})

export default LogoutPage
