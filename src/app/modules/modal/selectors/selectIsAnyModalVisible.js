import {
  any,
  createSelector,
  getProperty,
  select,
  values
} from 'moltres/lang'

const selectIsAnyModalVisible = select(
  createSelector('modal.instances', (instances) =>
    any(getProperty('visible'), values(instances))
  )
)

export default selectIsAnyModalVisible
