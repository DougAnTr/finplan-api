import { connect, disconnect } from '../../../../config/mongodbConnection'
import { MonthModel } from '../../month.model'
import { FindMonthService } from './findMonth.service'

const makeSut = () => {
  const sut = new FindMonthService(MonthModel)

  return {sut}
}

describe('FindMonthService', () => {

  beforeAll(async() => {
    await connect()

    await MonthModel.create({
      id: 'monthId',
      number: 0,
      year: 2023
    })
  })

  afterAll(async() => {
    await MonthModel.deleteMany()
    await disconnect()
  })


  it('should return a month by the selected id', async () => {
    const {sut} = makeSut()

    const months = await sut.execute({id: 'monthId'})

    expect(months).toBeTruthy()
  })
})