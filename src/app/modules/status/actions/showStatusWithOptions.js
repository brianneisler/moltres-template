import { createAction } from 'redux-actions'

/**
 * @param {String} name
 * @param {{
 *   clearAfter: number, milliseconds. If 0, the message will persist.
 *   message: string | Component - a message to show in the status
 * }} options
 */
const showStatusWithOptions = createAction(
  'STATUS:SHOW_STATUS_WITH_OPTIONS',
  (name, options) => ({
    name,
    options
  })
)

export default showStatusWithOptions
