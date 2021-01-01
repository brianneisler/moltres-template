import { library } from '@fortawesome/fontawesome-svg-core'
import {
  faLaughSquint,
  faPaperPlane
} from '@fortawesome/free-regular-svg-icons'
import {
  faBars,
  faBell,
  faChevronLeft,
  faChevronRight,
  faEllipsisH,
  faHome,
  faImage,
  faPlusSquare,
  faRecycle,
  faTimes,
  faTrashAlt
} from '@fortawesome/free-solid-svg-icons'
import React from 'react'
import { InteractionManager } from 'react-native'

import { compose } from '../utils/lang'
import {
  defaultProps,
  lifecycle,
  setDisplayName,
  withActions
} from '../utils/react'

import { Text, View } from './components'
import { uiDeinitializedAction, uiInitializedAction } from './modules/ui'

library.add(
  faBars,
  faBell,
  faChevronLeft,
  faChevronRight,
  faEllipsisH,
  faHome,
  faImage,
  faLaughSquint,
  faPaperPlane,
  faPlusSquare,
  faRecycle,
  faTimes,
  faTrashAlt
)

const enhance = compose(
  setDisplayName('Main'),
  defaultProps({
    styles: {}
  }),
  withActions({
    uiDeinitialized: uiDeinitializedAction,
    uiInitialized: uiInitializedAction
  }),
  lifecycle({
    componentDidMount() {
      InteractionManager.runAfterInteractions(() => {
        this.props.uiInitialized()
      })
    },
    componentWillUnmount() {
      this.props.uiDeinitialized()
    }
  })
)

const Main = enhance(({ styles }) => {
  return (
    <View style={styles.fillContainer}>
      <Text>{'hello world'}</Text>
    </View>
  )
})

export default Main
