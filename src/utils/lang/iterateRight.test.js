import iterateRight from './iterateRight'

describe('iterateRight', () => {
  // test('accepts data first', () => {
  //   const values = ['a', 'b']
  //   const acc = []
  //   const result = iterateRight(values, (next) => {
  //     if (!next.done) {
  //       acc.push(next.value)
  //     }
  //     return {
  //       ...next,
  //       done: !next.value,
  //       value: acc
  //     }
  //   })
  //   expect(result).toEqual(['b', 'a'])
  // })

  test('accepts data last', () => {
    const values = ['a', 'b']
    const acc = []
    const result = iterateRight((next) => {
      if (!next.done) {
        acc.push(next.value)
      }
      return {
        ...next,
        done: !next.value,
        value: acc
      }
    }, values)
    expect(result).toEqual(['b', 'a'])
  })

  test('iterateRights array until done is true', () => {
    const values = ['a', 'b', 'c', 'd', null, 'f']
    const acc = []
    const result = iterateRight((next) => {
      acc.push(next)
      return {
        ...next,
        done: !next.value,
        value: acc
      }
    }, values)
    expect(result).toEqual([
      {
        done: false,
        index: 5,
        kdx: 5,
        prev: undefined,
        value: 'f'
      },
      {
        done: false,
        index: 4,
        kdx: 4,
        prev: {
          done: false,
          index: 5,
          kdx: 5,
          value: 'f'
        },
        value: null
      }
    ])
  })

  test('iterateRight upgrades to Promise when async iterateRighte is used', async () => {
    const values = ['a', 'b', 'c', 'd', null, 'f']
    const acc = []
    let result = iterateRight(
      (next) =>
        new Promise((resolve) => {
          setTimeout(() => {
            acc.push(next)
            resolve({
              ...next,
              done: !next.value,
              value: acc
            })
          }, 500) // NOTE BRN: delay first using greatest time to test order of iteration
        }),
      values
    )
    expect(result).toBeInstanceOf(Promise)
    result = await result
    expect(result).toEqual([
      {
        done: false,
        index: 5,
        kdx: 5,
        prev: undefined,
        value: 'f'
      },
      {
        done: false,
        index: 4,
        kdx: 4,
        prev: {
          done: false,
          index: 5,
          kdx: 5,
          value: 'f'
        },
        value: null
      }
    ])
  })

  test('iterateRights an async iterator until done is true', async () => {
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
              value: values[idx]
            })
          }, 0)
        })
    }
    const acc = []
    const result = iterateRight((next) => {
      acc.push(next)
      return {
        ...next,
        done: !next.value,
        value: acc
      }
    }, iterator)
    expect(result).toBeInstanceOf(Promise)
    expect(await result).toEqual([
      {
        done: false,
        index: 5,
        kdx: 5,
        prev: undefined,
        value: 'f'
      },
      {
        done: false,
        index: 4,
        kdx: 4,
        prev: {
          done: false,
          index: 5,
          kdx: 5,
          value: 'f'
        },
        value: null
      }
    ])
  })
})
