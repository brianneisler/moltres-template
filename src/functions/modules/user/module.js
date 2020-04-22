import { User } from '../../../db/User'
import { UserFollow } from '../../../db/UserFollow'
import { WAT } from '../../../db/WAT'
import { WATThis } from '../../../db/WATThis'
import { watchAndCountEntityStat } from '../../../service/entity_stat'

const mod = {
  run: function* run() {
    yield* watchAndCountEntityStat({
      linkEntityIdField: 'userId',
      stat: 'numberWATThises',
      statEntityType: User.name,
      watchedEntityType: WATThis.name
    })

    yield* watchAndCountEntityStat({
      linkEntityIdField: 'userId',
      stat: 'numberWATs',
      statEntityType: User.name,
      watchedEntityType: WAT.name
    })

    yield* watchAndCountEntityStat({
      linkEntityIdField: 'userId',
      stat: 'numberFollowing',
      statEntityType: User.name,
      watchedEntityType: UserFollow.name
    })

    yield* watchAndCountEntityStat({
      linkEntityIdField: 'followingUserId',
      stat: 'numberFollowers',
      statEntityType: User.name,
      watchedEntityType: UserFollow.name
    })
  }
}

export default mod
