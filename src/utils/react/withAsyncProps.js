import { Component } from 'react'

import {
  assoc,
  assocPath,
  forEach,
  getProperty,
  hasProperty,
  keys,
  map,
  omit,
  pick,
  reduce,
  shallowEquals,
  weakMemoize
} from '../lang'

import createFactory from './createFactory'
import setDisplayName from './setDisplayName'
import wrapDisplayName from './wrapDisplayName'

const addObserver = (observers, key, promisedAsyncProp, observer) => {
  if (hasProperty(key, observers)) {
    throw new Error(
      `observer already present for prop ${key}. Something must have gone wrong in withAsyncProps`
    )
  }
  let unsubscribed = false
  promisedAsyncProp
    .then((value) => {
      if (!unsubscribed) {
        observer.next(value)
      }
    })
    .catch((error) => {
      if (!unsubscribed) {
        observer.error(error)
      }
    })
  observer.unsubscribe = () => {
    unsubscribed = true
  }
  return assocPath(key, observer, observers)
}

const removeObserver = (observers, key) => {
  const observer = getProperty(key, observers)
  observer.unsubscribe()
  return omit([key], observers)
}

const withAsyncProps = (selectors = [], asyncPropPromisers = {}) => (
  BaseComponent
) => {
  const factory = createFactory(BaseComponent)
  const memoizedAsyncPropPromisers = map(weakMemoize, asyncPropPromisers)

  class WithAsyncProps extends Component {
    constructor(props, context) {
      super(props, context)
      this.state = {
        asyncProps: {}
      }
    }

    componentDidMount() {
      // console.log('componentDidMount - this.props:', this.props)

      this.promises = {}
      this.observers = {}
      this.updateAsyncProps(this.props)
    }

    componentWillUnmount() {
      this.removeObservers()
      this.promises = {}
    }

    componentDidUpdate(prevProps) {
      const nextSelectedProps = pick(selectors, this.props)
      const selectedProps = pick(selectors, prevProps)
      if (!shallowEquals(nextSelectedProps, selectedProps)) {
        this.updateAsyncProps(nextSelectedProps)
      }
    }

    updateAsyncProps(props) {
      // console.log('updateAsyncProps - props:', props)
      const selectedProps = map((selector) => props[selector], selectors)
      const promisedAsyncProps = map(
        (promiser) => promiser(...selectedProps),
        memoizedAsyncPropPromisers
      )
      const { promises, state } = this
      let { observers } = this
      let { asyncProps } = state
      let remainingAsyncProps = promises

      this.promises = reduce(
        (accum, key) => {
          const promisedAsyncProp = getProperty(key, promisedAsyncProps)
          const asyncProp = getProperty(key, promises)
          if (asyncProp !== promisedAsyncProp) {
            if (asyncProp) {
              observers = removeObserver(observers, key, asyncProp)
            }
            if (promisedAsyncProp) {
              observers = addObserver(observers, key, promisedAsyncProp, {
                error: (error) => this.handleError(error),
                next: (value) => this.handleResolve(value, key)
              })
            }
          }
          remainingAsyncProps = omit([key], remainingAsyncProps)
          return assoc(key, promisedAsyncProp, accum)
        },
        {},
        keys(promisedAsyncProps)
      )

      // These queires no longer exist in the props. We can drop them.
      forEach((key) => {
        observers = removeObserver(observers, key)
        asyncProps = omit([key], asyncProps)
      }, keys(remainingAsyncProps))

      if (state.asyncProps !== asyncProps) {
        // console.log('updateAsyncProps - updating asyncProps:', asyncProps)
        this.setState({ asyncProps })
      }
      this.observers = observers
    }

    removeObservers() {
      this.observers = reduce(
        (reduction, key) => removeObserver(reduction, key),
        this.observers,
        keys(this.observers)
      )
    }

    handleResolve(value, key) {
      const { asyncProps } = this.state
      // console.log('handleChange -  asyncProps:', asyncProps, ' value:', value)
      this.setState({
        asyncProps: assocPath([key, 'value'], value, asyncProps)
      })
    }

    handleError(error, key) {
      const { asyncProps } = this.state
      // console.log('handleError -  asyncProps:', asyncProps, ' error:', error)
      this.setState({
        asyncProps: assocPath([key, 'error'], error, asyncProps)
      })
    }

    render() {
      // console.log('render - this.state.asyncProps:', this.state.asyncProps)
      const { asyncProps } = this.state
      return factory({
        ...this.props,
        ...asyncProps
      })
    }
  }

  if (process.env.NODE_ENV !== 'production') {
    return setDisplayName(wrapDisplayName(BaseComponent, 'withAsyncProps'))(
      WithAsyncProps
    )
  }
  return WithAsyncProps
}

export default withAsyncProps
