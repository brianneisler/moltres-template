import { createAction } from 'moltres/redux'

/**
 * @param {{
 *   buttons: Array, (array of objects) - a list of buttons (required)
 *   message: string - a message to show below the title
 *   options: object,
 *   title: string, - a title to show above the action sheet
 * }} data
 */
const showAlertWithOptions = createAction(
  'ALERT:SHOW_ALERT_WITH_OPTIONS',
  ({ buttons, message, options, title }) => ({
    buttons,
    message,
    options,
    title
  })
)

export default showAlertWithOptions
