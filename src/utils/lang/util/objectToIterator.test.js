import { END, START } from '../constants/Iterator'

import objectToIterator from './objectToIterator'

describe('objectToIterator', () => {
  test('creates an iterator for an object', () => {
    expect(objectToIterator({})).toEqual({
      getKey: expect.any(Function),
      next: expect.any(Function),
      previous: expect.any(Function)
    })
  })

  // TODO BRN: For the following special values we need to add tests that ensure the iterator iterates over the objects properties and not the array values only
  test('creates an object iterator for an array', () => {
    expect(objectToIterator([])).toEqual({
      getKey: expect.any(Function),
      next: expect.any(Function),
      previous: expect.any(Function)
    })
  })

  // TODO BRN: For the following special values we need to add tests that ensure the iterator iterates over the regexp's object properties
  test('creates an object iterator for a regexp', () => {
    expect(objectToIterator(/abc/)).toEqual({
      getKey: expect.any(Function),
      next: expect.any(Function),
      previous: expect.any(Function)
    })
  })

  // TODO BRN: For the following special values we need to add tests that ensure the iterator iterates over the functions's object properties
  test('creates an object iterator for functions', () => {
    expect(objectToIterator(async () => {})).toEqual({
      getKey: expect.any(Function),
      next: expect.any(Function),
      previous: expect.any(Function)
    })
    expect(objectToIterator(() => {})).toEqual({
      getKey: expect.any(Function),
      next: expect.any(Function),
      previous: expect.any(Function)
    })
    expect(objectToIterator(function () {})).toEqual({
      getKey: expect.any(Function),
      next: expect.any(Function),
      previous: expect.any(Function)
    })
    expect(objectToIterator(async function () {})).toEqual({
      getKey: expect.any(Function),
      next: expect.any(Function),
      previous: expect.any(Function)
    })
    expect(objectToIterator(function* () {})).toEqual({
      getKey: expect.any(Function),
      next: expect.any(Function),
      previous: expect.any(Function)
    })
  })

  // TODO BRN: For the following special values we need to add tests that ensure the iterator iterates over the generator's object properties
  test('creates an object iterator for generators', () => {
    expect(objectToIterator((function* () {})())).toEqual({
      getKey: expect.any(Function),
      next: expect.any(Function),
      previous: expect.any(Function)
    })
  })

  // TODO BRN: For the following special values we need to add tests that ensure the iterator iterates over the native object's properties
  test('creates an iterator for native objects', () => {
    expect(objectToIterator(new ArrayBuffer(2))).toEqual({
      getKey: expect.any(Function),
      next: expect.any(Function),
      previous: expect.any(Function)
    })
    expect(objectToIterator(new Boolean(false))).toEqual({
      getKey: expect.any(Function),
      next: expect.any(Function),
      previous: expect.any(Function)
    })
    expect(objectToIterator(new Boolean(true))).toEqual({
      getKey: expect.any(Function),
      next: expect.any(Function),
      previous: expect.any(Function)
    })
    expect(objectToIterator(new Date())).toEqual({
      getKey: expect.any(Function),
      next: expect.any(Function),
      previous: expect.any(Function)
    })
    expect(objectToIterator(new Error())).toEqual({
      getKey: expect.any(Function),
      next: expect.any(Function),
      previous: expect.any(Function)
    })
    expect(objectToIterator(new Map())).toEqual({
      getKey: expect.any(Function),
      next: expect.any(Function),
      previous: expect.any(Function)
    })
    expect(objectToIterator(new Number(1))).toEqual({
      getKey: expect.any(Function),
      next: expect.any(Function),
      previous: expect.any(Function)
    })
    expect(objectToIterator(new Promise(() => {}))).toEqual({
      getKey: expect.any(Function),
      next: expect.any(Function),
      previous: expect.any(Function)
    })
    expect(objectToIterator(new Set())).toEqual({
      getKey: expect.any(Function),
      next: expect.any(Function),
      previous: expect.any(Function)
    })
    expect(objectToIterator(new String('abc'))).toEqual({
      getKey: expect.any(Function),
      next: expect.any(Function),
      previous: expect.any(Function)
    })
    expect(objectToIterator(new WeakMap())).toEqual({
      getKey: expect.any(Function),
      next: expect.any(Function),
      previous: expect.any(Function)
    })
    expect(objectToIterator(new WeakSet())).toEqual({
      getKey: expect.any(Function),
      next: expect.any(Function),
      previous: expect.any(Function)
    })
  })

  // TODO BRN: For the following special values we need to add tests that ensure the iterator iterates over the length as a property
  test('creates an iterator for an object with length', () => {
    expect(objectToIterator({ length: 0 })).toEqual({
      getKey: expect.any(Function),
      next: expect.any(Function),
      previous: expect.any(Function)
    })
  })

  test('next() returns done for empty object', () => {
    const iterator = objectToIterator({})
    expect(iterator.next()).toEqual({
      done: true,
      prev: undefined
    })
  })

  test('previous() returns done for empty object', () => {
    const iterator = objectToIterator({})
    expect(iterator.previous()).toEqual({
      done: true,
      prev: undefined
    })
  })

  test('getKey should match returned key', () => {
    const symBan = Symbol('ban')
    const iterator = objectToIterator({
      bim: 'bop',
      foo: 'bar',
      [symBan]: 'ana'
    })
    let next = { done: false }

    expect(iterator.getKey()).toBe(undefined)

    while (!next.done) {
      next = iterator.next()
      if (!next.done) {
        expect(iterator.getKey()).toBe(next.key)
        expect(next.kdx).toBe(next.key)
      }
    }

    expect(iterator.getKey()).toBe(symBan)
  })

  test('creates an iterator for the object', () => {
    const symBan = Symbol('ban')
    const iterator = objectToIterator({
      bim: 'bop',
      foo: 'bar',
      [symBan]: 'ana'
    })
    let next = { done: false }
    const accum = []
    while (!next.done) {
      next = iterator.next()
      accum.push(next)
    }
    expect(accum).toEqual([
      {
        done: false,
        kdx: 'bim',
        key: 'bim',
        prev: undefined,
        value: 'bop'
      },
      {
        done: false,
        kdx: 'foo',
        key: 'foo',
        prev: {
          done: false,
          kdx: 'bim',
          key: 'bim',
          value: 'bop'
        },
        value: 'bar'
      },
      {
        done: false,
        kdx: symBan,
        key: symBan,
        prev: {
          done: false,
          kdx: 'foo',
          key: 'foo',
          value: 'bar'
        },
        value: 'ana'
      },
      {
        done: true,
        prev: {
          done: false,
          kdx: symBan,
          key: symBan,
          value: 'ana'
        }
      }
    ])
  })

  test('creates an iterator for the object that starts at the Iterator.START', () => {
    const symBan = Symbol('ban')
    const iterator = objectToIterator(
      {
        bim: 'bop',
        foo: 'bar',
        [symBan]: 'ana'
      },
      START
    )
    let previous = { done: false }
    const accum = []
    while (!previous.done) {
      previous = iterator.next()
      accum.push(previous)
    }
    expect(accum).toEqual([
      {
        done: false,
        kdx: 'bim',
        key: 'bim',
        prev: undefined,
        value: 'bop'
      },
      {
        done: false,
        kdx: 'foo',
        key: 'foo',
        prev: {
          done: false,
          kdx: 'bim',
          key: 'bim',
          value: 'bop'
        },
        value: 'bar'
      },
      {
        done: false,
        kdx: symBan,
        key: symBan,
        prev: {
          done: false,
          kdx: 'foo',
          key: 'foo',
          value: 'bar'
        },
        value: 'ana'
      },
      {
        done: true,
        prev: {
          done: false,
          kdx: symBan,
          key: symBan,
          value: 'ana'
        }
      }
    ])
  })

  test('creates an iterator for the object that starts at the Iterator.END', () => {
    const symBan = Symbol('ban')
    const iterator = objectToIterator(
      {
        bim: 'bop',
        foo: 'bar',
        [symBan]: 'ana'
      },
      END
    )
    let previous = { done: false }
    const accum = []
    while (!previous.done) {
      previous = iterator.previous()
      accum.push(previous)
    }
    expect(accum).toEqual([
      {
        done: false,
        kdx: symBan,
        key: symBan,
        prev: undefined,
        value: 'ana'
      },
      {
        done: false,
        kdx: 'foo',
        key: 'foo',
        prev: {
          done: false,
          kdx: symBan,
          key: symBan,
          value: 'ana'
        },
        value: 'bar'
      },
      {
        done: false,
        kdx: 'bim',
        key: 'bim',
        prev: {
          done: false,
          kdx: 'foo',
          key: 'foo',
          value: 'bar'
        },
        value: 'bop'
      },
      {
        done: true,
        prev: {
          done: false,
          kdx: 'bim',
          key: 'bim',
          value: 'bop'
        }
      }
    ])
  })

  test('calling next and then previous results in iterating the same value twice', () => {
    const iterator = objectToIterator({
      bim: 'bop',
      foo: 'bar'
    })
    expect(iterator.next()).toEqual({
      done: false,
      kdx: 'bim',
      key: 'bim',
      prev: undefined,
      value: 'bop'
    })
    expect(iterator.previous()).toEqual({
      done: false,
      kdx: 'bim',
      key: 'bim',
      prev: {
        done: false,
        kdx: 'foo',
        key: 'foo',
        value: 'bar'
      },
      value: 'bop'
    })
  })
})
