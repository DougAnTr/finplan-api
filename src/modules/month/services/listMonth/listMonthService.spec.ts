import { connect, disconnect } from '../../../../config/mongodbConnection'
import {  MonthModel } from '../../month.model'
import { ListMonthService } from './listMonth.service'



const makeSut = () => {
  const sut = new ListMonthService(MonthModel)

  return {sut}
}

describe('ListMonthService', () => {

  beforeAll(async() => {
    await connect()

    await MonthModel.create({
      number: 0,
      year: 2023
    })
  })

  afterAll(async() => {
    await MonthModel.deleteMany()
    await disconnect()
  })


  it('should return the all months', async () => {
    const {sut} = makeSut()

    const months = await sut.execute()

    expect(months.length).toBeGreaterThan(0)
  })
})