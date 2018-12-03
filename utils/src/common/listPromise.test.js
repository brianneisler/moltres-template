import listPromise from './listPromise'

describe('listPromise', () => {
  test('listPromise is synchronously resolved when not awaiting anything', async () => {
    const promise = listPromise()

    promise.resolve()

    expect(promise.isPending()).toBe(false)
    expect(promise.isFulfilled()).toBe(true)
    expect(promise.value()).toEqual([])
  })

  test('listPromise is resolvable', async () => {
    const promise = listPromise([
      new Promise((resolve) => {
        setTimeout(() => {
          resolve('abc')
        }, 0)
      }),
      new Promise((resolve) => {
        setTimeout(() => {
          resolve(123)
        }, 0)
      })
    ])
    const handler = jest.fn()

    promise.then(handler)
    promise.resolve()
    const result = await promise

    expect(handler).toHaveBeenCalledWith(['abc', 123])
    expect(result).toEqual(['abc', 123])
  })

  test('listPromise rejects with the first rejection', async () => {
    const promise = listPromise([
      new Promise((resolve) => {
        setTimeout(() => {
          resolve('abc')
        }, 0)
      }),
      new Promise((resolve, reject) => {
        setTimeout(() => {
          reject('error')
        }, 0)
      })
    ])
    const catcher = jest.fn()

    promise.catch(catcher)
    promise.resolve()
    try {
      await promise
    } catch (error) {
      expect(error).toBe('error')
    }
    expect(catcher).toHaveBeenCalledWith('error')
  })

  test('listPromise will await other promises added using push method', async () => {
    const promise = listPromise()
    const handler = jest.fn()
    let resolve1
    let resolve2

    const laterPromise1 = new Promise((resolve) => {
      resolve1 = jest.fn((value) => resolve(value))
      setTimeout(() => {
        resolve1('abc')
      }, 1000)
    })

    const laterPromise2 = new Promise((resolve) => {
      resolve2 = jest.fn((value) => resolve(value))
      setTimeout(() => {
        resolve2('def')
      }, 1000)
    })

    promise.push(laterPromise1)
    promise.push(laterPromise2)
    promise.then(handler)
    promise.resolve()
    const result = await promise

    expect(handler).toHaveBeenCalledWith(['abc', 'def'])
    expect(result).toEqual(['abc', 'def'])
    expect(resolve1).toHaveBeenCalledWith('abc')
    expect(resolve2).toHaveBeenCalledWith('def')
  })
})
