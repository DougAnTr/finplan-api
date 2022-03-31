import { ModelType } from '@typegoose/typegoose/lib/types'
import { Service } from 'typedi'
import { Month } from '../../month.model'

@Service()
export class CreateMonthService {
  constructor(private monthModel: ModelType<Month>){}

  async execute(month: Partial<Month>) {
    return this.monthModel.create(month)
  }
}