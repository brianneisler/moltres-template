import PropTypes from 'prop-types'
import React from 'react'

import { selectQueryResults } from '../../../core'
import { hasNotFoundOrAccessDeniedError } from '../../../utils/db'
import { compose } from '../../../utils/lang'
import {
  branch,
  connect,
  defaultProps,
  memo,
  renderComponent,
  setDisplayName,
  setPropTypes
} from '../../../utils/react'
import { PageView } from '../../components'
import { Styles } from '../../styles'
import NotFound404Page from '../NotFound404Page'

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
