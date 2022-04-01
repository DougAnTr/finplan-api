
import 'reflect-metadata'
import { buildSchema } from 'type-graphql'
import Container from 'typedi'
import { MonthModel } from './month/month.model'
import { MonthResolver } from './month/month.resolver'
import { TransactionModel } from './transaction/transaction.model'

Container.set('MonthModel', MonthModel)
Container.set('TransactionModel', TransactionModel)

export const createSchema = () => {
  return buildSchema({
    resolvers: [MonthResolver],
    container: Container
  })
}
