import { Colors, Styles } from '../../styles'
import { StyleSheet } from 'react-native'
import { compose } from '../../../utils/lang'
import {
  defaultProps,
  memo,
  setDisplayName,
  setPropTypes,
  styleShape,
  withProps
} from '../../../utils/react'
import PageContainer from '../PageContainer'
import PageContentView from '../PageContentView'
import PropTypes from 'prop-types'
import React from 'react'

const enhance = compose(
  setDisplayName('PageContentView'),
  setPropTypes({
    entity: PropTypes.object,
    page: PropTypes.object,
    style: styleShape
  }),
  defaultProps({
    styles: {
      ...Styles,
      ...StyleSheet.create({
        pageContent: {
          backgroundColor: Colors.whitePrimary,
          flex: 1,
          flexDirection: 'row',
          justifyContent: 'center',
          width: '100%'
        }
      })
    }
  }),
  withProps(({ entity, page }) => ({
    page: page || entity
  })),
  memo
)

const PageView = enhance(({ page, style, styles }) => {
  // TODO BRN: Handle query errors. They will be located at entity.error
  return (
    <PageContainer style={[styles.content, style]}>
      <PageContentView
        pageContent={page.page.content}
        style={styles.pageContent}
      />
    </PageContainer>
  )
})

export default PageView
