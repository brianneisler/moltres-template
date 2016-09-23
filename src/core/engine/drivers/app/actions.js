import { createAction } from 'redux-actions'

export const appReady = createAction('APP_READY')
export const awaitApp = createAction('AWAIT_APP')
export const initApp = createAction('INIT_APP')
