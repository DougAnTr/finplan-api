import {Inject} from 'typedi'
import {ModelType} from '@typegoose/typegoose/lib/types'
import {User} from '../../../user/user.model'
import {UserToken} from '../../userToken.model'
import {SignInInput, SignInResponse} from '../../auth.types'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import {constants} from '../../../../config/constants'

export class SignInService {
  constructor(
    @Inject('UserModel')
    private userModel: ModelType<User>,

    @Inject('UserTokenModel')
    private userTokenModel: ModelType<UserToken>
  ) {
  }

  async execute({email, password}: SignInInput): Promise<SignInResponse> {
    const user = await this.userModel.findOne({email})

    if(!user) {
      throw new Error('Email or password invalid')
    }

    const isPasswordValid = await bcrypt.compare(password, user.password)

    if(!isPasswordValid) {
      throw new Error('Email or password invalid')
    }

    const token = jwt.sign({
      userId: user._id
    }, constants.jwt.secret, {
      expiresIn: constants.jwt.expiresIn
    })

    const refreshToken = jwt.sign({
      userId: user._id
    }, constants.jwt.refreshSecret, {
      expiresIn: constants.jwt.refreshExpiresIn
    })

    await this.userTokenModel.create({
      userId: user._id,
      token: refreshToken,
    })

    return {
      auth: {
        token,
        refreshToken,
      },
      user
    }
  }
}
