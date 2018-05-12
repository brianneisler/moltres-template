import { resolve } from 'path'
import { has, prop } from 'ramda'
import mapModules from '../module/mapModules'
import execScript from '../script/execScript'

const execProjectScript = async (name, project) => {
  if (has(name, project.scripts)) {
    await execScript(prop(name, project.scripts), {
      cwd: project.path,
      env: {
        ...process.env,
        PATH: `${process.env.PATH}:${resolve(project.path, 'node_modules', '.bin')}`
      }
    })
  }
}

export default execProjectScript
