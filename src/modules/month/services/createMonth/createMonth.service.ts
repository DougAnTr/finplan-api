import { ModelType } from '@typegoose/typegoose/lib/types'
import { Inject, Service } from 'typedi'
import { Month } from '../../month.model'
import {UserInputError} from 'apollo-server-core'

@Service()
export class CreateMonthService {
  constructor(
    @Inject('MonthModel')
    private monthModel: ModelType<Month>
  ){}

  async execute(month: Partial<Month>) {
    const monthExists = await this.monthModel.findOne({
      number: month.number,
      year: month.year,
    })

    if (monthExists) {
      throw new UserInputError('Month already exists')
    }

    return this.monthModel.create(month)
  }
}
