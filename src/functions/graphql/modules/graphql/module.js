import { graphqlHTTP } from 'express-graphql'
import { buildSchema } from 'graphql'

const mod = () => ({
  setupMiddleware() {
    const schema = buildSchema(`
      type Query {
        hello: String
      }
    `)

    const root = {
      hello: () => {
        return 'Hello world!'
      }
    }

    return graphqlHTTP({
      graphiql: true,
      rootValue: root,
      schema
    })
  }
})

export default mod
