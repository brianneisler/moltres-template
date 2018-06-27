import { createAction } from 'moltres'

const httpRequest = createAction(
  'HTTP_REQUEST',
  ({ body, headers, host, ip, method, params, path, query, route }) => ({
    body,
    headers,
    host,
    ip,
    method,
    params,
    path,
    query,
    route
  })
)

export default httpRequest
