import createQueryFactory from './createQueryFactory'

const withQuery = ({
  createQuery,
  queryExtensions,
  queryOptions,
  selector,
  statePath
}) =>
  createQueryFactory({
    createQuery,
    queryExtensions,
    queryOptions,
    selector,
    statePath
  })

export default withQuery
