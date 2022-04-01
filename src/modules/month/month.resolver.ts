import 'reflect-metadata'
import { Arg, Mutation, Query, Resolver } from 'type-graphql'
import { CreateMonthInput, Month } from './month.model'
import { Service } from 'typedi'
import { CreateMonthService, ListMonthService } from './services'

@Service()
@Resolver(Month)
export class MonthResolver {
  constructor(
    private readonly listMonthService: ListMonthService,
    private readonly createMonthService: CreateMonthService
  ){}

  @Query(() => [Month])
  async listMonths() {
    return this.listMonthService.execute()
  }

  @Mutation(() => Month)
  async createMonth(@Arg('data') newMonthData: CreateMonthInput): Promise<Month> {
    return this.createMonthService.execute(newMonthData)
  }
}
