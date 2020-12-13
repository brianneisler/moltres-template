import { compose } from 'moltres/lang'
import { defaultProps, setDisplayName } from 'moltres/react'
import React from 'react'
import { StyleSheet } from 'react-native'

import { Styles } from '../../styles'
import PageViewPage from '../PageViewPage'

const enhance = compose(
  setDisplayName('PrivacyPage'),
  defaultProps({
    styles: {
      ...Styles,
      ...StyleSheet.create({})
    }
  })
)

const PrivacyPage = enhance(({}) => <PageViewPage path="/legal/privacy" />)

export default PrivacyPage
