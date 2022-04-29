import { connect, disconnect } from '../../../../config/mongodbConnection'
import { UserModel, User } from '../../../user/user.model'
import { MonthModel } from '../../month.model'
import { CreateMonthService } from './createMonth.service'
import {getUserMock} from '../../../user/user.mock'
import {getMonthMock} from '../../month.mock'

const makeSut = () => {
  const sut = new CreateMonthService(MonthModel, UserModel)

  return {sut}
}

describe('CreateMonthService', () => {
  let user: User
  const invalid_userId = '626a6f47ed62e91252da3f03'

  beforeAll(async() => {
    await connect()
    user = await UserModel.create(getUserMock())
  })

  afterAll(async() => {
    await MonthModel.deleteMany()
    await UserModel.deleteMany()
    await disconnect()
  })

  it('Throws an error if the month is already created', async () => {
    const {sut} = makeSut()

    const data = getMonthMock(user._id)
    await MonthModel.create(data)

    await expect(sut.execute(data)).rejects.toThrow('Month already exist')
  })

  it('Throws an error if the user does not exist', async () => {
    const {sut} = makeSut()

    const data = getMonthMock(invalid_userId)

    await expect(sut.execute(data)).rejects.toThrow('User does not exist')
  })

  it('Returns the created month', async () => {
    const {sut} = makeSut()

    const testMonth = getMonthMock(user._id)

    const month = await sut.execute(testMonth)

    expect(month.number).toBe(testMonth.number)
    expect(month.year).toBe(testMonth.year)
  })
})
