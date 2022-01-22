import mongoose from "mongoose";
import {Month} from "../../models";

const monthSchema = new mongoose.Schema<Month>({
  number: Number,
  year: Number
})

const MonthModel = mongoose.model<Month>('Month', monthSchema);

export default MonthModel;
