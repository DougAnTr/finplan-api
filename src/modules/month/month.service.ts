import { FilterQuery } from 'mongoose'
import {Service} from 'typedi'
import { Month, MonthModel } from './month.model'

@Service()
export class MonthService {
  async getAll() {
    return MonthModel.find().sort({ year: 1, number: 1 })
  }

  async getOne(filter: FilterQuery<Month>
  ) {
    return MonthModel.findOne(filter)
  }

  async create(month: Partial<Month>){
    return MonthModel.create(month)
  }
}