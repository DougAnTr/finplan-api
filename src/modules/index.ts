
import 'reflect-metadata'
import { buildSchema } from 'type-graphql'
import Container from 'typedi'
import { MonthModel } from './month/month.model'
import { MonthResolver } from './month/month.resolver'

Container.set('MonthModel', MonthModel)

export const createSchema = () => {
  return buildSchema({
    resolvers: [MonthResolver],
    container: Container
  })
}