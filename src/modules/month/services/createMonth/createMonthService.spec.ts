import { connect, disconnect } from '../../../../config/mongodbConnection'
import { MonthModel } from '../../month.model'
import { CreateMonthService } from './createMonth.service'



const makeSut = () => {

  const sut = new CreateMonthService(MonthModel)

  return {sut}
}

describe('CreateMonthService', () => {

  beforeAll(async() => {
    await connect()
  })

  afterAll(async() => {
    await disconnect()
  })


  it('should return the created month', async () => {
    const {sut} = makeSut()

    const testMonth = {
      number: 0,
      year: 2023
    }

    const month = await sut.execute(testMonth)

    expect(month.number).toBe(testMonth.number)
    expect(month.year).toBe(testMonth.year)
  })
})