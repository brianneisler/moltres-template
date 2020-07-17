import head from './head'
import reduceMergeDeepRight from './reduceMergeDeepRight'
import tail from './tail'

const mergeAll = (...all) => reduceMergeDeepRight(head(all), tail(all))

export default mergeAll
