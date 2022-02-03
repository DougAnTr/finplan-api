import 'reflect-metadata'
import { UserInputError } from 'apollo-server-core'
import { Arg, Mutation, Query, Resolver } from 'type-graphql'
import { AddMonthInput, Month } from './month.model'
import { Service } from 'typedi'
import { MonthService } from './month.service'

@Service()
@Resolver(Month)
export class MonthResolver {
  constructor(private readonly monthService: MonthService){}

  @Query(() => [Month])
  async months() {
    return this.monthService.getAll()
  }

  @Mutation(() => Month)
  async addMonth(@Arg('data') newMonthData: AddMonthInput): Promise<Month> {
    

    if (await this.monthService.getOne({
      number: newMonthData.number,
      year: newMonthData.year,
    })) {
      throw new UserInputError('you cannot create duplicated months.')
    }

    return this.monthService.create(newMonthData)
  }
}
