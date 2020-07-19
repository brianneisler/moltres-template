import PropTypes from 'prop-types'
import React from 'react'

import { Code } from '../../../constants'
import { compose, getPath, negate, reject, sortBy } from '../../../utils/lang'
import {
  withHandlers,
  setDisplayName,
  setPropTypes
} from '../../../utils/react'
import EntityView from '../EntityView'
import PaginatedQueryView from '../PaginatedQueryView'

const enhance = compose(
  setDisplayName('StreamEntityList'),
  setPropTypes({
    entityComponents: PropTypes.object.isRequired,
    streamName: PropTypes.string.isRequired
  }),
  withHandlers({
    renderRow: ({ entityComponents }) => (rowData) => (
      <EntityView entity={rowData} entityComponents={entityComponents} />
    ),
    sortRows: () => (rows) =>
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

const StreamEntityList = enhance(({ renderRow, sortRows, streamName }) => (
  <PaginatedQueryView
    queryKey={`Stream.${streamName}`}
    renderRow={renderRow}
    sortRows={sortRows}
  />
))

export default StreamEntityList
