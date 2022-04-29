import { connect, disconnect } from '../../../../config/mongodbConnection'
import { UserModel } from '../../user.model'
import { CreateUserService } from './createUser.service'
import {getUserMock} from '../../user.mock'

describe('CreateUser service', () => {
  beforeAll(async() => {
    await connect()
  })

  afterAll(async() => {
    await UserModel.deleteMany()
    await disconnect()
  })

  it('Creates a user', async() => {
    const sut = new CreateUserService(UserModel)
    const createUserSpy = jest.spyOn(UserModel, 'create')

    await sut.execute(getUserMock())
    expect(createUserSpy).toHaveBeenCalled()
  })

  it('Returns the created user', async() => {
    const sut = new CreateUserService(UserModel)

    const data = getUserMock()

    const user = await sut.execute(data)
    expect(user.name).toBe(data.name)
  })

  it('Encrypts the user password', async() => {
    const sut = new CreateUserService(UserModel)

    const data = getUserMock()

    const user = await sut.execute(data)
    expect(user.password).not.toBe(data.password)
  })

  it('Throws an error if the user already exists', async() => {
    const sut = new CreateUserService(UserModel)

    const data = getUserMock()

    await sut.execute(data)
    const promise = sut.execute(data)
    await expect(promise).rejects.toThrowError('User already exists')
  })
})
