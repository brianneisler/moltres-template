const createContext = ({ plugins }) => ({
  cwd: process.cwd(),
  plugins
})

export default createContext
