import { mongoose } from '@typegoose/typegoose'

import { connect } from '../../config/mongodbConnection'

import { MonthService } from './month.service'

const makeSut = () => {
  const sut = new MonthService()

  return {sut}
}

describe('Month Service', () => {

  beforeAll(async() => {
    await connect()
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