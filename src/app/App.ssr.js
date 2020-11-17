import { compose } from 'moltres/lang'
import { setPropTypes, storeShape, withContext } from 'moltres/react'
import PropTypes from 'prop-types'
import React from 'react'

import Main from './Main'
import { ConnectedRouter, MetaTagsContext, Provider } from './components'

const enhance = compose(
  setPropTypes({
    history: PropTypes.object.isRequired,
    metaTagsInstance: PropTypes.object.isRequired,
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

const App = enhance(({ history, metaTagsInstance, store }) => (
  <Provider store={store}>
    <MetaTagsContext extract={metaTagsInstance.extract}>
      <ConnectedRouter history={history}>
        <Main />
      </ConnectedRouter>
    </MetaTagsContext>
  </Provider>
))

export default App
