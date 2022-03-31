import { ModelType } from '@typegoose/typegoose/lib/types'
import { Service } from 'typedi'
import { Month } from '../../month.model'

@Service()
export class ListMonthService {
  constructor(private monthModel: ModelType<Month>){}

  async execute() {
    return this.monthModel.find().sort({ year: 1, number: 1 })
  }
}