import {TransactionModel, TransactionType} from '../../transaction.model'
import {Month, MonthModel} from '../../../month/month.model'
import {connect, disconnect} from '../../../../config/mongodbConnection'
import {CreateTransactionService} from './createTransaction.service'
import {User, UserModel} from '../../../user/user.model'
import {getUserMock} from '../../../user/user.mock'
import {getMonthMock} from '../../../month/month.mock'
import {getTransactionMock} from '../../transaction.mock'

const makeSut = () => {
  return new CreateTransactionService(UserModel, MonthModel, TransactionModel)
}

describe('CreateTransactionService', () => {
  let month: Month
  let user: User
  const invalid_userId = '626a6f47ed62e91252da3f03'
  const invalid_monthId = '626a6f7691241eace5e99c2b'

  beforeAll(async() => {
    await connect()

    user = await UserModel.create(getUserMock())
    month = await MonthModel.create(getMonthMock(user._id))
  })

  afterAll(async() => {
    await MonthModel.deleteMany()
    await TransactionModel.deleteMany()
    await UserModel.deleteMany()
    await disconnect()
  })

  it('Creates a transaction', async () => {
    const sut = makeSut()
    const createTransactionSpy = jest.spyOn(TransactionModel, 'create')

    const data = getTransactionMock(user._id, month._id)

    await sut.execute(data)
    expect(createTransactionSpy).toHaveBeenCalledWith(data)
  })

  it('Returns the created transaction', async () => {
    const sut = makeSut()

    const transaction = await sut.execute(getTransactionMock(user._id, month._id))
    expect(transaction.id).toBeTruthy()
  })

  it('Throws if the amount is zero', async () => {
    const sut = makeSut()

    const promise = sut.execute(getTransactionMock(user._id, month._id, TransactionType.INCOME, 0))
    await expect(promise).rejects.toThrowError('Transaction amount cannot be zero')
  })

  describe('When the transaction is income', () => {
    it('Throws if the amount is negative', async () => {
      const sut = makeSut()

      const data = getTransactionMock(user._id, month._id, TransactionType.INCOME, -100)

      const promise = sut.execute(data)
      await expect(promise).rejects.toThrowError('Income transactions cannot be negative')
    })
  })

  describe('When the transaction is expense', () => {
    it('Throws if the amount is positive', async () => {
      const sut = makeSut()

      const data = getTransactionMock(user._id, month._id, TransactionType.EXPENSE, 100)

      const promise = sut.execute(data)
      await expect(promise).rejects.toThrowError('Expense transactions cannot be positive')
    })
  })

  it('Throws if the monthId is invalid', async () => {
    const sut = makeSut()

    const promise = sut.execute(getTransactionMock(user._id, invalid_monthId))

    await expect(promise).rejects.toThrowError('Month not found')
  })

  it('Throws if the userId is invalid', async () => {
    const sut = makeSut()

    const promise = sut.execute(getTransactionMock(invalid_userId, month._id))

    await expect(promise).rejects.toThrowError('User not found')
  })
})
