import { compose, getPath, negate, sortBy } from 'moltres/lang'
import {
  defaultProps,
  flattenPages,
  setDisplayName,
  setPropTypes,
  withPropsOnChange
} from 'moltres/react'
import PropTypes from 'prop-types'
import React from 'react'

import { Styles } from '../../styles'
import FlatList from '../FlatList'

const enhance = compose(
  setDisplayName('PagesList'),
  setPropTypes({
    keyExtractor: PropTypes.func,
    pages: PropTypes.object,
    renderItem: PropTypes.func.isRequired,
    sortItems: PropTypes.func
  }),
  defaultProps({
    data: [],
    keyExtractor: (item) => item.id,
    sortItems: (items) =>
      sortBy(
        (value) => negate(getPath(['createdAt', 'seconds'], value)),
        items
      ),
    styles: Styles
  }),
  withPropsOnChange(['pages', 'sortItems'], ({ pages, sortItems }) => ({
    data: sortItems(flattenPages(pages))
  }))
)

const PagesList = enhance(({ data, keyExtractor, renderItem, styles }) => {
  return (
    <FlatList
      data={data}
      initialNumToRender={10}
      keyExtractor={keyExtractor}
      renderItem={renderItem}
      style={styles.list}
    />
  )
})

export default PagesList
