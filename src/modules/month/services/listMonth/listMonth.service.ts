import { ModelType } from '@typegoose/typegoose/lib/types'
import { Inject, Service } from 'typedi'
import { Month } from '../../month.model'

@Service()
export class ListMonthService {
  constructor(
    @Inject('MonthModel')
    private monthModel: ModelType<Month>
  ){}

  async execute() {
    return this.monthModel.find().sort({ year: 1, number: 1 })
  }
}