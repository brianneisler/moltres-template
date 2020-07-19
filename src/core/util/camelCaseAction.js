import { splitMapJoin } from '../../utils/lang'
import { camelCase } from '../../utils/string'

const splitMapJoinCamelCase = splitMapJoin(camelCase)

const camelCaseAction = splitMapJoinCamelCase('/')

export default camelCaseAction
