import { createAction } from '../../../../utils/redux'

/**
 * @function
 * @since v0.1.0
 * @category action_sheet.actions
 * @param {{
 *   buttons: Array, (array of objects) - a list of buttons (required)
 *   message: string - a message to show below the title
 *   title: string, - a title to show above the action sheet
 * }} data
 * @returns {Action}
 */
const showActionSheetWithOptions = createAction(
  'ACTION_SHEET:SHOW_ACTION_SHEET_WITH_OPTIONS',
  ({ buttons, message, title }) => ({
    buttons,
    message,
    title
  })
)

export default showActionSheetWithOptions
