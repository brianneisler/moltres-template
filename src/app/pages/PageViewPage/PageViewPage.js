import { PageView } from '../../components'
import { Styles } from '../../styles'
import {
  branch,
  connect,
  defaultProps,
  memo,
  renderComponent,
  setDisplayName,
  setPropTypes
} from '../../../utils/react'
import { compose } from '../../../utils/lang'
import { hasNotFoundOrAccessDeniedError } from '../../../utils/db'
import { selectQueryResults } from '../../../core'
import NotFound404Page from '../NotFound404Page'
import PropTypes from 'prop-types'
import React from 'react'

const enhance = compose(
  setDisplayName('PageViewPage'),
  setPropTypes({
    path: PropTypes.string.isRequired
  }),
  defaultProps({
    styles: Styles
  }),
  connect((state, { path }) => ({
    page: selectQueryResults(`Page.${path}`, state)
  })),
  memo,
  // NOTE BRN: This code handles a sudden change to the Page. If someone deletes
  // a Page while it's being looked at and the database updates, this will cause
  // the 404 page to render immediately
  branch(
    ({ page }) =>
      hasNotFoundOrAccessDeniedError(page) ||
      hasNotFoundOrAccessDeniedError(page.pageContent),
    renderComponent(NotFound404Page)
  )
)

const PageViewPage = enhance(({ page }) => <PageView page={page} />)

export default PageViewPage
