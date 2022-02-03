import mongoose from "mongoose";
import { Month } from "./month.types";

const monthSchema = new mongoose.Schema<Month>({
  number: Number,
  year: Number
})

export const monthModel = mongoose.model<Month>('Month', monthSchema);
