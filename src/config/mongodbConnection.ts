import { mongoose } from '@typegoose/typegoose'
import { constants } from './constants'

export async function connect() {
  return mongoose.connect(constants.database.mongo_url)
}

export async function disconnect() {
  return mongoose.disconnect()
}
