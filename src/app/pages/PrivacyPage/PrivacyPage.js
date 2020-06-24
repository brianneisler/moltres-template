import { Page, PageContentView } from '../../components'
import { StyleSheet } from 'react-native'
import { Styles } from '../../styles'
import { compose } from '../../../utils/lang'
import {
  connect,
  defaultProps,
  memo,
  setDisplayName
} from '../../../utils/react'
import React from 'react'

const enhance = compose(
  setDisplayName('PrivacyPage'),
  defaultProps({
    styles: {
      ...Styles,
      ...StyleSheet.create({})
    }
  }),
  connect((state) => ({})),
  memo
)

const PrivacyPage = enhance(({ styles }) => (
  <Page description="Privacy Policy">
    <PageContentView />
  </Page>
))

export default PrivacyPage
