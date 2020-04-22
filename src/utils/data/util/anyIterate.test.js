import anyIterate from './anyIterate'

describe('anyIterate', () => {
  test('iterates array until done is true', () => {
    const values = ['a', 'b', 'c', 'd', null, 'f']
    const acc = []
    const result = anyIterate(values, (next) => {
      acc.push(next)
      return {
        ...next,
        done: !next.value,
        value: acc
      }
    })
    expect(result).toEqual([
      {
        done: false,
        index: 0,
        kdx: 0,
        prev: undefined,
        value: 'a'
      },
      {
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
      },
      {
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
      },
      {
        done: false,
        index: 3,
        kdx: 3,
        prev: {
          done: false,
          index: 2,
          kdx: 2,
          value: 'c'
        },
        value: 'd'
      },
      {
        done: false,
        index: 4,
        kdx: 4,
        prev: {
          done: false,
          index: 3,
          kdx: 3,
          value: 'd'
        },
        value: null
      }
    ])
  })

  test('iterate upgrades to Promise when async iteratee is used', async () => {
    const values = ['a', 'b', 'c', 'd', null, 'f']
    const acc = []
    let result = anyIterate(
      values,
      (next) =>
        new Promise((resolve) => {
          setTimeout(() => {
            acc.push(next)
            resolve({
              ...next,
              done: !next.value,
              value: acc
            })
          }, 2000 - next.kdx * 500) // NOTE BRN: delay first using greatest time to test order of iteration
        })
    )
    expect(result).toBeInstanceOf(Promise)
    result = await result
    expect(result).toEqual([
      {
        done: false,
        index: 0,
        kdx: 0,
        prev: undefined,
        value: 'a'
      },
      {
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
      },
      {
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
      },
      {
        done: false,
        index: 3,
        kdx: 3,
        prev: {
          done: false,
          index: 2,
          kdx: 2,
          value: 'c'
        },
        value: 'd'
      },
      {
        done: false,
        index: 4,
        kdx: 4,
        prev: {
          done: false,
          index: 3,
          kdx: 3,
          value: 'd'
        },
        value: null
      }
    ])
  }, 10000)

  test('iterates an async iterator until done is true', async () => {
    const values = ['a', 'b', 'c', 'd', null, 'f']
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
              index: idx,
              kdx: idx,
              value: values[idx]
            })
          }, 0)
        })
    }
    const acc = []
    const result = anyIterate(iterator, (next) => {
      acc.push(next)
      return {
        ...next,
        done: !next.value,
        value: acc
      }
    })
    expect(result).toBeInstanceOf(Promise)

    expect(await result).toEqual([
      {
        done: false,
        index: 0,
        kdx: 0,
        prev: undefined,
        value: 'a'
      },
      {
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
      },
      {
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
      },
      {
        done: false,
        index: 3,
        kdx: 3,
        prev: {
          done: false,
          index: 2,
          kdx: 2,
          value: 'c'
        },
        value: 'd'
      },
      {
        done: false,
        index: 4,
        kdx: 4,
        prev: {
          done: false,
          index: 3,
          kdx: 3,
          value: 'd'
        },
        value: null
      }
    ])
  })

  test('iterates a string', () => {
    const value = 'abcd'
    const acc = []
    const result = anyIterate(value, (next) => {
      acc.push(next.value)
      return {
        ...next,
        done: !next.value,
        value: acc
      }
    })
    expect(result).toEqual(['a', 'b', 'c', 'd', undefined])
  })
})
