import path from 'path'

const loadMoltresConfig = async ({ cwd }) => {
  try {
    const moltresJsonPath = path.join(cwd, 'moltres.json')
    return require(moltresJsonPath)
  } catch (error) {
    console.log('error:', error)
  }
  return null
}

export default loadMoltresConfig
