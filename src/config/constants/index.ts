import 'dotenv/config'
import { Constants } from './types'

export const constants: Constants = {
  application: {
    url: process.env.APPLICATION_URL ?? '',
    port: Number(process.env.APPLICATION_PORT) ?? 4000,
  },
  database: {
    host: process.env.DB_HOST ?? '',
    port: process.env.DB_PORT ?? '',
    name: process.env.DB_NAME ?? '',
  }
}