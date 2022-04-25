import { ModelType } from '@typegoose/typegoose/lib/types'
import { Inject, Service } from 'typedi'
import { CreateMonthInput, Month } from '../../month.model'
import {UserInputError} from 'apollo-server-core'
import { User } from '../../../user/user.model'

@Service()
export class CreateMonthService {
  constructor(
    @Inject('MonthModel')
    private monthModel: ModelType<Month>,

    @Inject('UserModel')
    private userModel: ModelType<User>
  ){}

  async execute(month: CreateMonthInput) {
    const userExists = await this.userModel.exists({ _id: month.userId })

    if (!userExists) {
      throw new UserInputError('User does not exist')
    }

    const monthExists = await this.monthModel.findOne({
      userId: month.userId,
      number: month.number,
      year: month.year,
    })

    if (monthExists) {
      throw new UserInputError('Month already exists')
    }

    return this.monthModel.create(month)
  }
}
