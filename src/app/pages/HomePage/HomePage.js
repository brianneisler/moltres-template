import { HomeStreamEntityList, Page } from '../../components'
import { Styles } from '../../styles'
import { compose } from '../../../utils/lang'
import { defaultProps, memo, setDisplayName } from '../../../utils/react'
import React from 'react'

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
