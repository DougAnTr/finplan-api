

import { ModelType } from '@typegoose/typegoose/lib/types'
import { Month } from '../../month.model'

export class CreateMonthService {
  constructor(private monthModel: ModelType<Month>){}

  async execute(month: Partial<Month>) {
    return this.monthModel.create(month)
  }
}