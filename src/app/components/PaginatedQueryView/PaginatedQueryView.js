import { Styles } from '../../styles'
import { compose } from '../../../utils/data'
import {
  connect,
  defaultProps,
  setDisplayName,
  setPropTypes,
  withActions,
  withPropsOnChange,
  withState
} from '../../../utils/react'
import { nextPageAction, selectQueryCursorNext, selectQueryResults } from '../../../core'
import { selectScrollTargetDistanceNearBottom } from '../../modules/scroll'
import ActivityIndicator from '../ActivityIndicator'
import PagesList from '../PagesList'
import PropTypes from 'prop-types'
import React from 'react'
import Text from '../Text'
import View from '../View'

const enhance = compose(
  setDisplayName('PaginatedQueryView'),
  setPropTypes({
    queryKey: PropTypes.string.isRequired,
    renderRow: PropTypes.func.isRequired,
    sortRows: PropTypes.func
  }),
  defaultProps({
    styles: Styles
  }),
  connect((state, { queryKey }) => {
    // console.log('queryKey:', queryKey, ' state:', state)
    return {
      nextCursor: selectQueryCursorNext(queryKey, state),
      pages: selectQueryResults(queryKey, state),
      windowScrollDistanceNearBottom: selectScrollTargetDistanceNearBottom('window', 4000, state)
    }
  }),
  withActions({
    nextPage: nextPageAction
  }),
  withState('isLoadingMore', 'setIsLoadingMore', false),
  withState('error', 'setError'),
  withPropsOnChange(
    ['error', 'isLoadingMore', 'nextCursor', 'windowScrollDistanceNearBottom'],
    ({
      error,
      isLoadingMore,
      nextCursor,
      nextPage,
      queryKey,
      setError,
      setIsLoadingMore,
      windowScrollDistanceNearBottom
    }) => {
      if (windowScrollDistanceNearBottom && nextCursor && !isLoadingMore && !error) {
        setIsLoadingMore(true, () => {
          nextPage(queryKey)
            .then(() => {
              setIsLoadingMore(false)
            })
            .catch((nextPageError) => {
              setError(nextPageError)
              setIsLoadingMore(false)
            })
        })
      }
      return {}
    }
  )
)

const PaginatedQueryView = enhance(
  ({ error, isLoadingMore, pages, queryKey, renderRow, sortRows, styles }) => {
    return (
      <View style={[styles.container, styles.list]}>
        <PagesList
          key={`${queryKey}-pages`}
          pages={pages}
          renderRow={renderRow}
          sortRows={sortRows}
        />
        {error ? <Text style={styles.errorText}>{error.message}</Text> : null}
        {isLoadingMore || !pages ? (
          <ActivityIndicator key={`${queryKey}-activity`} style={styles.activityIndicator} />
        ) : null}
      </View>
    )
  }
)

export default PaginatedQueryView
