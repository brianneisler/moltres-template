describe('mime index', () => {
  test('has expected methods', () => {
    const mod = require('./')
    expect(mod).toEqual({
      contentTypeToCharset: expect.any(Function),
      contentTypeToExtension: expect.any(Function),
      filePathToContentType: expect.any(Function),
      lookupContentType: expect.any(Function),
      toContentType: expect.any(Function)
    })
  })
})
