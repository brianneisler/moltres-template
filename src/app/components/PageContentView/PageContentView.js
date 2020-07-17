import PropTypes from 'prop-types'
import React from 'react'
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
import { Colors, Styles } from '../../styles'
import View from '../View'

import { renderPageContent } from './util'

const enhance = compose(
  setDisplayName('PageContentView'),
  setPropTypes({
    entity: PropTypes.object,
    pageContent: PropTypes.object,
    style: styleShape
  }),
  defaultProps({
    styles: {
      ...Styles,
      ...StyleSheet.create({
        content: {
          backgroundColor: Colors.whitePrimary,
          flex: 1,
          flexDirection: 'row',
          justifyContent: 'center',
          width: '100%'
        }
      })
    }
  }),
  withProps(({ entity, pageContent }) => ({
    pageContent: pageContent || entity
  })),
  memo
)

const PageContentView = enhance(({ pageContent, style, styles }) => {
  // TODO BRN: Handle query errors. They will be located at entity.error
  return (
    <View style={[styles.content, style]}>
      {renderPageContent(pageContent)}
    </View>
  )
})

export default PageContentView
