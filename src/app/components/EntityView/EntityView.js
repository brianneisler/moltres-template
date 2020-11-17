import { compose, invariant, shallowEquals } from 'moltres/lang'
import { lifecycle, setDisplayName, setPropTypes } from 'moltres/react'
import PropTypes from 'prop-types'
import React from 'react'

import ActivityIndicator from '../ActivityIndicator'

const enhance = compose(
  setDisplayName('EntityView'),
  setPropTypes({
    entity: PropTypes.object.isRequired,
    entityComponents: PropTypes.object.isRequired
  }),
  lifecycle({
    shouldComponentUpdate(nextProps, nextState) {
      return (
        !shallowEquals(this.props.entity, nextProps.entity) &&
        !shallowEquals(
          this.props.entityComponents,
          nextProps.entityComponents
        ) &&
        !shallowEquals(this.state, nextState)
      )
    }
  })
)

const EntityView = enhance(({ entity, entityComponents }) => {
  if (entity) {
    const component = entityComponents[entity.entityType]
    invariant(
      component,
      `entityComponents must define a component for the entityType '${entity.entityType}' of the given entity`
    )
    return <component entity={entity} />
  }
  return <ActivityIndicator />
})

export default EntityView
