import 'reflect-metadata'
import { UserInputError } from 'apollo-server-core'
import { Arg, Mutation, Query, Resolver } from 'type-graphql'
import { CreateMonthInput, Month } from './month.model'
import { Service } from 'typedi'
import { CreateMonthService, FindMonthService, ListMonthService } from './services'

@Service()
@Resolver(Month)
export class MonthResolver {
  constructor(
    private readonly listMonthService: ListMonthService,
    private readonly findMonthService: FindMonthService,
    private readonly createMonthService: CreateMonthService
  ){}

  @Query(() => [Month])
  async listMonths() {
    return this.listMonthService.execute()
  }

  @Mutation(() => Month)
  async createMonth(@Arg('data') newMonthData: CreateMonthInput): Promise<Month> {

    if (await this.findMonthService.execute({
      number: newMonthData.number,
      year: newMonthData.year,
    })) {
      throw new UserInputError('Month already exists')
    }

    return this.createMonthService.execute(newMonthData)
  }
}
