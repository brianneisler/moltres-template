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
  setDisplayName('TermsPage'),
  defaultProps({
    styles: {
      ...Styles,
      ...StyleSheet.create({})
    }
  }),
  connect((state) => ({})),
  memo
)

const TermsPage = enhance(({ styles }) => {
  return (
    <Page description="Terms of Service">
      <PageContentView />
    </Page>
  )
})

export default TermsPage
