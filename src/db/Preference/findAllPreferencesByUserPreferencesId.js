import { findAllFromQuery } from '../../utils/db'
import { curry } from '../../utils/lang'
import { refUserPreferencesById } from '../UserPreferences'

import queryPreferences from './queryPreferences'

const findAllPreferencesByUserPreferencesId = curry(
  async (context, userPreferencesId, queryOptions = {}) =>
    findAllFromQuery(
      context,
      queryPreferences(
        {
          ...context,
          parentRef: refUserPreferencesById(context, userPreferencesId)
        },
        {},
        queryOptions
      ),
      queryOptions
    )
)

export default findAllPreferencesByUserPreferencesId
