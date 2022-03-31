import { ModelType } from '@typegoose/typegoose/lib/types'
import { FilterQuery } from 'mongoose'
import { Service } from 'typedi'
import { Month } from '../../month.model'

@Service()
export class FindMonthService {
  constructor(private monthModel: ModelType<Month>){}

  async execute(filter: FilterQuery<Month>
  ) {
    return this.monthModel.findOne(filter)
  }
}