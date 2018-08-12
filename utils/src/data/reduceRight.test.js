import reduceRight from './reduceRight'

describe('reduceRight', () => {
  test('reduces right to left', () => {
    const values = ['foo', 'bar', 'baz']
    const result = reduceRight((acc, value) => acc + value, '', values)
    expect(result).toEqual('bazbarfoo')
  })
})
