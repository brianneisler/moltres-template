import { Code } from '../../../constants'
import { delay } from '../../../utils/lang'

import createEntityStats from './createEntityStats'
import findEntityStatsByEntityTypeAndEntityId from './findEntityStatsByEntityTypeAndEntityId'

const findOrCreateEntityStats = async (context, data, retry = 0) => {
  try {
    const entityStats = await findEntityStatsByEntityTypeAndEntityId(
      context,
      data.entityType,
      data.entityId,
      { disallowPendingWrites: true }
    )
    if (entityStats) {
      return entityStats
    }
    return await createEntityStats(context, data)
  } catch (error) {
    if (
      error.code === Code.ACCESS_DENIED ||
      error.code === Code.PENDING_WRITES
    ) {
      if (retry <= 3) {
        retry = retry + 1
        return delay(
          async () => findOrCreateEntityStats(context, data, retry),
          500 * retry
        )
      }
    }
    throw error
  }

  //   const { database } = context
  //   const query = queryEntityStats(context, data, queryOptions)
  //   const ref =
  // db.runTransaction(function(transaction) {
  //     return transaction.get(sfDocRef).then(function(results) {
  //         if (!results.docs.length === 0) {
  //           transaction.create()
  //         }

  //         var newPopulation = sfDoc.data().population + 1;
  //         if (newPopulation <= 1000000) {
  //             transaction.update(sfDocRef, { population: newPopulation });
  //             return newPopulation;
  //         } else {
  //             return Promise.reject("Sorry! Population is too big.");
  //         }
  //     });
  // }).then(function(newPopulation) {
  //     console.log("Population increased to ", newPopulation);
  // }).catch(function(err) {
  //     // This will be an "population is too big" error.
  //     co
}

export default findOrCreateEntityStats
