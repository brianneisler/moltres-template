import { setupCliProgram } from './util'

const mod = () => {
  let program
  return {
    getProgram: () => {
      return program
    },
    setup: (store) => {
      program = setupCliProgram(store)
    }
  }
}

export default mod
