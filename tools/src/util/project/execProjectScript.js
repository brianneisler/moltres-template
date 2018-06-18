import { has, prop } from 'moltres-utils'
import { resolve } from 'path'
import mapModules from '../module/mapModules'
import execScript from '../script/execScript'

const execProjectScript = async (name, project, context) => {
  if (has(name, project.scripts)) {
    await execScript(prop(name, project.scripts), {
      cwd: project.path,
      env: {
        ...process.env,
        ...context.env,
        PATH: `${process.env.PATH}:${resolve(project.path, 'node_modules', '.bin')}`,
        MOLTRES_STAGE: context.stage
      }
    })
  }
}

export default execProjectScript
