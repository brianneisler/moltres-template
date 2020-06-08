import arrayFilter from './arrayFilter'

describe('arrayFilter', () => {
  test('example works', () => {
    const words = ['spray', 'limit', 'elite', 'exuberant', 'destruction', 'present']
    const result = arrayFilter(words, (word) => word.length > 6)
    expect(result).toEqual(['exuberant', 'destruction', 'present'])
  })
})
