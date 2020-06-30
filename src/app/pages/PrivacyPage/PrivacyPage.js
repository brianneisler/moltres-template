import { StyleSheet } from 'react-native'
import { Styles } from '../../styles'
import { compose } from '../../../utils/lang'
import { defaultProps, setDisplayName } from '../../../utils/react'
import PageViewPage from '../PageViewPage'
import React from 'react'

const enhance = compose(
  setDisplayName('PrivacyPage'),
  defaultProps({
    styles: {
      ...Styles,
      ...StyleSheet.create({})
    }
  })
)

const PrivacyPage = enhance(({ styles }) => (
  <PageViewPage path="/legal/privacy" />
))

export default PrivacyPage
