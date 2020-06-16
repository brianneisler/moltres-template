import { weakMemoize } from '../../../../../utils/data'

const loadSSRRenderer = weakMemoize(
  () => require('../../../../../private/dist/index.ssr').default
)

export default loadSSRRenderer
