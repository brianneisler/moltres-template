import createAction from '../createAction'

const runSaga = createAction('RUN_SAGA', ({ reject, resolve, saga, args }) => ({
  reject,
  resolve,
  saga,
  args
}))

export default runSaga
