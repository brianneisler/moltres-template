import { errors, values } from '../../../test'

import anyIsError from './anyIsError'
import arrayDifference from './arrayDifference'

describe('anyIsError', () => {
  test('returns true for all error types', () => {
    expect(anyIsError).toHaveReturnedTruthyForValues(errors())
  })

  test('returns false for all other values', () => {
    expect(anyIsError).toHaveReturnedFalsyForValues(
      arrayDifference(values(), errors())
    )
  })
})
