import { weakMemoize } from 'moltres/lang'

const loadSSRRenderer = weakMemoize(
  () => require('../../../../../../private/dist/index.ssr').default
)

export default loadSSRRenderer
