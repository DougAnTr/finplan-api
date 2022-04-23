import { connect, disconnect } from '../../../../config/mongodbConnection'
import { UserModel } from '../../user.model'
import { CreateUserService } from './createUser.service'

describe('CreateUser service', () => {
  beforeAll(async() => {
    await connect()
  })

  afterAll(async() => {
    await disconnect()
  })

  afterEach(async() => {
    await UserModel.deleteMany()
  })

  it('Creates a user', async() => {
    const sut = new CreateUserService(UserModel)
    const createUserSpy = jest.spyOn(UserModel, 'create')

    const data = {
      name: 'Username',
      lastName: 'LastName',
      email: 'valid@email.com',
      password: 'valid_password',
    }

    await sut.execute(data)
    expect(createUserSpy).toHaveBeenCalled()
  })

  it('Returns the created user', async() => {
    const sut = new CreateUserService(UserModel)

    const data = {
      name: 'Username',
      lastName: 'LastName',
      email: 'valid@email.com',
      password: 'valid_password',
    }

    const user = await sut.execute(data)
    expect(user.name).toBe(data.name)
  })

  it('Throws an error if the user already exists', async() => {
    const sut = new CreateUserService(UserModel)

    const data = {
      name: 'Username',
      lastName: 'LastName',
      email: 'valid@email.com',
      password: 'valid_password',
    }

    await sut.execute(data)
    const promise = sut.execute(data)
    expect(promise).rejects.toThrowError('User already exists')
  })

  it('Encrypts the user password', async() => {
    const sut = new CreateUserService(UserModel)

    const data = {
      name: 'Username',
      lastName: 'LastName',
      email: 'valid@email.com',
      password: 'valid_password',
    }

    const user = await sut.execute(data)
    expect(user.password).not.toBe(data.password)
  })
})