import { ModelType } from '@typegoose/typegoose/lib/types'
import { FilterQuery } from 'mongoose'
import { Month } from '../../month.model'

export class FindMonthService {
  constructor(private monthModel: ModelType<Month>){}

  async execute(filter: FilterQuery<Month>
  ) {
    return this.monthModel.findOne(filter)
  }
}