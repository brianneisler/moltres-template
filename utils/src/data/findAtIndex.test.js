import findAtIndex from './findAtIndex'

describe('findAtIndex', () => {
  test('finds value in array defaulting index to 0', () => {
    const array = ['a', 'b', 'c']
    const result = findAtIndex((val, index) => val === 'b' && index === 1, undefined, array)
    expect(result).toBe('b')
  })

  test('iterates starting at given index', () => {
    const array = ['a', 'b', 'c']
    const calls = []
    const result = findAtIndex(
      (val, index) => {
        calls.push({
          val,
          index
        })
        return false
      },
      1,
      array
    )
    expect(calls).toEqual([{ val: 'b', index: 1 }, { val: 'c', index: 2 }])
    expect(result).toBe(undefined)
  })

  test('returns undefined if no value is found', () => {
    const array = ['a', 'b', 'c']
    const result = findAtIndex((val) => val === 'd', 0, array)
    expect(result).toBe(undefined)
  })

  test('upgrades to a Promise when an async predicate is used', async () => {
    const array = ['a', 'b', 'c']
    let result = findAtIndex(
      (val, index) =>
        new Promise((resolve) => {
          setTimeout(() => {
            resolve(val === 'b' && index === 1)
          }, 0)
        }),
      0,
      array
    )

    expect(result).toBeInstanceOf(Promise)

    result = await result
    expect(result).toBe('b')
  })
})
