import { Colors, Styles } from '../../styles'
import { StyleSheet } from 'react-native'
import { compose } from '../../../utils/lang'
import {
  defaultProps,
  memo,
  setDisplayName,
  setPropTypes
} from '../../../utils/react'
import { renderPageContent } from './util'
import PropTypes from 'prop-types'
import React from 'react'
import View from '../View'

const enhance = compose(
  setDisplayName('PageContentView'),
  setPropTypes({
    // NOTE BRN: The PageContent is passed in as entity here so that it is
    // compatible with
    entity: PropTypes.object
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
  memo
)
const PageContentView = enhance(({ entity, styles }) => {
  // TODO BRN: Handle query errors. They will be located at entity.error
  return <View style={styles.content}>{renderPageContent(entity)}</View>
})

export default PageContentView
