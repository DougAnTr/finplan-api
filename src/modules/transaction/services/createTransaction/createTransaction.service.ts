import {Inject} from 'typedi'
import {ModelType} from '@typegoose/typegoose/lib/types'
import {Month} from '../../../month/month.model'
import {Transaction, TransactionType} from '../../transaction.model'
import {UserInputError} from 'apollo-server-core'

export class CreateTransactionService {
  constructor(
    @Inject('MonthModel')
    private readonly monthModel: ModelType<Month>,

    @Inject('TransactionModel')
    private readonly transactionModel: ModelType<Transaction>,
  ) {
  }

  async execute(transaction: Partial<Transaction>) {
    const monthExists = await this.monthModel.findOne({id: transaction.monthId})

    if(!monthExists) {
      throw new UserInputError('Month not found')
    }

    if(transaction.amount !== undefined && transaction.amount === 0) {
      throw new UserInputError('Transaction amount cannot be zero')
    }

    if(transaction.type === TransactionType.INCOME && transaction.amount && transaction.amount < 0) {
      throw new UserInputError('Income transactions cannot be negative')
    }

    if(transaction.type === TransactionType.EXPENSE && transaction.amount && transaction.amount > 0) {
      throw new UserInputError('Expense transactions cannot be positive')
    }

    return await this.transactionModel.create(transaction)
  }
}
