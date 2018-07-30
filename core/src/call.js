import { call as callEffect } from 'redux-saga/effects'
import withResolve from './withResolve'

const call = withResolve(callEffect)

export default call
