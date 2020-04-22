import { camelCase } from '../../utils/string'
import { splitMapJoin } from '../../utils/data'

const splitMapJoinCamelCase = splitMapJoin(camelCase)

const camelCaseAction = splitMapJoinCamelCase('/')

export default camelCaseAction
