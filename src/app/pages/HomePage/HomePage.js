import { compose } from 'moltres/lang'
import { defaultProps, memo, setDisplayName } from 'moltres/react'
import React from 'react'

import { PageContainer, StreamEntityList } from '../../components'
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
    <PageContainer>
      <StreamEntityList streamName="home" />
    </PageContainer>
  )
})

export default HomePage
