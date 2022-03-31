import { ModelType } from '@typegoose/typegoose/lib/types'
import { Month } from '../../month.model'

export class ListMonthService {
  constructor(private monthModel: ModelType<Month>){}

  async execute() {
    return this.monthModel.find().sort({ year: 1, number: 1 })
  }
}