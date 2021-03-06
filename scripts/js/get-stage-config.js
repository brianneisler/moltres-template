import loadProjectConfig from '../../src/config/loadProjectConfig'

const { log } = console
// Silence log since we're using this for stdout
// eslint-disable-next-line no-console
console.log = () => {}

const exec = async (stage, key) => {
  const config = await loadProjectConfig({ stage, target: 'script' })
  if (config[key]) {
    log(config[key])
  }
  process.exit()
}

exec(process.argv[2], process.argv[3]).catch((error) => {
  // eslint-disable-next-line no-console
  console.error(error)
  process.exit(1)
})
