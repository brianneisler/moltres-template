import { resolve } from 'path'
import { build } from '../src'

describe('integration: build a basic project', () => {
  test(
    'builds project without error',
    async () => {
      const cwd = resolve(__dirname, 'basic-project')
      const result = await build({ cwd })
      expect(result).toEqual({
        cwd,
        env: {},
        graph: expect.any(Object),
        logger: expect.any(Object),
        merge: expect.any(Function),
        plugins: expect.any(Object),
        stage: 'dev'
      })
    },
    30000
  )
})
