import { select } from '../../../../utils/lang'
import createContextSelector from '../../../createContextSelector'

const selectLoggerContext = select(createContextSelector('logger'))

export default selectLoggerContext
