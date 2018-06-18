import { camelCase, splitMapJoin } from 'moltres-utils'

const splitMapJoinCamelCase = splitMapJoin(camelCase)

const camelCaseAction = splitMapJoinCamelCase('/')

export default camelCaseAction
