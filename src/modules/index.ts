
import 'reflect-metadata'
import { buildSchema } from 'type-graphql'
import Container from 'typedi'
import { MonthModel } from './month/month.model'
import { MonthResolver } from './month/month.resolver'
import { TransactionModel } from './transaction/transaction.model'
import { UserModel } from './user/user.model'
import { UserResolver } from './user/user.resolver'

Container.set('MonthModel', MonthModel)
Container.set('TransactionModel', TransactionModel)
Container.set('UserModel', UserModel)

export const createSchema = () => {
  return buildSchema({
    resolvers: [MonthResolver, UserResolver],
    container: Container
  })
}
