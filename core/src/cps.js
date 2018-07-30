import { cps as cpsEffect } from 'redux-saga/effects'
import withResolve from './withResolve'

const cps = withResolve(cpsEffect)

export default cps
