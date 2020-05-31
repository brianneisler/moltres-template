import { User } from '../../../db/User'
import { compose, curry, weakMemoize } from '../../../utils/data'
import { withEntityStats } from '../entity_stats'

const enhanceUserProfile = curry(
  weakMemoize((statePath) =>
    compose(
      withEntityStats({
        entityIdPath: `${statePath}.id`,
        statsEntityType: User.name,
        statsStatePath: `${statePath}.stats`
      })
    )
  )
)

export default enhanceUserProfile
