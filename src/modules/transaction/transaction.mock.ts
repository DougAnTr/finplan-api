import {TransactionType} from './transaction.model'
import {faker} from '@faker-js/faker'

export const getTransactionMock = (userId: string, monthId: string, type: TransactionType = faker.random.arrayElement(Object.values(TransactionType)), amount?: number) => ({
  userId,
  monthId,
  description: faker.random.word(),
  amount: amount !== undefined ? amount : type === TransactionType.INCOME ? 100 : -100,
  type
})
