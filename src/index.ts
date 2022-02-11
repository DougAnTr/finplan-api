import { ApolloServer } from 'apollo-server-express'
import express from 'express'

import http from 'http'
import { ApolloServerPluginDrainHttpServer } from 'apollo-server-core'
import { createSchema } from './modules'
import { constants } from './config/constants'
import { connect } from './config/mongodbConnection'

async function listen(port: number) {
  const app = express()
  const httpServer = http.createServer(app)

  await connect()
  const schema = await createSchema()

  const server = new ApolloServer({
    schema,
    plugins: [ApolloServerPluginDrainHttpServer({httpServer})]
  })

  await server.start()

  server.applyMiddleware({app})

  return new Promise((resolve, reject) => {
    httpServer.listen(port).once('listening', resolve).once('error', reject)
  })
}

async function main() {
  try {

    await listen(constants.application.port)
    console.info(`🚀 Server is ready at ${constants.application.url}:${constants.application.port}/graphql`)
  } catch (err) {
    console.error('💀 Error starting the node server', err)
  }
}

void main()
