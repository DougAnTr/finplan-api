import { ModelType } from '@typegoose/typegoose/lib/types'
import { Inject, Service } from 'typedi'
import { Month } from '../../month.model'

@Service()
export class CreateMonthService {
  constructor(
    @Inject('MonthModel')
    private monthModel: ModelType<Month>
  ){}

  async execute(month: Partial<Month>) {
    return this.monthModel.create(month)
  }
}