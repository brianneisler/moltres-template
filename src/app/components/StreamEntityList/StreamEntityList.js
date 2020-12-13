import { compose, getPath, negate, reject, sortBy } from 'moltres/lang'
import { setDisplayName, setPropTypes, withHandlers } from 'moltres/react'
import PropTypes from 'prop-types'
import React from 'react'

import { Code } from '../../../constants'
import EntityView from '../EntityView'
import PaginatedQueryView from '../PaginatedQueryView'

const enhance = compose(
  setDisplayName('StreamEntityList'),
  setPropTypes({
    entityComponents: PropTypes.object.isRequired,
    streamName: PropTypes.string.isRequired
  }),
  withHandlers({
    renderItem: ({ entityComponents }) => (rowData) => (
      <EntityView entity={rowData} entityComponents={entityComponents} />
    ),
    sortItems: () => (rows) =>
      sortBy(
        (value) => negate(getPath(['createdAt', 'seconds'], value)),
        reject((value) => {
          const error = getPath(['entity', 'error'], value)
          return (
            error &&
            (error.code === Code.NOT_FOUND || error.code === Code.ACCESS_DENIED)
          )
        }, rows)
      )
  })
)

const StreamEntityList = enhance(({ renderItem, sortItems, streamName }) => (
  <PaginatedQueryView
    queryKey={`Stream.${streamName}`}
    renderItem={renderItem}
    sortItems={sortItems}
  />
))

export default StreamEntityList
