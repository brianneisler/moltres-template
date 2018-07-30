import { apply as applyEffect } from 'redux-saga/effects'
import withResolve from './withResolve'

const apply = withResolve(applyEffect)

export default apply
