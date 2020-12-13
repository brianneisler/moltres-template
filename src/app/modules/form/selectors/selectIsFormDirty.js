import { isDirty } from 'redux-form'

import { curry } from 'moltres/lang'

const selectIsFormDirty = curry((formName, state) => isDirty(formName)(state))

export default selectIsFormDirty
