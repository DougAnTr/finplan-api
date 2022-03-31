import { mongoose } from '@typegoose/typegoose'
import { constants } from './constants'

export async function connect() {
  return await mongoose.connect(constants.database.mongo_url)
}