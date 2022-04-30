import {User, UserModel} from '../../../user/user.model'
import {getUserMock} from '../../../user/user.mock'
import {connect, disconnect} from '../../../../config/mongodbConnection'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import {constants} from '../../../../config/constants'
import {UserTokenModel} from '../../userToken.model'
import {SignInService} from './signIn.service'

const makeSut = () => {
  return new SignInService(UserModel, UserTokenModel)
}

describe('SignInService', () =>{
  let user: User

  beforeAll(async () => {
    await connect()

    const userMock = getUserMock()
    const password = await bcrypt.hash(userMock.password, 10)

    user = await UserModel.create({...userMock, password})
  })

  afterAll(async () => {
    await UserModel.deleteMany({})
    await disconnect()
  })

  it('Should return tokens and the user', async () => {
    const sut = makeSut()

    const result = await sut.execute({
      email: user.email,
      password: 'password',
    })

    expect(result).toHaveProperty('auth')
    expect(result.user.name).toBe(user.name)
  })

  it('Should throw an error if the email is invalid', async () => {
    const sut = makeSut()

    await expect(sut.execute({
      email: 'invalid-email',
      password: 'password',
    })).rejects.toThrowError('Email or password invalid')
  })

  it('Should throw an error if the password is invalid', async () => {
    const sut = makeSut()

    await expect(sut.execute({
      email: user.email,
      password: 'invalid-password',
    })).rejects.toThrowError('Email or password invalid')
  })

  it('Shoud return valid tokens', async () => {
    const sut = makeSut()

    const result = await sut.execute({
      email: user.email,
      password: 'password',
    })

    expect(jwt.verify(result.auth.token, constants.jwt.secret)).toHaveProperty('userId')
    expect(jwt.verify(result.auth.refreshToken, constants.jwt.refreshSecret)).toHaveProperty('userId')
  })

  it('Should store the refreshToken in the database', async () => {
    const sut = makeSut()

    const result = await sut.execute({
      email: user.email,
      password: 'password',
    })

    expect((await UserTokenModel.exists({token: result.auth.refreshToken}))).toBeTruthy()
  })
})
