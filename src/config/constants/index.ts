import 'dotenv/config'
import { Constants } from './types'

export const constants: Constants = {
  application: {
    url: process.env.APPLICATION_URL ?? '',
    port: Number(process.env.APPLICATION_PORT) ?? 4000,
  },
  database: {
    mongo_url: process.env.MONGO_URL ?? '',
  }
}