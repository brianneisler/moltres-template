import { select } from '../../../../utils/data'
import createConfigSelector from '../../../createConfigSelector'

const selectSSRConfig = select(createConfigSelector('ssr'))

export default selectSSRConfig
