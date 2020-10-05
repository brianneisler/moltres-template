import { compose, curry, weakMemoize } from '../../../utils/lang'
import { withEntityStats } from '../../entity_stats'
import { User } from '../../user'

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
