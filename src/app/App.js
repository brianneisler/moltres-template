import { compose } from 'moltres/lang'
import {
  setDisplayName,
  setPropTypes,
  storeShape,
  withContext
} from 'moltres/react'
import PropTypes from 'prop-types'
import React from 'react'

import Main from './Main'
import { ConnectedRouter, Provider } from './components'

const enhance = compose(
  setDisplayName('App'),
  setPropTypes({
    history: PropTypes.object.isRequired,
    store: storeShape
  }),
  withContext(
    {
      store: storeShape
    },
    ({ store }) => ({
      store
    })
  )
)

const App = enhance(({ history, store }) => (
  <React.StrictMode>
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <Main />
      </ConnectedRouter>
    </Provider>
  </React.StrictMode>
))

export default App
