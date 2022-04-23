import { TransactionModel, TransactionType} from '../../transaction.model'
import { MonthModel} from '../../../month/month.model'
import {connect, disconnect} from '../../../../config/mongodbConnection'
import {CreateTransactionService} from './createTransaction.service'

const makeSut = () => {
  return new CreateTransactionService(MonthModel, TransactionModel)
}

describe('CreateTransactionService', () => {
  beforeAll(async() => {
    await connect()
  })

  afterAll(async() => {
    await MonthModel.deleteMany()
    await TransactionModel.deleteMany()
    await disconnect()
  })

  it('Throws if the monthId is invalid', async () => {
    const sut = makeSut()
    const findMonthSpy = jest.spyOn(MonthModel, 'findOne')

    const promise = sut.execute({
      monthId: 'invalid_monthId',
      description: 'description',
      amount: 100,
      type: TransactionType.INCOME
    })

    expect(findMonthSpy).toHaveBeenCalled()
    expect(promise).rejects.toThrowError('Month not found')
  })

  it('Creates a transaction', async () => {
    const sut = makeSut()
    const createTransactionSpy = jest.spyOn(TransactionModel, 'create')

    const month = await MonthModel.create({
      year: 2020,
      month: 1
    })

    const data = {
      monthId: month.id,
      description: 'description',
      amount: 100,
      type: TransactionType.INCOME
    }

    await sut.execute(data)
    expect(createTransactionSpy).toHaveBeenCalledWith(data)
  })

  it('Returns the created transaction', async () => {
    const sut = makeSut()

    const month = await MonthModel.create({
      year: 2020,
      month: 1
    })

    const data = {
      monthId: month.id,
      description: 'description',
      amount: 100,
      type: TransactionType.INCOME
    }

    const transaction = await sut.execute(data)
    expect(transaction.id).toBeTruthy()
  })

  it('Throws if the amount is zero', async () => {
    const sut = makeSut()

    const month = await MonthModel.create({
      year: 2020,
      month: 1
    })

    const data = {
      monthId: month.id,
      description: 'description',
      amount: 0,
      type: TransactionType.INCOME
    }

    const promise = sut.execute(data)
    expect(promise).rejects.toThrowError('Transaction amount cannot be zero')
  })

  describe('When the transaction is income', () => {
    it('Throws if the amount is negative', async () => {
      const sut = makeSut()
  
      const month = await MonthModel.create({
        year: 2020,
        month: 1
      })
  
      const data = {
        monthId: month.id,
        description: 'description',
        amount: -100,
        type: TransactionType.INCOME
      }
  
      const promise = sut.execute(data)
      expect(promise).rejects.toThrowError('Income transactions cannot be negative')
    })
  })

  describe('When the transaction is expense', () => {
    it('Throws if the amount is positive', async () => {
      const sut = makeSut()
  
      const month = await MonthModel.create({
        year: 2020,
        month: 1
      })
  
      const data = {
        monthId: month.id,
        description: 'description',
        amount: 100,
        type: TransactionType.EXPENSE
      }
  
      const promise = sut.execute(data)
      expect(promise).rejects.toThrowError('Expense transactions cannot be positive')
    })
  })
})
