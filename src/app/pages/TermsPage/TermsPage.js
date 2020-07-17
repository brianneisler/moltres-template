import React from 'react'
import { StyleSheet } from 'react-native'

import { compose } from '../../../utils/lang'
import { defaultProps, setDisplayName } from '../../../utils/react'
import { Styles } from '../../styles'
import PageViewPage from '../PageViewPage'

const enhance = compose(
  setDisplayName('TermsPage'),
  defaultProps({
    styles: {
      ...Styles,
      ...StyleSheet.create({})
    }
  })
)

const TermsPage = enhance(({ styles }) => <PageViewPage path="/legal/terms" />)

export default TermsPage
