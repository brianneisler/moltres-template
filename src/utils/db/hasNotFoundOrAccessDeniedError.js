import { Code } from '../../constants'
import { getPath } from '../lang'

const hasNotFoundOrAccessDeniedError = (entity) =>
  getPath(['error', 'code'], entity) === Code.NOT_FOUND ||
  getPath(['error', 'code'], entity) === Code.ACCESS_DENIED

export default hasNotFoundOrAccessDeniedError
