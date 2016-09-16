import { GraphQLString } from 'graphql'

export function createdAtField() {
  return {
    type: GraphQLString,
    description:
      'The ISO 8601 date format of the time that this resource was created.'
  }
}

export function updatedAtField() {
  return {
    type: GraphQLString,
    description:
      'The ISO 8601 date format of the time that this resource was updated.'
  }
}
