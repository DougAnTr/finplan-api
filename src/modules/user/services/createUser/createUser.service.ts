import { User } from '../../user.model'
import bcrypt from 'bcrypt'
import { ModelType } from '@typegoose/typegoose/lib/types'

export class CreateUserService {
  constructor(private userModel: ModelType<User>) {}

  async execute(user: Partial<User>) {
    let password = ''
    const userExists = await this.userModel.findOne({ email: user.email })

    if(userExists) {
      throw new Error('User already exists')
    }

    if(user.password){
      password = await bcrypt.hash(user.password, 10)
    }

    return this.userModel.create({...user, password})
  }
}