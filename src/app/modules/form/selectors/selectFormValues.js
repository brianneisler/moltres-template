import { getFormValues } from 'redux-form'

import { curry } from '../../../../utils/lang'

const selectFormValues = curry((formName, state) =>
  getFormValues(formName)(state)
)

export default selectFormValues
