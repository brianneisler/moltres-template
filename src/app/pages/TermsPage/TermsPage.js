import { compose } from 'moltres/lang'
import { defaultProps, setDisplayName } from 'moltres/react'
import React from 'react'
import { StyleSheet } from 'react-native'

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

const TermsPage = enhance(({}) => <PageViewPage path="/legal/terms" />)

export default TermsPage
