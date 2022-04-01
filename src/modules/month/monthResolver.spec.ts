import {graphqlCaller} from '../../test-utils/graphql-caller'
import {connect, disconnect} from '../../config/mongodbConnection'
import {MonthModel} from './month.model'

const createMonthMutation = `
  mutation CreateMonth($data: CreateMonthInput!) {
    createMonth(data: $data) {
      id
      number
      year
    }
  }
`

const listMonthsQuery = `
  query {
    listMonths {
      id
      number
      year
    }
  }
`

describe('MonthResolver', () => {
  beforeAll(async () => {
    await connect()
  })

  afterAll(async () => {
    await MonthModel.deleteMany()
    await disconnect()
  })

  describe('createMonth', () => {
    afterEach(async () => {
      await MonthModel.deleteMany()
    })

    it('Creates a month', async () => {
      const response = await graphqlCaller({
        source: createMonthMutation,
        variableValues: {
          data: {
            number: 1,
            year: 2020,
          },
        },
      })

      expect(response?.data?.createMonth.number).toBe(1)
    })
  })

  describe('list months', () => {
    beforeAll(async () => {
      await MonthModel.create({
        number: 1,
        year: 2020
      })
      await MonthModel.create({
        number: 2,
        year: 2020
      })
    })

    it('Returns a list of months', async () => {
      const response = await graphqlCaller({
        source: listMonthsQuery,
      })

      expect(response?.data?.listMonths.length).toBe(2)
    })
  })
})
