import { join } from 'path'

const loadPackageJson = (packagePath) => require(join(packagePath, 'package.json'))

export default loadPackageJson
