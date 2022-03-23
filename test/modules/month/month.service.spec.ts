import { mongoose } from '@typegoose/typegoose'
import { expect } from 'chai'

import { constants } from '../../../src/config/constants'

import { MonthService } from '../../../src/modules/month/month.service'

const makeSut = function() {
  const sut = new MonthService()

  return {sut}
}



describe('Month Service', function() {
  before(async function() {
    await mongoose.connect(`mongodb://localhost:${constants.database.port}/${constants.database.name}`)
  })
  
  after(async function() {
    await mongoose.disconnect()
  })

  describe('create', function() {
    it('should return the created month', async function () {
      const {sut} = makeSut()
  
      const testMonth = {
        number: 0,
        year: 2023
      }
  
      const month = await sut.create(testMonth)
  
      expect(month.number).to.equal(testMonth.number)
      expect(month.year).to.equal(testMonth.year)
    })
  })
})