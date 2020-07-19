import React from 'react'
import { StyleSheet } from 'react-native'

import { compose } from '../../../utils/lang'
import { defaultProps, setDisplayName } from '../../../utils/react'
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
