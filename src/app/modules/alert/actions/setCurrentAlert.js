import { createAction } from 'moltres/redux'

// {
//   text: 'Cancel',
//   onPress: () => console.log('Cancel Pressed'),
//   style: 'cancel',
// }

/**
 * @param {{
 *   title,
 *   message?,
 *   buttons?,
 *   options?: { cancelable }
 * }} data
 */
const setCurrentAlert = createAction(
  'ALERT:SET_CURRENT_ALERT',
  ({ buttons, message, onRequestCancel, options, title }) => ({
    buttons,
    message,
    onRequestCancel,
    options,
    title
  })
)

export default setCurrentAlert
