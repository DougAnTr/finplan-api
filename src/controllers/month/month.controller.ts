import {CreateMonth, Month} from "../../models";
import {Model} from "mongoose";
import {UserInputError} from "apollo-server-express";

export default class MonthController {
  constructor(private monthModel: Model<Month>) {
  }

  list = async () => {
    return this.monthModel.find();
  }

  create = async (_: undefined, {input}: CreateMonth): Promise<Month> => {
    const monthExists = await this.monthModel.findOne({number: input.number, year: input.year});

    if(monthExists) {
      throw new UserInputError('you cannot create duplicate months.')
    }

    return this.monthModel.create(input);
  }
}
