describe('constants index', () => {
  test('has expected methods', () => {
    const mod = require('./')
    expect(mod).toEqual({
      Function: {
        IDENTITY: expect.any(Function)
      },
      Integer: {
        MAX_SAFE: expect.any(Number)
      },
      Iterator: {
        END: expect.any(String),
        START: expect.any(String)
      },
      Number: {
        INFINITY: expect.any(Number),
        MAX_VALUE: expect.any(Number)
      },
      Regex: {
        UINT: expect.any(RegExp)
      },
      Symbol: {
        ITERATOR: expect.anything(),
        TO_STRING_TAG: expect.anything()
      }
    })
  })
})
