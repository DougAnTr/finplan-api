
import 'reflect-metadata'
import { buildSchema } from 'type-graphql'
import Container from 'typedi'
import { MonthResolver } from './month/month.resolver'

export const createSchema = () => {
  return buildSchema({
    resolvers: [MonthResolver],
    container: Container
  })
}