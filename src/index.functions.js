import Promise from 'bluebird'

import { setupFunctions } from './functions'

global.Promise = Promise

Error.stackTraceLimit = Infinity

// NOTE BRN: Firebase functions expects a general object. Thus, we use
// module.exports here instead of the export keyword
module.exports = setupFunctions()
