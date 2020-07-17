import { END, START } from '../constants/Iterator'
import { ITERATOR } from '../constants/Symbol'

import iteratorResolver from './iteratorResolver'

const testAsyncArrayIterator = (values) => {
  let idx = -1
  const iterator = {
    next: async () =>
      new Promise((resolve) => {
        idx += 1
        setTimeout(() => {
          if (idx >= values.length) {
            return resolve({
              done: true
            })
          }
          return resolve({
            done: false,
            value: values[idx]
          })
        }, 0)
      })
  }
  return iterator
}

describe('iteratorResolver', () => {
  test('creates an iterator for an array iterator', () => {
    const iter = [][ITERATOR]()
    expect(iteratorResolver(iter)).toEqual({
      next: expect.any(Function),
      previous: expect.any(Function),
      resolver: true
    })
  })

  test('creates an iterator for an object with a next method', () => {
    expect(iteratorResolver({ next: () => {} })).toEqual({
      next: expect.any(Function),
      previous: expect.any(Function),
      resolver: true
    })
  })

  test('next() returns done for empty array iterator', () => {
    const iter = [][ITERATOR]()
    const iterator = iteratorResolver(iter)
    expect(iterator.next()).toEqual({
      done: true,
      prev: undefined
    })
  })

  test('previous() returns done for empty array', () => {
    const iter = [][ITERATOR]()
    const iterator = iteratorResolver(iter)
    expect(iterator.previous()).toEqual({
      done: true,
      prev: undefined
    })
  })

  test('next() returns done for empty async array iterator', async () => {
    const asyncIterator = testAsyncArrayIterator([])
    const iterator = iteratorResolver(asyncIterator)

    const result = iterator.next()
    expect(result).toBeInstanceOf(Promise)
    expect(await result).toEqual({
      done: true,
      prev: undefined
    })
  })

  test('previous() returns done for empty async array iterator without a Promise', async () => {
    const asyncIterator = testAsyncArrayIterator([])
    const iterator = iteratorResolver(asyncIterator)

    const result = iterator.previous()
    expect(result).toEqual({
      done: true,
      prev: undefined
    })
  })

  test('creates an iterator at the starting point of the array iterator by default', () => {
    const array = ['foo', 'bar']
    const iterator = iteratorResolver(array[ITERATOR]())

    let next = { done: false }
    const accum = []
    while (!next.done) {
      next = iterator.next()
      accum.push(next)
    }
    expect(accum).toEqual([
      {
        done: false,
        index: 0,
        kdx: 0,
        prev: undefined,
        value: 'foo'
      },
      {
        done: false,
        index: 1,
        kdx: 1,
        prev: {
          done: false,
          index: 0,
          kdx: 0,
          value: 'foo'
        },
        value: 'bar'
      },
      {
        done: true,
        prev: {
          done: false,
          index: 1,
          kdx: 1,
          value: 'bar'
        }
      }
    ])
  })

  test('END starts the iterator at the last index', () => {
    const array = ['foo', 'bar']
    const iterator = iteratorResolver(array[ITERATOR](), END)

    let next = { done: false }
    const accum = []
    while (!next.done) {
      next = iterator.previous()
      accum.push(next)
    }
    expect(accum).toEqual([
      {
        done: false,
        index: 1,
        kdx: 1,
        prev: undefined,
        value: 'bar'
      },
      {
        done: false,
        index: 0,
        kdx: 0,
        prev: {
          done: false,
          index: 1,
          kdx: 1,
          value: 'bar'
        },
        value: 'foo'
      },
      {
        done: true,
        prev: {
          done: false,
          index: 0,
          kdx: 0,
          value: 'foo'
        }
      }
    ])
  })

  test('START starts the iterator at the 0 index', () => {
    const array = ['foo', 'bar']
    const iterator = iteratorResolver(array[ITERATOR](), START)

    let next = { done: false }
    const accum = []
    while (!next.done) {
      next = iterator.next()
      accum.push(next)
    }
    expect(accum).toEqual([
      {
        done: false,
        index: 0,
        kdx: 0,
        prev: undefined,
        value: 'foo'
      },
      {
        done: false,
        index: 1,
        kdx: 1,
        prev: {
          done: false,
          index: 0,
          kdx: 0,
          value: 'foo'
        },
        value: 'bar'
      },
      {
        done: true,
        prev: {
          done: false,
          index: 1,
          kdx: 1,
          value: 'bar'
        }
      }
    ])
  })

  test('iterates an async iterator until done is true', async () => {
    const asyncIterator = testAsyncArrayIterator(['a', 'b', 'c'])
    const iterator = iteratorResolver(asyncIterator)

    let result = iterator.next()
    expect(result).toBeInstanceOf(Promise)
    expect(await result).toEqual({
      done: false,
      index: 0,
      kdx: 0,
      prev: undefined,
      value: 'a'
    })

    result = iterator.next()
    expect(result).toBeInstanceOf(Promise)

    expect(await result).toEqual({
      done: false,
      index: 1,
      kdx: 1,
      prev: {
        done: false,
        index: 0,
        kdx: 0,
        value: 'a'
      },
      value: 'b'
    })

    result = iterator.next()
    expect(result).toBeInstanceOf(Promise)
    expect(await result).toEqual({
      done: false,
      index: 2,
      kdx: 2,
      prev: {
        done: false,
        index: 1,
        kdx: 1,
        value: 'b'
      },
      value: 'c'
    })

    result = iterator.next()
    expect(result).toBeInstanceOf(Promise)
    expect(await result).toEqual({
      done: true,
      prev: {
        done: false,
        index: 2,
        kdx: 2,
        value: 'c'
      }
    })
  })

  test('iterates an async iterator in reverse until done is true', async () => {
    const asyncIterator = testAsyncArrayIterator(['a', 'b', 'c'])
    const iterator = iteratorResolver(asyncIterator, END)

    let result = iterator.previous()
    expect(result).toBeInstanceOf(Promise)
    expect(await result).toEqual({
      done: false,
      index: 2,
      kdx: 2,
      prev: undefined,
      value: 'c'
    })

    result = iterator.previous()
    expect(result).toEqual({
      done: false,
      index: 1,
      kdx: 1,
      prev: {
        done: false,
        index: 2,
        kdx: 2,
        value: 'c'
      },
      value: 'b'
    })

    result = iterator.previous()
    expect(result).toEqual({
      done: false,
      index: 0,
      kdx: 0,
      prev: {
        done: false,
        index: 1,
        kdx: 1,
        value: 'b'
      },
      value: 'a'
    })

    result = iterator.previous()
    expect(result).toEqual({
      done: true,
      prev: {
        done: false,
        index: 0,
        kdx: 0,
        value: 'a'
      }
    })
  })
})
