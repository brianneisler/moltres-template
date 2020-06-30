import { Page } from './schemas'
import { queryEntities } from '../Entity'

const queryPages = queryEntities(Page)

export default queryPages
