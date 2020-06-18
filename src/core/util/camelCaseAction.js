import { camelCase } from '../../utils/string'
import { splitMapJoin } from '../../utils/lang'

const splitMapJoinCamelCase = splitMapJoin(camelCase)

const camelCaseAction = splitMapJoinCamelCase('/')

export default camelCaseAction
