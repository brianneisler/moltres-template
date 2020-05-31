import { createAction } from 'redux-actions'

// options =
/**
 * @param {{
 *   cancelButtonIndex: int,  index of cancel button in options
 *   destructiveButtonIndex: int, - index of destructive button in options
 *   enabled: boolean,
 *   message: string - a message to show below the title
 *   onPress: (index) => {},
 *   options: Array, (array of strings) - a list of button titles (required)
 *   title: string, - a title to show above the action sheet
 * }} data
 */
const setCurrentActionSheet = createAction(
  'ACTION_SHEET:SET_CURRENT_ACTION_SHEET',
  ({ cancelButtonIndex, destructiveButtonIndex, message, onPress, options, title }) => ({
    cancelButtonIndex,
    destructiveButtonIndex,
    message,
    onPress,
    options,
    title
  })
)

export default setCurrentActionSheet
