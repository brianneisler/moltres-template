import { split } from 'moltres/lang'

const getRequestHandlerModuleName = (request) => {
  // get the name of the module to check for handlers.
  const { path } = request
  const pathParts = split('/', path)
  return pathParts[2]
}

export default getRequestHandlerModuleName
