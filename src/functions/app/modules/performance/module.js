import { readFileSync } from '../../../../utils/fs'
import { pathResolve } from '../../../../utils/path'

// TODO BRN: Replace this with raw-loader once we swtich to using webpack for
// `functions` code.
// https://stackoverflow.com/questions/44029866/import-javascript-files-as-a-string
const FIRST_INPUT_DELAY = readFileSync(
  pathResolve(
    __dirname,
    '..',
    '..',
    '..',
    '..',
    '..',
    'node_modules',
    'first-input-delay',
    'dist',
    'first-input-delay.min.js'
  ),
  'utf8'
)

const mod = {
  loadEarlyScripts: async () => [
    {
      content: FIRST_INPUT_DELAY
    }
  ]
}

export default mod
