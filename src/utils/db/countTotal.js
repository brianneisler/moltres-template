import paginateQuery from './paginateQuery'

const countTotal = async (query) => {
  let count = 0
  await paginateQuery(query, async () => {
    count += 1
  })
  return count
}

export default countTotal
