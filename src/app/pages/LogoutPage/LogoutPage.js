import { Styles } from '../../styles'
import { Text, View } from '../../components'
import { compose } from '../../../utils/lang'
import { defaultProps, setDisplayName } from '../../../utils/react'
import React from 'react'

const enhance = compose(
  setDisplayName('LogoutPage'),
  defaultProps({
    styles: Styles
  })
)

const LogoutPage = enhance(({ styles }) => {
  return (
    <View style={styles.page}>
      <View style={styles.paddedBlock}>
        <Text style={styles.mediumText}>Logging out...</Text>
      </View>
    </View>
  )
})

export default LogoutPage
