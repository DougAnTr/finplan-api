import { mongoose } from '@typegoose/typegoose'
import { constants } from './constants'

export async function connect() {
  return await mongoose.connect(`mongodb://${constants.database.host}:${constants.database.port}/${constants.database.name}`)
}