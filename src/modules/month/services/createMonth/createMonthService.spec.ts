import { connect, disconnect } from '../../../../config/mongodbConnection'
import { UserModel, User } from '../../../user/user.model'
import { MonthModel } from '../../month.model'
import { CreateMonthService } from './createMonth.service'

const makeSut = () => {
  const sut = new CreateMonthService(MonthModel, UserModel)

  return {sut}
}

describe('CreateMonthService', () => {
  let user: User

  beforeAll(async() => {
    await connect()
    user = await UserModel.create({
      name: 'User',
      lastName: 'LastName',
      email: 'email@mail.com',
      password: 'password',
    })
  })

  afterAll(async() => {
    await MonthModel.deleteMany()
    await UserModel.deleteMany()
    await disconnect()
  })

  it('Throws an error if the month is already created', async () => {
    const {sut} = makeSut()

    const data = {
      userId: user.id,
      number: 0,
      year: 2020
    }
    await MonthModel.create(data)

    await expect(sut.execute(data)).rejects.toThrow('Month already exist')
  })

  it('Throws an error if the user does not exist', async () => {
    const {sut} = makeSut()

    const data = {
      userId: '000000000000',
      number: 0,
      year: 2020
    }

    await expect(sut.execute(data)).rejects.toThrow('User does not exist')
  })

  it('Returns the created month', async () => {
    const {sut} = makeSut()

    const testMonth = {
      userId: user.id,
      number: 0,
      year: 2023
    }

    const month = await sut.execute(testMonth)

    expect(month.number).toBe(testMonth.number)
    expect(month.year).toBe(testMonth.year)
  })
})
