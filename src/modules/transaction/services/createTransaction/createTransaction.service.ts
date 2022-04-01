import {Inject} from 'typedi'
import {ModelType} from '@typegoose/typegoose/lib/types'
import {Month} from '../../../month/month.model'
import {Transaction} from '../../transaction.model'
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

    return await this.transactionModel.create(transaction)
  }
}
