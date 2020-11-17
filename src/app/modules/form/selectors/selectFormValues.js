import { getFormValues } from 'redux-form'

import { curry } from 'moltres/lang'

const selectFormValues = curry((formName, state) =>
  getFormValues(formName)(state)
)

export default selectFormValues
