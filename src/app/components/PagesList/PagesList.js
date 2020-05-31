import { Platform } from 'react-native'
import { Styles } from '../../styles'
import { compose, getPath, negate, shallowEquals, sortBy } from '../../../utils/data'
import {
  defaultProps,
  flattenPages,
  idsOfValues,
  keyValuesById,
  setDisplayName,
  setPropTypes,
  withHandlers,
  withPropsOnChange
} from '../../../utils/react'
import InfiniteInvertibleScrollView from '../InfiniteInvertibleScrollView'
import ListView from '../ListView'
import PropTypes from 'prop-types'
import React from 'react'

const enhance = compose(
  setDisplayName('PagesList'),
  setPropTypes({
    pages: PropTypes.object,
    renderRow: PropTypes.func.isRequired,
    sortRows: PropTypes.func
  }),
  defaultProps({
    dataSource: new ListView.DataSource({ rowHasChanged: (r1, r2) => !shallowEquals(r1, r2) }),
    sortRows: (rows) => sortBy((value) => negate(getPath(['createdAt', 'seconds'], value)), rows),
    styles: Styles
  }),
  withPropsOnChange(['pages', 'sortRows'], ({ pages, sortRows }) => ({
    sortedRows: sortRows(flattenPages(pages))
  })),
  withPropsOnChange(['sortedRows'], ({ dataSource, sortedRows }) => ({
    dataSource: dataSource.cloneWithRows(keyValuesById(sortedRows), idsOfValues(sortedRows))
  })),
  withHandlers({
    renderScrollComponent: ({ styles }) => (props) => (
      <InfiniteInvertibleScrollView contentContainerStyle={styles.scroll} {...props} />
    )
  })
)

const PagesList = enhance(({ dataSource, renderRow, renderScrollComponent, styles }) => {
  return (
    // NOTE BRN: The props of the ListView get passed to the
    // renderScrollComponent method which then get injected into whatever
    // componenet the renderScrollComponent method generates
    <ListView
      dataSource={dataSource}
      enableEmptySections={true}
      initialListSize={10}
      keyboardDismissMode={Platform.OS == 'android' ? 'on-drag' : 'interactive'}
      onEndReachedThreshold={0}
      pageSize={1}
      renderRow={renderRow}
      renderScrollComponent={renderScrollComponent}
      style={styles.list}
    />
  )
})

export default PagesList
