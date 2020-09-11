import bodyParser from 'body-parser'

const mod = () => ({
  setupMiddleware: () => bodyParser.urlencoded({ extended: false })
})

export default mod
