import { select } from '../../../../utils/data'
import createContextSelector from '../../../createContextSelector'

const selectLoggerContext = select(createContextSelector('logger'))

export default selectLoggerContext
