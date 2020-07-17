import React from 'react'

import { compose } from '../../../utils/lang'
import { defaultProps, memo, setDisplayName } from '../../../utils/react'
import { HomeStreamEntityList, Page } from '../../components'
import { Styles } from '../../styles'

const enhance = compose(
  setDisplayName('HomePage'),
  defaultProps({
    styles: Styles
  }),
  memo
)

const HomePage = enhance(() => {
  return (
    <Page>
      <HomeStreamEntityList />
    </Page>
  )
})

export default HomePage
