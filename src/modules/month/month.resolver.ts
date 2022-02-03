import "reflect-metadata";
import { UserInputError } from "apollo-server-core";
import { Arg, Mutation, Query, Resolver } from "type-graphql";
import { AddMonthInput, Month } from "./month.types";
import { monthModel } from "./month.model";

@Resolver(Month)
export class MonthResolver {
  constructor(){}

  @Query(returns => [Month])
  async months() {
    return monthModel.find().sort({year: 1, number: 1});
  }

  @Mutation(returns => Month)
  async addMonth(@Arg('data') newMonthData: AddMonthInput): Promise<Month>{
    const monthExists = await monthModel.findOne({number: newMonthData.number, year: newMonthData.year});

    if(monthExists) {
      throw new UserInputError('you cannot create duplicated months.')
    }

    return monthModel.create(newMonthData);
  }
}