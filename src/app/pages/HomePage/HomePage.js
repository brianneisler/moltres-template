import React from 'react'

import { compose } from '../../../utils/lang'
import { defaultProps, memo, setDisplayName } from '../../../utils/react'
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
