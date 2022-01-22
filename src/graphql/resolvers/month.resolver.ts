import {MonthController} from "../../controllers";
import {MonthModel} from "../../db/models";

const month = new MonthController(MonthModel);

export const monthResolver = {
  Query: {
    months: month.list,
  },
  Mutation: {
    createMonth: month.create
  }
}
