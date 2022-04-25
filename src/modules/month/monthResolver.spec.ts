import {graphqlCaller} from '../../test-utils/graphql-caller'
import {connect, disconnect} from '../../config/mongodbConnection'
import {MonthModel} from './month.model'
import { User, UserModel } from '../user/user.model'

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
  let user: User

  beforeAll(async () => {
    await connect()
    user = await UserModel.create({
      name: 'User',
      lastName: 'LastName',
      email: 'email@mail.com',
      password: 'password',
    })
  })

  afterAll(async () => {
    await MonthModel.deleteMany()
    await UserModel.deleteMany()
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
            userId: user.id,
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
      for(let i = 0; i < 2; i++){
        await MonthModel.create({
          userId: user.id,
          number: i,
          year: 2020
        })
      }
    })

    it('Returns a list of months', async () => {
      const response = await graphqlCaller({
        source: listMonthsQuery,
      })

      expect(response?.data?.listMonths.length).toBe(2)
    })
  })
})
