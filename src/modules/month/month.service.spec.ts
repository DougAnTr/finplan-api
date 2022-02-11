import { mongoose } from '@typegoose/typegoose'

import { constants } from '../../config/constants'

import { MonthService } from './month.service'

const makeSut = () => {
  const sut = new MonthService()

  return {sut}
}

describe('Month Service', () => {


  beforeAll(async() => {
    await mongoose.connect(`mongodb://localhost:${constants.database.port}/${constants.database.name}`)
  })

  afterAll(async() => {
    await mongoose.disconnect()
  })


  describe('create', () => {
    it('should return the created month', async () => {
      const {sut} = makeSut()
  
      const testMonth = {
        number: 0,
        year: 2023
      }
  
      const month = await sut.create(testMonth)
  
      expect(month.number).toBe(testMonth.number)
      expect(month.year).toBe(testMonth.year)
    })
  })
})