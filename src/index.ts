import { ApolloServer } from 'apollo-server-express'
import express from 'express';
import mongoose from 'mongoose';

import http from 'http';
import { ApolloServerPluginDrainHttpServer } from 'apollo-server-core';
import schema from './graphql';

async function listen(port: number) {
  const app = express();
  const httpServer = http.createServer(app)

  await mongoose.connect('mongodb://localhost:27017/finplan-db')

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
    const port = 4000
    await listen(port)
    console.log(`🚀 Server is ready at http://localhost:${port}/graphql`)
  } catch (err) {
    console.error('💀 Error starting the node server', err)
  }
}

void main()
